// ============ Configuración de secciones ============

const F = (type, k, label, o = {}) => Object.assign({ type, k, label }, o);
const SI_NO = ['Sí', 'No', 'Por definir'];
const DOCSTATE = ['Ya lo tienen y está validado', 'Lo está preparando su abogado', 'Necesitan una plantilla base', 'Por definir'];

const SECTIONS = [
  {
    id: 'visita',
    ic: '📋',
    short: 'Visita',
    title: 'Datos de la visita y contacto',
    desc: 'Quién levanta la información, con quién y cuándo. Sirve de portada del informe.',
    fields: [
      F('text', 'empresa', 'Empresa / cliente', { key: 1 }),
      F('text', 'proyecto', 'Nombre del proyecto', { key: 1 }),
      F('date', 'fecha', 'Fecha del levantamiento'),
      F('text', 'lugar', 'Lugar (planta / oficina / remoto)'),
      F('text', 'levantador', 'Levantado por'),
      F('text', 'contacto_nombre', 'Persona de contacto del cliente', { key: 1 }),
      F('text', 'contacto_cargo', 'Cargo'),
      F('tel', 'contacto_tel', 'Teléfono / WhatsApp del contacto'),
      F('email', 'contacto_mail', 'Correo del contacto'),
      F('text', 'validador', 'Persona encargada de revisar y validar los avances del proyecto', { key: 1 }),
      F('textarea', 'notas_visita', 'Observaciones generales de la visita')
    ]
  },
  {
    id: 'marca',
    ic: '🎨',
    short: 'Marca',
    title: 'Marca e identidad visual',
    desc: 'Logos, colores, tipografías y tono.',
    fields: [
      F('files', 'logo_h', 'Logotipo horizontal', { key: 1, accept: '.svg,.ai,.pdf,.eps,.png,.jpg,.jpeg,.webp,image/*', cam: 1 }),
      F('files', 'logo_v', 'Logotipo vertical', { accept: '.svg,.ai,.pdf,.eps,.png,.jpg,.jpeg,.webp,image/*', cam: 1 }),
      F('files', 'logo_mono', 'Logotipo monocromo', { accept: '.svg,.ai,.pdf,.eps,.png,.jpg,.jpeg,.webp,image/*', cam: 1 }),
      F('files', 'manual_marca', 'Manual de marca', { accept: '.pdf,.ppt,.pptx,.doc,.docx,image/*' }),
      F('radio', 'colores_estado', '¿Tienen colores corporativos?', { opts: ['Sí, los tienen', 'No: usar provisionales', 'Se definirán después'] }),
      F('color', 'c_principal', 'Color principal (HEX)'),
      F('color', 'c_secundario', 'Color secundario (HEX)'),
      F('color', 'c_acento', 'Color de acento (HEX)'),
      F('text', 'tipografia', 'Tipografía corporativa'),
      F('textarea', 'referencias', 'Referencias visuales')
    ]
  },
  {
    id: 'catalogo',
    ic: '📦',
    short: 'Catálogo',
    title: 'Catálogo y contenido comercial',
    desc: 'Categorías, productos y fotos.',
    fields: [
      F('files', 'catalogo_files', 'Catálogo existente', { key: 1, accept: '.xls,.xlsx,.csv,.pdf,.doc,.docx,image/*', cam: 1 }),
      F('repeater', 'categorias', 'Categorías', { key: 1, item: 'categoría', title: 'nombre', sheet: 'Categorías', cols: [
        { c: 'nombre', l: 'Categoría', t: 'text' },
        { c: 'descripcion', l: 'Descripción', t: 'textarea', w: 1 }
      ]}),
      F('repeater', 'productos', 'Productos', { key: 1, item: 'producto', title: 'nombre', bulk: 1, sheet: 'Productos', cols: [
        { c: 'nombre', l: 'Nombre', t: 'text' },
        { c: 'categoria', l: 'Categoría', t: 'text' },
        { c: 'precio', l: 'Precio (S/)', t: 'number' },
        { c: 'desc_corta', l: 'Descripción', t: 'textarea', w: 1 },
        { c: 'fotos', l: 'Fotos', t: 'files', w: 1, accept: 'image/*', cam: 1 }
      ]})
    ]
  },
  {
    id: 'institucional',
    ic: '🏢',
    short: 'Institucional',
    title: 'Contenido institucional',
    desc: 'Textos de «Nosotros», datos de contacto.',
    fields: [
      F('text', 'nombre_web', 'Nombre comercial', { key: 1 }),
      F('textarea', 'resena', 'Reseña / «Nosotros»'),
      F('text', 'dir_planta', 'Dirección de planta', { key: 1 }),
      F('tel', 'whatsapp', 'WhatsApp', { key: 1, ph: '+51 9XX XXX XXX' }),
      F('email', 'correo_atencion', 'Correo de atención', { key: 1 }),
      F('textarea', 'horario', 'Horario de atención'),
      F('repeater', 'redes', 'Redes sociales', { item: 'red', title: 'red', sheet: 'Redes', cols: [
        { c: 'red', l: 'Red', t: 'select', o: ['Facebook', 'Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X / Twitter', 'Sitio web'] },
        { c: 'url', l: 'Enlace', t: 'text' }
      ]})
    ]
  },
  {
    id: 'legal',
    ic: '⚖️',
    short: 'Legal',
    title: 'Datos legales y fiscales',
    desc: 'Datos para el pie de página y documentos legales.',
    fields: [
      F('text', 'ruc', 'RUC', { key: 1 }),
      F('text', 'razon_social', 'Razón social', { key: 1 }),
      F('text', 'dir_fiscal', 'Dirección fiscal'),
      F('radio', 'igv', '¿Los precios incluyen IGV?', { opts: SI_NO }),
      F('files', 'docs_legales', 'Documentos legales', { accept: '.pdf,image/*', cam: 1 })
    ]
  },
  {
    id: 'pago',
    ic: '💳',
    short: 'Pago',
    title: 'Pago y logística',
    desc: 'Cómo cobran, cómo entregan.',
    fields: [
      F('checks', 'medios_pago', 'Medios de pago', { key: 1, opts: ['Transferencia', 'Depósito', 'Contra entrega', 'Yape / Plin'] }),
      F('checks', 'entrega', 'Modalidades de entrega', { key: 1, opts: ['Delivery propio', 'Courier', 'Recojo en planta'] }),
      F('textarea', 'cond_entrega', 'Condiciones de entrega')
    ]
  },
  {
    id: 'infra',
    ic: '🖥️',
    short: 'Infraestructura',
    title: 'Correo e infraestructura',
    desc: 'Dominio, VPS, SSL y SMTP.',
    fields: [
      F('radio', 'dominio_estado', 'Dominio', { opts: ['Ya tienen', 'Hay que comprarlo', 'Por definir'] }),
      F('text', 'dominio', 'Nombre de dominio', { ph: 'ejemplo.com.pe' }),
      F('text', 'smtp_host', 'Host SMTP'),
      F('email', 'correo_origen', 'Correo de origen'),
      F('select', 'ssl', 'Certificado SSL', { opts: ["Let's Encrypt (gratuito)", 'Certificado de pago', 'Ya tienen uno'] })
    ]
  },
  {
    id: 'usuarios',
    ic: '👥',
    short: 'Usuarios',
    title: 'Usuarios y operación',
    desc: 'Quién usará el panel interno.',
    fields: [
      F('repeater', 'usuarios', 'Usuarios internos', { key: 1, item: 'usuario', title: 'nombre', sheet: 'Usuarios', cols: [
        { c: 'nombre', l: 'Nombre', t: 'text' },
        { c: 'correo', l: 'Correo', t: 'email' },
        { c: 'rol', l: 'Rol', t: 'select', o: ['Administrador', 'Operador'] }
      ]}),
      F('email', 'correo_alertas', 'Correo de alertas', { key: 1 })
    ]
  },
  {
    id: 'reglas',
    ic: '❓',
    short: 'Reglas',
    title: 'Reglas de negocio',
    desc: 'Descuentos, mínimos, stock.',
    fields: [
      F('radio', 'desc_modo', 'Descuentos', { opts: ['No aplican', 'Porcentaje', 'Monto fijo', 'Ambos'] }),
      F('number', 'monto_min', 'Monto mínimo de compra (S/)'),
      F('textarea', 'stock_reglas', 'Reglas de stock')
    ]
  },
  {
    id: 'cierre',
    ic: '✅',
    short: 'Cierre',
    title: 'Cierre y pendientes',
    desc: 'Compromisos y fechas.',
    fields: [
      F('repeater', 'pendientes', 'Pendientes', { key: 1, item: 'compromiso', title: 'item', sheet: 'Compromisos', cols: [
        { c: 'item', l: 'Qué falta', t: 'text', w: 1 },
        { c: 'resp', l: 'Responsable', t: 'text' },
        { c: 'fecha', l: 'Fecha', t: 'date' }
      ]}),
      F('date', 'reunion_fecha', 'Próxima reunión: día'),
      F('time', 'reunion_hora', 'Próxima reunión: hora'),
      F('files', 'docs_varios', 'Otros documentos', { accept: '*/*', cam: 1 }),
      F('textarea', 'obs_finales', 'Observaciones finales')
    ]
  }
];

