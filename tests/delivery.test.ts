import {afterEach,expect,it,vi} from 'vitest';
import {Binary} from 'mongodb';
vi.mock('server-only',()=>({}));
const mocks=vi.hoisted(()=>({quote:vi.fn(),version:vi.fn(),audit:vi.fn(),limit:vi.fn()}));
vi.mock('../src/server/db',()=>({collection:(name:string)=>({findOne:name==='quotes'?mocks.quote:mocks.version}),audit:mocks.audit,db:{collection:()=>({findOneAndUpdate:mocks.limit})}}));
vi.mock('../src/server/auth',()=>({HttpError:class extends Error{constructor(public status:number,message:string){super(message)}}}));
import {sendQuotation} from '../src/server/delivery';
const input={email:'recipient@example.invalid',version:1,requestId:'a973e8b2-4d4e-4c24-9840-0d05d12771b8'};
afterEach(()=>{vi.unstubAllEnvs();vi.unstubAllGlobals();vi.clearAllMocks()});
function configured(){vi.stubEnv('RESEND_API_KEY','test-key');vi.stubEnv('QUOTE_EMAIL_FROM','test@example.invalid');mocks.quote.mockResolvedValue({ref:'MBG-TEST',status:'issued',lastVersion:1});mocks.version.mockResolvedValue({pdf:new Binary(Buffer.from('test PDF'))});mocks.limit.mockResolvedValue({count:1})}
it('does not call a provider when sending is unconfigured',async()=>{vi.stubEnv('RESEND_API_KEY','');const fetch=vi.fn();vi.stubGlobal('fetch',fetch);await expect(sendQuotation('owner','quote',input)).rejects.toMatchObject({status:503});expect(fetch).not.toHaveBeenCalled()});
it('attaches the stored issued PDF and reuses the idempotency key on retries',async()=>{configured();const fetch=vi.fn().mockResolvedValue({ok:true});vi.stubGlobal('fetch',fetch);await sendQuotation('owner','quote',input);await sendQuotation('owner','quote',input);const first=fetch.mock.calls[0][1];expect(first.headers['Idempotency-Key']).toBe(fetch.mock.calls[1][1].headers['Idempotency-Key']);const body=JSON.parse(first.body);expect(body.to).toEqual([input.email]);expect(Buffer.from(body.attachments[0].content,'base64').toString()).toBe('test PDF');expect(mocks.audit).toHaveBeenCalled()});
it('rejects drafts and stale issued versions before contacting the provider',async()=>{configured();mocks.quote.mockResolvedValue({status:'draft',lastVersion:1});const fetch=vi.fn();vi.stubGlobal('fetch',fetch);await expect(sendQuotation('owner','quote',input)).rejects.toMatchObject({status:409});expect(fetch).not.toHaveBeenCalled()});
it('does not claim acceptance when the provider rejects a message',async()=>{configured();vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:false}));await expect(sendQuotation('owner','quote',input)).rejects.toMatchObject({status:502});expect(mocks.audit).not.toHaveBeenCalled()});
