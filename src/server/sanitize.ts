import sanitizeHtml from 'sanitize-html';
export const cleanMenu=(html:string)=>sanitizeHtml(html,{allowedTags:['p','h2','h3','h4','strong','b','em','i','u','ul','ol','li','br','blockquote'],allowedAttributes:{},allowedSchemes:[],disallowedTagsMode:'discard'});
export const escapeHtml=(v:string)=>v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