const TABS = SECTIONS.length;

// ============ Configuración de Supabase ============
// REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO SUPABASE
const SB_URL = 'TU_URL_DE_SUPABASE';
const SB_KEY = 'TU_ANON_KEY_DE_SUPABASE';
const BUCKET = 'levantamiento-files';

// ============ Librerías externas ============
const LIBS = {
  supa: ['https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js', () => window.supabase],
  jszip: ['https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js', () => window.JSZip],
  xlsx: ['https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js', () => window.XLSX]
};

function lib(n) {
  const [u, g] = LIBS[n];
  if (g()) return Promise.resolve(g());
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = u;
    s.onload = () => res(g());
    s.onerror = () => rej(new Error('No se pudo cargar ' + n));
    document.head.appendChild(s);
  });
}

let sb = null;

// ============ Estado de la aplicación ============
const S = { vals: {}, pend: {}, meta: {}, cur: 0, mode: 'cliente', closed: {}, view: 'boot', token: null, id: null, isAdmin: false, email: '', list: [] };
const root = document.body;
const $ = (s, r = document) => r.querySelector(s);

// ============ Funciones utilitarias ============
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const slug = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 40) || 'x';
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const todayStr = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const fmtDate = x => x ? new Date(x).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' }) : '';
const clientLink = t => location.origin + location.pathname + '?p=' + t;

function toast(t) {
  const el = $('#toast');
  el.textContent = t;
  el.classList.add('on');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('on'), 2800);
}

function setSv(t) {
  const e = $('#sv');
  if (e) e.textContent = t;
}

function setChrome(on) {
  $('#hdr').style.display = on ? '' : 'none';
  $('#foot').style.display = on ? '' : 'none';
}

// ============ Guardado automático ============
let dirty = false, saving = false, saveT = null;
const bkKey = () => 'lev_bk_' + S.token;

function persist() {
  if (!S.token) return;
  dirty = true;
  setSv('Cambios sin guardar…');
  try { localStorage.setItem(bkKey(), JSON.stringify({ ts: Date.now(), vals: S.vals, pend: S.pend, meta: S.meta })) } catch (e) { }
  clearTimeout(saveT);
  saveT = setTimeout(flush, 1200);
}

async function flush() {
  if (!dirty || !S.token) return;
  if (saving) { clearTimeout(saveT); saveT = setTimeout(flush, 800); return; }
  saving = true; dirty = false; setSv('Guardando…');
  try {
    const { error } = await sb.rpc('lev_save', { p_token: S.token, p_data: S.vals, p_pend: S.pend, p_meta: S.meta, p_progreso: stats().pct });
    if (error) throw error;
    setSv('Guardado en la nube ✓ ' + new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }));
    if (!dirty) try { localStorage.removeItem(bkKey()) } catch (e) { }
  } catch (e) {
    dirty = true; setSv('⚠ Sin conexión: se reintentará');
    clearTimeout(saveT); saveT = setTimeout(flush, 8000);
  } finally { saving = false; }
}

document.addEventListener('visibilitychange', () => { if (document.hidden) flush(); });
window.addEventListener('online', flush);

// ============ Manejo de archivos ============
const MEM = new Map(), URLS = {}, SIGNED = {};
const urlFor = id => { if (MEM.has(id)) return URLS[id] || (URLS[id] = URL.createObjectURL(MEM.get(id))); return SIGNED[id] || null; };

async function getBlob(id) {
  if (MEM.has(id)) return MEM.get(id);
  const m = S.meta[id];
  if (!m || !m.path) return null;
  const { data, error } = await sb.storage.from(BUCKET).download(m.path);
  if (error || !data) return null;
  MEM.set(id, data);
  return data;
}

async function removeFile(id) {
  const m = S.meta[id];
  MEM.delete(id);
  if (URLS[id]) { URL.revokeObjectURL(URLS[id]); delete URLS[id]; }
  delete SIGNED[id];
  if (m && m.path) { try { await sb.storage.from(BUCKET).remove([m.path]) } catch (e) { } }
  delete S.meta[id];
}

