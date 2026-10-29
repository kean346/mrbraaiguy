import {test,expect} from '@playwright/test';

test('edit a saved client, reject stale deletion, and confirm permanent deletion',async({page})=>{
 await page.goto('/login');
 await page.getByLabel('Workspace password').fill(process.env.APP_ACCESS_PASSWORD||process.env.OWNER_SETUP_CODE||'');
 await page.getByRole('button',{name:'Enter workspace'}).click();
 await expect(page).toHaveURL(/dashboard/);
 await page.goto('/clients/new');
 const name=`Delete test ${Date.now()}`;
 await page.getByLabel('Name / contact person').fill(name);
 await page.getByRole('button',{name:'Create client'}).click();
 await expect(page).toHaveURL(/\/clients$/);
 await page.getByRole('link',{name,exact:true}).click();
 await expect(page).toHaveURL(/\/clients\/[a-f0-9-]+$/);
 const id=page.url().split('/').pop();
 const original=await (await page.request.get(`/api/workspace/clients/${id}`)).json();
 await page.getByLabel('Phone',{exact:true}).fill('0821234567');
 await page.getByRole('button',{name:'Save client'}).click();
 await expect(page).toHaveURL(/\/clients$/);
 await page.getByRole('link',{name,exact:true}).click();
 await expect(page.getByLabel('Phone',{exact:true})).toHaveValue('0821234567');
 const stale=await page.request.post(`/api/workspace/clients/${id}/delete`,{headers:{Origin:'http://localhost:3000'},data:{revision:original.client.revision}});
 expect(stale.status()).toBe(409);
 await page.getByRole('button',{name:'Delete client',exact:true}).click();
 await page.getByRole('dialog').getByRole('button',{name:'Keep',exact:true}).click();
 await expect(page.getByLabel('Phone',{exact:true})).toHaveValue('0821234567');
 await page.getByRole('button',{name:'Delete client',exact:true}).click();
 await page.getByRole('dialog').getByRole('button',{name:'Delete client',exact:true}).click();
 await expect(page).toHaveURL(/\/clients$/);
 expect((await page.request.get(`/api/workspace/clients/${id}`)).status()).toBe(404);
});

test('linked quotations prevent client deletion',async({page})=>{
 await page.goto('/login');
 await page.getByLabel('Workspace password').fill(process.env.APP_ACCESS_PASSWORD||process.env.OWNER_SETUP_CODE||'');
 await page.getByRole('button',{name:'Enter workspace'}).click();
 await expect(page).toHaveURL(/dashboard/);
 const headers={Origin:'http://localhost:3000'};
 const created=await page.request.post('/api/workspace/clients',{headers,data:{name:'Linked deletion test '+Date.now(),kind:'individual',company:'',email:'',phone:'',billing:'',notes:'Synthetic test',marketing:'unverified',consentEvidence:''}});
 expect(created.ok()).toBeTruthy();const client=await created.json();
 expect((await page.request.post('/api/workspace/quotes',{headers,data:{clientId:client.id}})).ok()).toBeTruthy();
 const blocked=await page.request.post(`/api/workspace/clients/${client.id}/delete`,{headers,data:{revision:client.revision}});
 expect(blocked.status()).toBe(409);
 expect((await page.request.get(`/api/workspace/clients/${client.id}`)).ok()).toBeTruthy();
});