let hyd = false;
async function hydrate() {
  if (!sb) return;
  const refs = new Set();
  document.querySelectorAll('img[data-fid]').forEach(i => refs.add(i.dataset.fid));
  const need = [...refs].filter(id => S.meta[id] && S.meta[id].path && !SIGNED[id] && !MEM.has(id));
  if (need.length && !hyd) {
    hyd = true;
    try {
      const { data } = await sb.storage.from(BUCKET).createSignedUrls(need.map(id => S.meta[id].path), 3600);
      (data || []).forEach((d, i) => { if (d && d.signedUrl) SIGNED[need[i]] = d.signedUrl; });
    } catch (e) { }
    hyd = false;
  }
  document.querySelectorAll('img[data-fid]').forEach(i => {
    const u = urlFor(i.dataset.fid);
    if (u && i.getAttribute('src') !== u) i.src = u;
  });
}

async function shrink(f, max = 2000, q = .86) {
  try {
    const bmp = await createImageBitmap(f);
    const s = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas');
    c.width = Math.round(bmp.width * s);
    c.height = Math.round(bmp.height * s);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise(r => c.toBlob(r, 'image/jpeg', q));
  } catch (e) { return null; }
}

async function addFiles(k, r, c, list) {
  if (!list.length) return;
  toast('Subiendo ' + list.length + ' archivo(s)…');
  const ids = []; let fail = 0;
  for (const f of list) {
    let blob = f, name = f.name || ('foto_' + Date.now() + '.jpg');
    if (/^image\/(jpeg|webp)$/.test(f.type) && f.size > 1.5e6) {
      const sb2 = await shrink(f);
      if (sb2 && sb2.size < f.size) { blob = sb2; name = name.replace(/\.\w+$/, '') + '.jpg'; }
    }
    const id = uid();
    const ext = name.includes('.') ? '.' + name.split('.').pop().toLowerCase().replace(/[^a-z0-9]/g, '') : '';
    const path = `${S.token}/${id}_${slug(name.replace(/\.\w+$/, ''))}${ext}`;
    const { error } = await sb.storage.from(BUCKET).upload(path, blob, { contentType: blob.type || 'application/octet-stream', upsert: false });
    if (error) { fail++; toast('No se pudo subir «' + name + '»'); continue; }
    S.meta[id] = { name, type: blob.type || f.type || '', size: blob.size, path };
    MEM.set(id, blob); ids.push(id);
  }
  if (ids.length) {
    const arr = r == null ? (S.vals[k] || (S.vals[k] = [])) : (S.vals[k][r][c] || (S.vals[k][r][c] = []));
    arr.push(...ids); persist(); refreshFiles(k, r, c); updateStats();
    if (!fail) toast('✔ ' + ids.length + ' archivo(s) subido(s)');
  }
}

// ============ Funciones de campos ============
function fieldDef(k) {
  for (const s of SECTIONS) for (const f of s.fields) if (f.k === k) return f;
}

function rowHas(row) {
  return Object.values(row || {}).some(x => Array.isArray(x) ? x.length > 0 : (x === true || (typeof x === 'string' && x.trim() !== '')));
}

function filled(f) {
  const v = S.vals[f.k];
  if (f.type === 'repeater') return Array.isArray(v) && v.some(rowHas);
  if (Array.isArray(v)) return v.length > 0;
  return typeof v === 'string' && v.trim() !== '';
}

function stats() {
  let T = 0, D = 0;
  const per = SECTIONS.map(s => {
    let t = 0, d = 0; const miss = [], pen = [];
    s.fields.forEach(f => {
      if (f.type === 'note') return;
      t++;
      if (filled(f)) d++;
      else if (S.pend[f.k]) pen.push(f);
      else miss.push(f);
    });
    T += t; D += d;
    return { t, d, miss, pen };
  });
  return { T, D, per, pct: T ? Math.round(D / T * 100) : 0 };
}

function fileNames(ids) {
  return (ids || []).map(i => S.meta[i] ? S.meta[i].name : '').filter(Boolean);
}

function valText(f) {
  const v = S.vals[f.k];
  if (f.type === 'files') return fileNames(v).join('; ');
  if (f.type === 'checks') return (v || []).join('; ');
  if (f.type === 'repeater') return (v || []).filter(rowHas).length + ' registro(s)';
  return v || '';
}

// ============ Generación de HTML ============
function fieldHTML(f) {
  if (f.type === 'note') return `<p class="note">${esc(f.label)}</p>`;
  const p = !!S.pend[f.k];
  return `<div class="field${p ? ' pend' : ''}" id="f_${f.k}"><div class="fh"><label class="lbl">${f.key ? '<span class="star" title="Prioritario">★</span> ' : ''}${esc(f.label)}</label><button type="button" class="pb${p ? ' on' : ''}" data-act="pend" data-pk="${f.k}">⏳ ${p ? 'Pendiente' : 'Marcar pendiente'}</button></div>${f.hint ? `<div class="hint">${esc(f.hint)}</div>` : ''}${inputHTML(f)}</div>`;
}

function inputHTML(f) {
  const v = S.vals[f.k], k = f.k;
  switch (f.type) {
    case 'textarea': return `<textarea data-k="${k}" placeholder="${esc(f.ph || '')}">${esc(v || '')}</textarea>`;
    case 'select': return `<select data-k="${k}"><option value="">— Seleccionar —</option>${f.opts.map(o => `<option${v === o ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
    case 'radio': return `<div class="opts">${f.opts.map(o => `<label class="opt"><input type="radio" name="r_${k}" data-k="${k}" value="${esc(o)}"${v === o ? ' checked' : ''}><span>${esc(o)}</span></label>`).join('')}</div>`;
    case 'checks': {
      const a = v || [];
      return `<div class="opts">${f.opts.map(o => `<label class="opt"><input type="checkbox" data-k="${k}" data-opt="${esc(o)}"${a.includes(o) ? ' checked' : ''}><span>${esc(o)}</span></label>`).join('')}</div>`;
    }
    case 'color': return `<div class="color"><input type="color" data-k="${k}" data-cp value="${/^#[0-9a-f]{6}$/i.test(v || '') ? v : '#cccccc'}"><input type="text" data-k="${k}" data-ct placeholder="#RRGGBB" value="${esc(v || '')}" style="max-width:150px"></div>`;
    case 'files': return `<div class="files" id="${fwId(k)}">${filesInner(k, null, null, f)}</div>`;
    case 'repeater': return repHTML(f);
    case 'number': return `<input type="number" inputmode="decimal" step="any" data-k="${k}" value="${esc(v || '')}">`;
    default: return `<input type="${f.type}" data-k="${k}" value="${esc(v || '')}" placeholder="${esc(f.ph || '')}">`;
  }
}

const fwId = (k, r, c) => `fw_${k}_${r == null ? 'x' : r}_${c || 'x'}`;

function filesInner(k, r, c, def) {
  const arr = r == null ? (S.vals[k] || []) : ((S.vals[k][r] || {})[c] || []);
  const attr = `data-fk="${k}"${r != null ? ` data-fr="${r}" data-fc="${c}"` : ''}`;
  const acc = def.accept ? ` accept="${esc(def.accept)}"` : '';
  const th = arr.map(id => {
    const m = S.meta[id] || { name: '?', type: '' };
    const isImg = /^image\//.test(m.type);
    const u = isImg ? urlFor(id) : null;
    const ext = (m.name.split('.').pop() || '').slice(0, 4).toUpperCase();
    return `<div class="th"><div class="im">${isImg ? `<img ${u ? `src="${u}" ` : ''}data-fid="${id}" alt="">` : esc(ext)}</div><span title="${esc(m.name)}">${esc(m.name)}</span><button type="button" data-act="rmf" data-id="${id}" data-k="${k}"${r != null ? ` data-r="${r}" data-c="${c}"` : ''}>✕</button></div>`;
  }).join('');
  return `<div class="fbar"><label class="btn ghost sm"><input type="file" hidden multiple${acc} ${attr}>📎 Adjuntar archivos</label>${def.cam ? `<label class="btn ghost sm"><input type="file" hidden accept="image/*" capture="environment" ${attr}>📷 Tomar foto</label>` : ''}</div>${arr.length ? `<div class="thumbs">${th}</div>` : ''}`;
}

function repHTML(f) {
  const rows = S.vals[f.k] || [];
  const cards = rows.map((row, i) => {
    const title = row[f.title] || `${cap(f.item)} ${i + 1}`;
    const key = f.k + i;
    return `<details data-ck="${key}"${S.closed[key] ? '' : ' open'}><summary><span class="rn">${i + 1}</span><span class="rt">${esc(title)}</span><span class="ra"><button type="button" class="btn ghost sm" data-act="dup" data-k="${f.k}" data-r="${i}" title="Duplicar">⧉</button><button type="button" class="btn danger sm" data-act="del" data-k="${f.k}" data-r="${i}" title="Eliminar">🗑</button></span></summary><div class="grid">${f.cols.map(c => cellHTML(f, c, row, i)).join('')}</div></details>`;
  }).join('');
  return `<div class="rep">${cards}<div class="repbar"><button type="button" class="btn" data-act="add" data-k="${f.k}">＋ Añadir ${esc(f.item)}</button>${f.bulk ? `<button type="button" class="btn ghost" data-act="add5" data-k="${f.k}">＋ 5 filas</button>` : ''}</div></div>`;
}

function cellHTML(f, c, row, i) {
  const v = row[c.c];
  const d = `data-k="${f.k}" data-r="${i}" data-c="${c.c}"`;
  const cls = c.w || c.t === 'textarea' || c.t === 'files' ? ' class="full"' : '';
  let inner = '';
  if (c.t === 'check') return `<div class="full"><label class="chk"><input type="checkbox" ${d}${v ? ' checked' : ''}>${esc(c.l)}</label></div>`;
  if (c.t === 'files') inner = `<div class="files" id="${fwId(f.k, i, c.c)}">${filesInner(f.k, i, c.c, c)}</div>`;
  else if (c.t === 'textarea') inner = `<textarea ${d}>${esc(v || '')}</textarea>`;
  else if (c.t === 'select') inner = `<select ${d}><option value="">—</option>${c.o.map(o => `<option${v === o ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
  else inner = `<input type="${c.t === 'number' ? 'number' : c.t}" ${c.t === 'number' ? 'inputmode="decimal" step="any" ' : ''}${d} value="${esc(v || '')}">`;
  return `<div${cls}><label class="cl">${esc(c.l)}</label>${inner}</div>`;
}

function sectionHTML(i) {
  const s = SECTIONS[i];
  const intro = S.mode === 'cliente' ?
    `<div class="banner">Todos los campos son <b>opcionales</b>. Si algún dato no lo tienes, pulsa «⏳ Marcar pendiente». <b>Tu avance se guarda solo</b>.</div>` :
    `<div class="banner">Modo presencial: llena lo que veas en sitio, toma fotos con 📷 y marca como pendiente lo que el cliente enviará después.</div>`;
  const note = S.mode === 'presencial' ?
    `<div class="internal"><div class="lbl">🔒 Notas internas (sección «${esc(s.short)}»)</div><textarea data-k="nota_${s.id}" placeholder="Observaciones, dudas…">${esc(S.vals['nota_' + s.id] || '')}</textarea></div>` :
    '';
  return `<div class="sec-h"><div class="ic">${s.ic}</div><div><h2>${esc(s.title)}</h2><p>${esc(s.desc)}</p></div></div>${intro}${s.fields.map(fieldHTML).join('')}${note}`;
}

function summaryHTML() {
  const st = stats();
  const bars = SECTIONS.map((s, i) => {
    const p = st.per[i];
    const pc = p.t ? Math.round(p.d / p.t * 100) : 0;
    return `<div class="srow" data-act="tab" data-i="${i}"><span class="n">${s.ic} ${esc(s.short)}</span><div class="pbar"><i style="width:${pc}%"></i></div><span class="p">${pc}%</span></div>`;
  }).join('');

  const keyMiss = [], pend = [], other = [];
  SECTIONS.forEach((s, i) => st.per[i].miss.forEach(f => (f.key ? keyMiss : other).push({ s, i, f })));
  SECTIONS.forEach((s, i) => st.per[i].pen.forEach(f => pend.push({ s, i, f })));

  const li = (a, t) => a.length ?
    `<ul class="mlist">${a.map(x => `<li data-act="goto" data-i="${x.i}" data-k="${x.f.k}">${esc(x.f.label)} <em>· ${esc(x.s.short)}</em>${t ? `<span class="tag ${t}">${t === 'k' ? 'prioritario' : 'pendiente'}</span>` : ''}</li>`).join('')}</ul>` :
    '<p style="color:var(--ok);margin:0">✔ Nada por aquí</p>';

  const link = S.isAdmin ?
    `<div class="card"><h3>🔗 Enlace para el cliente</h3><input type="text" readonly value="${esc(clientLink(S.token))}" onclick="this.select()" style="font-size:12.5px"><div class="btns" style="margin-top:8px"><button class="btn" data-act="copylink">📋 Copiar enlace</button><button class="btn ghost" data-act="walink">💬 WhatsApp</button></div><p class="hint" style="margin-top:8px">El cliente abre el enlace, llena lo que pueda y todo se guarda aquí.</p></div>` :
    '';

  return `<div class="sec-h"><div class="ic">📊</div><div><h2>Resumen y exportación</h2><p>${st.D} de ${st.T} campos completos (${st.pct}%).</p></div></div>
  ${link}
  <div class="card"><h3>Avance por sección</h3>${bars}</div>
  <div class="card"><h3>⭐ Prioritarios que faltan (${keyMiss.length})</h3>${li(keyMiss, 'k')}</div>
  <div class="card"><h3>⏳ Pendientes (${pend.length})</h3>${li(pend, 'p')}</div>
  <details class="card"><summary style="cursor:pointer;font-weight:600;color:var(--pri)">Otros sin responder (${other.length})</summary><div style="margin-top:8px">${li(other, '')}</div></details>
  <div class="card"><h3>📤 Descargar informe</h3>
   <div class="btns">
    <button class="btn acc" data-act="xlsx">📊 Excel</button>
    <button class="btn acc" data-act="zip">📦 ZIP completo</button>
   </div>
   <p class="hint" style="margin-top:8px">Excel incluye todos los datos. ZIP agrega los archivos originales.</p>
   <div class="btns" style="margin-top:6px"><button class="btn ghost sm" data-act="copy">📋 Copiar resumen</button></div>
   <textarea id="sumTxt" readonly style="min-height:130px;font-size:12.5px">${esc(summaryText())}</textarea>
  </div>`;
}

// ============ Renderizado ============
function renderProject() {
  setChrome(true);
  $('#main').innerHTML = S.cur === TABS ? summaryHTML() : sectionHTML(S.cur);
  buildChips(); updateStats();
  $('#modeSeg').style.display = S.isAdmin ? '' : 'none';
  $('#backBtn').style.display = S.isAdmin ? '' : 'none';
  $('#modeSeg').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.m === S.mode));
  $('[data-act="prev"]').style.visibility = S.cur === 0 ? 'hidden' : 'visible';
  $('[data-act="next"]').style.visibility = S.cur === TABS ? 'hidden' : 'visible';
  hydrate();
}

function buildChips() {
  $('#chips').innerHTML = SECTIONS.map((s, i) => `<button class="chip" data-act="tab" data-i="${i}">${s.ic} ${esc(s.short)}<b></b></button>`).join('') + `<button class="chip" data-act="tab" data-i="${TABS}">📊 Resumen</button>`;
}

function updateStats() {
  const st = stats();
  $('#bar').style.width = st.pct + '%';
  $('#pct').textContent = st.pct + '% completo';
  const np = SECTIONS.reduce((a, s, i) => a + st.per[i].pen.length, 0);
  $('#pinfo2').textContent = `${st.D}/${st.T} campos${np ? ` · ${np} pendientes` : ''}`;
  $('#chips').querySelectorAll('.chip').forEach((c, i) => {
    c.classList.toggle('on', i === S.cur);
    const b = $('b', c);
    if (b && i < TABS) { const p = st.per[i]; b.textContent = p.t ? Math.round(p.d / p.t * 100) + '%' : ''; }
  });
  const e = S.vals.empresa, p = S.vals.proyecto;
  $('#sub').textContent = [e, p].filter(Boolean).join(' · ');
}

function go(i, fk) {
  S.cur = Math.max(0, Math.min(TABS, i));
  renderProject();
  if (fk) {
    const el = document.getElementById('f_' + fk);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.outline = '2px solid var(--acc)';
      setTimeout(() => el.style.outline = '', 1800);
      return;
    }
  }
  window.scrollTo(0, 0);
  const c = $('.chip.on');
  if (c) c.scrollIntoView({ inline: 'center', block: 'nearest' });
}

// ============ Pantallas ============
function showLogin(msg) {
  S.view = 'login'; setChrome(false); document.title = 'Levantamiento de información';
  $('#main').innerHTML = `<div class="auth card">
    <div class="sec-h"><div class="ic">📋</div><div><h2>Levantamiento de información</h2><p>Acceso del administrador</p></div></div>
    ${msg ? `<div class="banner">${esc(msg)}</div>` : ''}
    <label class="cl">Correo</label><input id="em" type="email" autocomplete="username" value="${esc(S.email || '')}">
    <label class="cl" style="margin-top:8px">Contraseña</label><input id="pw" type="password" autocomplete="current-password" placeholder="mínimo 6 caracteres">
    <div class="btns" style="margin-top:14px">
      <button class="btn" data-act="login">Entrar</button>
      <button class="btn ghost" data-act="signup">Crear cuenta</button>
    </div>
    <p class="hint" style="margin-top:12px">La primera cuenta creada queda como administradora. Si eres cliente, abre el enlace que te enviaron.</p>
  </div>`;
}

async function showHome() {
  S.view = 'home'; S.token = null; setChrome(false); document.title = 'Levantamientos';
  history.replaceState(null, '', location.pathname);
  
  $('#main').innerHTML = `<div class="topbar">
    <h1>📋 Levantamientos</h1>
    <div>
      <span class="hint">${esc(S.email)}</span> 
      <button class="btn ghost sm" data-act="logout">Salir</button>
    </div>
  </div>
  
  <div class="card">
    <h3>➕ Nuevo levantamiento</h3>
    <div class="grid" style="padding:0">
      <div>
        <label class="cl">Nombre de la empresa / cliente *</label>
        <input id="nEmp" type="text" placeholder="Ej: FILAM CENTROPLAST">
      </div>
      <div>
        <label class="cl">Nombre del proyecto *</label>
        <input id="nPro" type="text" placeholder="Ej: E-commerce">
      </div>
    </div>
    <div class="btns" style="margin-top:12px">
      <button class="btn acc" data-act="create">Crear y empezar</button>
    </div>
  </div>
  
  <div id="plist"><p class="hint">Cargando proyectos…</p></div>`;

  const { data, error } = await sb.from('levantamientos').select('id,empresa,proyecto,share_token,progreso,updated_at,created_at').order('updated_at', { ascending: false });
  if (error) { $('#plist').innerHTML = `<div class="banner">No se pudo cargar: ${esc(error.message)}</div>`; return; }
  S.list = data || [];
  $('#plist').innerHTML = S.list.length ?
    `<h3 style="color:var(--pri)">Proyectos (${S.list.length})</h3>` +
    S.list.map(p => `<div class="card">
      <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
        <div>
          <b style="font-size:16px">${esc(p.empresa)}</b>
          <div class="hint">${esc(p.proyecto || '—')} · actualizado ${esc(fmtDate(p.updated_at))}</div>
        </div>
        <div style="text-align:right;min-width:60px">
          <b style="color:var(--acc)">${p.progreso}%</b>
        </div>
      </div>
      <div class="pbar" style="margin:8px 0"><i style="width:${p.progreso}%"></i></div>
      <div class="btns">
        <button class="btn sm" data-act="open" data-t="${p.share_token}">Abrir</button>
        <button class="btn ghost sm" data-act="copylink" data-t="${p.share_token}">🔗 Copiar enlace</button>
        <button class="btn danger sm" data-act="delp" data-id="${p.id}" data-t="${p.share_token}">🗑 Eliminar</button>
      </div>
    </div>`).join('') :
    '<p class="hint">Aún no hay levantamientos. Crea el primero arriba.</p>';
}

async function createLev() {
  const emp = ($('#nEmp').value || '').trim(), pro = ($('#nPro').value || '').trim();
  if (!emp) { toast('Escribe el nombre de la empresa o cliente'); $('#nEmp').focus(); return; }
  const { data, error } = await sb.from('levantamientos').insert({ empresa: emp, proyecto: pro, data: { empresa: emp, proyecto: pro, fecha: todayStr() } }).select('share_token').single();
  if (error) { toast('No se pudo crear: ' + error.message); return; }
  await openProject(data.share_token);
}

async function openProject(token) {
  setChrome(false); $('#main').innerHTML = '<p class="hint" style="text-align:center;margin-top:60px">Cargando…</p>';
  const { data: row, error } = await sb.rpc('lev_get', { p_token: token });
  if (error || !row) {
    $('#main').innerHTML = `<div class="auth card">
      <h2>Enlace no válido</h2>
      <p>Este enlace no existe o fue eliminado. Pide uno nuevo a quien te lo envió.</p>
      ${S.isAdmin ? '<button class="btn" data-act="home">Ir a proyectos</button>' : ''}
    </div>`;
    return;
  }
  S.token = token; S.id = row.id; S.vals = row.data || {}; S.pend = row.pend || {}; S.meta = row.meta || {}; S.closed = {}; S.cur = 0;
  MEM.clear(); for (const k in SIGNED) delete SIGNED[k];
  try {
    const bk = JSON.parse(localStorage.getItem(bkKey()) || 'null');
    if (bk && bk.ts > new Date(row.updated_at).getTime()) {
      S.vals = bk.vals; S.pend = bk.pend; S.meta = bk.meta; dirty = true;
      toast('Se recuperaron cambios sin sincronizar'); saveT = setTimeout(flush, 500);
    }
  } catch (e) { }
  if (S.vals.empresa === undefined) S.vals.empresa = row.empresa;
  if (S.vals.proyecto === undefined) S.vals.proyecto = row.proyecto;
  if (S.vals.fecha === undefined) S.vals.fecha = todayStr();
  S.mode = S.isAdmin ? (localStorage.getItem('lev_mode') || 'presencial') : 'cliente';
  S.view = 'project'; document.title = 'Levantamiento · ' + row.empresa;
  history.replaceState(null, '', '?p=' + token);
  setSv('Cargado ✓'); renderProject();
}

// ============ Eventos ============
function onInput(e) {
  const t = e.target;
  if (!t.matches || !t.matches('input,select,textarea')) return;
  if (t.dataset.fk !== undefined) {
    if (e.type === 'change') { const fl = [...t.files]; t.value = ''; addFiles(t.dataset.fk, t.dataset.fr !== undefined ? +t.dataset.fr : null, t.dataset.fc || null, fl); }
    return;
  }
  const k = t.dataset.k;
  if (!k || S.view !== 'project') return;
  if (t.dataset.r !== undefined) {
    const row = S.vals[k][+t.dataset.r]; const c = t.dataset.c;
    row[c] = t.type === 'checkbox' ? t.checked : t.value;
    const f = fieldDef(k);
    if (f && c === f.title) { const d = t.closest('details'); if (d) $('.rt', d).textContent = t.value || `${cap(f.item)} ${+t.dataset.r + 1}`; }
  } else if (t.type === 'checkbox') {
    const a = S.vals[k] || (S.vals[k] = []); const o = t.dataset.opt; const i = a.indexOf(o);
    if (t.checked && i < 0) a.push(o); if (!t.checked && i >= 0) a.splice(i, 1);
  } else if (t.type === 'radio') {
    if (t.checked) S.vals[k] = t.value;
  } else if (t.dataset.cp !== undefined) {
    S.vals[k] = t.value; const x = t.parentNode.querySelector('[data-ct]'); if (x) x.value = t.value;
  } else if (t.dataset.ct !== undefined) {
    S.vals[k] = t.value; if (/^#[0-9a-f]{6}$/i.test(t.value)) { const x = t.parentNode.querySelector('[data-cp]'); if (x) x.value = t.value; }
  } else S.vals[k] = t.value;
  persist(); updateStats();
}

root.addEventListener('input', onInput);
root.addEventListener('change', onInput);
root.addEventListener('toggle', e => { const d = e.target; if (d.dataset && d.dataset.ck !== undefined) { S.closed[d.dataset.ck] = !d.open; } }, true);
root.addEventListener('click', e => { const b = e.target.closest('[data-act]'); if (!b) return; act(b.dataset.act, b); });
root.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.id === 'pw') act('login', e.target);
  if (e.key === 'Enter' && (e.target.id === 'nEmp' || e.target.id === 'nPro')) createLev();
});

function arm(b, label, fn) {
  if (b.dataset.armed) { clearTimeout(b._t); delete b.dataset.armed; b.textContent = b.dataset.orig; fn(); return; }
  b.dataset.armed = 1; b.dataset.orig = b.textContent; b.textContent = label;
  b._t = setTimeout(() => { delete b.dataset.armed; b.textContent = b.dataset.orig; }, 3000);
}

async function afterAuth() {
  const { data: { session } } = await sb.auth.getSession();
  S.email = session ? session.user.email : '';
  if (!session) { S.isAdmin = false; return; }
  const { data, error } = await sb.rpc('lev_claim_admin');
  S.isAdmin = data === true && !error;
}

// ============ Acciones ============
async function act(a, b) {
  const d = b.dataset;
  switch (a) {
    case 'login': {
      const em = $('#em').value.trim(), pw = $('#pw').value;
      if (!em || !pw) { toast('Ingresa correo y contraseña'); return; }
      const { error } = await sb.auth.signInWithPassword({ email: em, password: pw });
      if (error) { toast(error.message === 'Email not confirmed' ? 'Confirma tu correo primero' : 'Credenciales incorrectas'); return; }
      await afterAuth(); S.isAdmin ? showHome() : (await sb.auth.signOut(), showLogin('Esta cuenta no tiene permisos.'));
      break;
    }
    case 'signup': {
      const em = $('#em').value.trim(), pw = $('#pw').value;
      if (!em || pw.length < 6) { toast('Correo y contraseña (mín. 6 caracteres)'); return; }
      const { data, error } = await sb.auth.signUp({ email: em, password: pw });
      if (error) { toast(error.message); return; }
      if (data.session) { await afterAuth(); S.isAdmin ? showHome() : showLogin('Cuenta creada, pero ya existe un administrador.'); }
      else { S.email = em; showLogin('Cuenta creada. Revisa tu correo para confirmarla.'); }
      break;
    }
    case 'logout': await sb.auth.signOut(); S.isAdmin = false; S.email = ''; showLogin(); break;
    case 'home': await flush(); showHome(); break;
    case 'create': createLev(); break;
    case 'open': openProject(d.t); break;
    case 'copylink': copyText(clientLink(d.t || S.token), 'Enlace copiado ✔'); break;
    case 'walink': window.open('https://wa.me/?text=' + encodeURIComponent('Hola, te comparto el formulario para el levantamiento de información de ' + (S.vals.empresa || 'tu empresa') + ':\n' + clientLink(S.token)), '_blank', 'noopener'); break;
    case 'delp': arm(b, '¿Eliminar todo?', async () => {
      try { const { data: fl } = await sb.storage.from(BUCKET).list(d.t, { limit: 1000 }); if (fl && fl.length) await sb.storage.from(BUCKET).remove(fl.map(x => d.t + '/' + x.name)); } catch (e) { }
      const { error } = await sb.from('levantamientos').delete().eq('id', d.id);
      if (error) toast(error.message); else { toast('Proyecto eliminado'); showHome(); }
    }); break;
    case 'mode': S.mode = d.m; try { localStorage.setItem('lev_mode', S.mode); } catch (e) { } renderProject(); break;
    case 'tab': go(+d.i); break;
    case 'prev': go(S.cur - 1); break;
    case 'next': go(S.cur + 1); break;
    case 'goto': go(+d.i, d.k); break;
    case 'pend': {
      const k = d.pk; S.pend[k] = !S.pend[k]; if (!S.pend[k]) delete S.pend[k];
      b.classList.toggle('on', !!S.pend[k]); b.textContent = '⏳ ' + (S.pend[k] ? 'Pendiente' : 'Marcar pendiente');
      $('#f_' + k).classList.toggle('pend', !!S.pend[k]); persist(); updateStats(); break;
    }
    case 'add': case 'add5': {
      const arr = S.vals[d.k] || (S.vals[d.k] = []); const n = a === 'add5' ? 5 : 1;
      for (let i = 0; i < n; i++) arr.push({}); persist(); rerenderField(d.k); break;
    }
    case 'dup': {
      const arr = S.vals[d.k]; const src = arr[+d.r]; const cp = {};
      for (const x in src) cp[x] = Array.isArray(src[x]) ? [] : src[x];
      arr.splice(+d.r + 1, 0, cp); persist(); rerenderField(d.k); break;
    }
    case 'del': arm(b, '¿Borrar?', async () => {
      const arr = S.vals[d.k]; const row = arr[+d.r];
      for (const v of Object.values(row)) if (Array.isArray(v)) for (const id of v) await removeFile(id);
      arr.splice(+d.r, 1); persist(); rerenderField(d.k);
    }); break;
    case 'rmf': {
      const arr = d.r !== undefined ? S.vals[d.k][+d.r][d.c] : S.vals[d.k];
      const i = arr.indexOf(d.id); if (i >= 0) arr.splice(i, 1);
      await removeFile(d.id); persist(); refreshFiles(d.k, d.r !== undefined ? +d.r : null, d.c || null); updateStats(); break;
    }
    case 'xlsx': run(b, exportXlsx); break;
    case 'zip': run(b, exportZip); break;
    case 'copy': copyText(summaryText(), 'Resumen copiado ✔'); break;
  }
}

async function run(b, fn) {
  b.disabled = true;
  try { await flush(); await fn(); } catch (e) { toast('Error: ' + (e && e.message || e)); } finally { b.disabled = false; }
}

function rerenderField(k) {
  const f = fieldDef(k); const el = document.getElementById('f_' + k);
  if (!el) return; const y = window.scrollY; el.outerHTML = fieldHTML(f);
  window.scrollTo(0, y); updateStats(); hydrate();
}

function refreshFiles(k, r, c) {
  const f = fieldDef(k); const def = r == null ? f : f.cols.find(x => x.c === c);
  const el = document.getElementById(fwId(k, r, c));
  if (el) el.innerHTML = filesInner(k, r, c, def); hydrate();
}

async function copyText(t, msg) {
  try { await navigator.clipboard.writeText(t); toast(msg || 'Copiado ✔'); }
  catch (e) {
    const x = document.createElement('textarea'); x.value = t; x.style.position = 'fixed'; x.style.opacity = '0';
    document.body.appendChild(x); x.select(); let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) { } x.remove();
    toast(ok ? (msg || 'Copiado ✔') : 'No se pudo copiar automáticamente');
  }
}

// ============ Resumen de texto ============
function summaryText() {
  const st = stats(); const v = k => S.vals[k] || '—';
  let t = `📋 LEVANTAMIENTO DE INFORMACIÓN\n${v('empresa')} · ${v('proyecto')}\nFecha: ${v('fecha')}  |  Por: ${v('levantador')}\n\nAvance: ${st.pct}% (${st.D}/${st.T} campos)\n`;
  SECTIONS.forEach((s, i) => { const p = st.per[i]; t += `• ${s.short}: ${p.t ? Math.round(p.d / p.t * 100) : 0}%\n`; });
  const km = []; SECTIONS.forEach((s, i) => st.per[i].miss.forEach(f => f.key && km.push(f.label)));
  const pn = []; SECTIONS.forEach((s, i) => st.per[i].pen.forEach(f => pn.push(f.label)));
  if (km.length) t += `\n⭐ PRIORITARIOS QUE FALTAN:\n` + km.map(x => '- ' + x).join('\n') + '\n';
  if (pn.length) t += `\n⏳ PENDIENTES:\n` + pn.map(x => '- ' + x).join('\n') + '\n';
  const cp = (S.vals.pendientes || []).filter(rowHas);
  if (cp.length) t += `\n📌 COMPROMISOS:\n` + cp.map(r => `- ${r.item || ''} (${r.resp || '—'}, ${r.fecha || 'sin fecha'})`).join('\n') + '\n';
  if (S.vals.reunion_fecha) t += `\n📅 Próxima reunión: ${S.vals.reunion_fecha} ${S.vals.reunion_hora || ''}\n`;
  return t;
}

// ============ Guardado de archivos ============
async function saveFile(name, data) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(data); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 20000); toast('Descarga iniciada');
}

const baseName = () => `Levantamiento_${slug(S.vals.empresa)}_${S.vals.fecha || todayStr()}`;

// ============ Exportación a Excel ============
async function exportXlsx() {
  const X = await lib('xlsx');
  const wb = X.utils.book_new();
  const rows = [['Sección', 'Campo', 'Respuesta', 'Estado']];
  SECTIONS.forEach(s => {
    s.fields.forEach(f => {
      if (f.type === 'note') return;
      const st = filled(f) ? 'Completo' : S.pend[f.k] ? 'Pendiente' : 'Falta';
      rows.push([s.short, f.label, f.type === 'repeater' ? valText(f) + ` (hoja ${f.sheet})` : f.type === 'password' && S.vals[f.k] ? '(proporcionada)' : valText(f), st]);
    });
    const n = S.vals['nota_' + s.id]; if (n) rows.push([s.short, 'Notas internas', n, '']);
  });
  const w1 = X.utils.aoa_to_sheet(rows); w1['!cols'] = [{ wch: 16 }, { wch: 55 }, { wch: 70 }, { wch: 11 }];
  X.utils.book_append_sheet(wb, w1, 'Datos');

  SECTIONS.forEach(s => s.fields.forEach(f => {
    if (f.type !== 'repeater') return;
    const data = (S.vals[f.k] || []).filter(rowHas);
    const hdr = f.cols.map(c => c.t === 'files' ? c.l + ' (archivos)' : c.l);
    const body = data.map(r => f.cols.map(c => c.t === 'files' ? fileNames(r[c.c]).join('; ') : c.t === 'check' ? (r[c.c] ? 'Sí' : '') : (r[c.c] || '')));
    const ws = X.utils.aoa_to_sheet([hdr, ...body]); ws['!cols'] = hdr.map(() => ({ wch: 24 }));
    X.utils.book_append_sheet(wb, ws, f.sheet);
  }));

  const st = stats(); const pr = [['Tipo', 'Campo', 'Sección']];
  SECTIONS.forEach((s, i) => { st.per[i].miss.forEach(f => pr.push([f.key ? 'Prioritario faltante' : 'Sin responder', f.label, s.short])); st.per[i].pen.forEach(f => pr.push(['Pendiente marcado', f.label, s.short])); });
  const w3 = X.utils.aoa_to_sheet(pr); w3['!cols'] = [{ wch: 22 }, { wch: 70 }, { wch: 16 }];
  X.utils.book_append_sheet(wb, w3, 'Pendientes');

  await saveFile(baseName() + '.xlsx', new Blob([X.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' }));
}

// ============ Exportación a ZIP ============
async function exportZip() {
  toast('Generando paquete…');
  const [JS, X] = await Promise.all([lib('jszip'), lib('xlsx')]);
  const z = new JS(); const paths = {}, used = new Set();

  for (const x of fileIds()) {
    const m = S.meta[x.id]; if (!m) continue;
    const bl = await getBlob(x.id); if (!bl) continue;
    const dir = `archivos/${x.sec.id}/${x.k}${x.r != null ? '_' + (x.r + 1) + '_' + slug(x.row[x.f.title] || '') : ''}`;
    const ext = m.name.includes('.') ? '.' + m.name.split('.').pop() : '';
    let p = dir + '/' + slug(m.name.replace(/\.\w+$/, '')) + ext;
    if (used.has(p)) p = dir + '/' + x.id + '_' + slug(m.name.replace(/\.\w+$/, '')) + ext;
    used.add(p); paths[x.id] = p; z.file(p, bl);
  }

  z.file('datos.json', JSON.stringify({ app: 'levantamiento-v2', exportado: new Date().toISOString(), vals: S.vals, pend: S.pend }, null, 1));
  z.file('resumen.txt', summaryText());
  z.file('levantamiento.xlsx', await xlsxBuild(X));

  await saveFile(baseName() + '.zip', await z.generateAsync({ type: 'blob', compression: 'DEFLATE' }));
}

function fileIds() {
  const out = [];
  SECTIONS.forEach(s => s.fields.forEach(f => {
    if (f.type === 'files') (S.vals[f.k] || []).forEach(id => out.push({ id, sec: s, k: f.k, r: null, row: null, f }));
    else if (f.type === 'repeater') (S.vals[f.k] || []).forEach((row, r) => f.cols.forEach(c => {
      if (c.t === 'files') (row[c.c] || []).forEach(id => out.push({ id, sec: s, k: f.k + '_' + c.c, r, row, f }));
    }));
  }));
  return out;
}

async function xlsxBuild(X) {
  const wb = X.utils.book_new();
  const rows = [['Sección', 'Campo', 'Respuesta', 'Estado']];
  SECTIONS.forEach(s => {
    s.fields.forEach(f => {
      if (f.type === 'note') return;
      const st = filled(f) ? 'Completo' : S.pend[f.k] ? 'Pendiente' : 'Falta';
      rows.push([s.short, f.label, f.type === 'repeater' ? valText(f) + ` (hoja ${f.sheet})` : f.type === 'password' && S.vals[f.k] ? '(proporcionada)' : valText(f), st]);
    });
    const n = S.vals['nota_' + s.id]; if (n) rows.push([s.short, 'Notas internas', n, '']);
  });
  const w1 = X.utils.aoa_to_sheet(rows); w1['!cols'] = [{ wch: 16 }, { wch: 55 }, { wch: 70 }, { wch: 11 }];
  X.utils.book_append_sheet(wb, w1, 'Datos');
  SECTIONS.forEach(s => s.fields.forEach(f => {
    if (f.type !== 'repeater') return;
    const data = (S.vals[f.k] || []).filter(rowHas);
    const hdr = f.cols.map(c => c.t === 'files' ? c.l + ' (archivos)' : c.l);
    const body = data.map(r => f.cols.map(c => c.t === 'files' ? fileNames(r[c.c]).join('; ') : c.t === 'check' ? (r[c.c] ? 'Sí' : '') : (r[c.c] || '')));
    const ws = X.utils.aoa_to_sheet([hdr, ...body]); ws['!cols'] = hdr.map(() => ({ wch: 24 }));
    X.utils.book_append_sheet(wb, ws, f.sheet);
  }));
  const st = stats(); const pr = [['Tipo', 'Campo', 'Sección']];
  SECTIONS.forEach((s, i) => { st.per[i].miss.forEach(f => pr.push([f.key ? 'Prioritario faltante' : 'Sin responder', f.label, s.short])); st.per[i].pen.forEach(f => pr.push(['Pendiente marcado', f.label, s.short])); });
  const w3 = X.utils.aoa_to_sheet(pr); w3['!cols'] = [{ wch: 22 }, { wch: 70 }, { wch: 16 }];
  X.utils.book_append_sheet(wb, w3, 'Pendientes');
  return X.write(wb, { bookType: 'xlsx', type: 'array' });
}

// ============ Inicialización ============
(async function boot() {
  try { const sup = await lib('supa'); sb = sup.createClient(SB_URL, SB_KEY, { auth: { persistSession: true, autoRefreshToken: true } }); }
  catch (e) { $('#main').innerHTML = '<div class="auth card"><h2>Sin conexión</h2><p>No se pudo cargar el sistema. Revisa tu internet y recarga la página.</p></div>'; return; }
  await afterAuth();
  const p = new URLSearchParams(location.search).get('p');
  if (p) await openProject(p); else if (S.isAdmin) await showHome(); else showLogin();
})();
