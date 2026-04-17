/* ═══════════════════════════════════════════════════════════════
   ELECTION DATA — 2021 results (real, from ECI/StatisticsTimes)
   + 2026 announced opposition candidates (DMK/AIADMK/NTK, partial)
   ═══════════════════════════════════════════════════════════════ */

// Party colors (consistent across map, detail, legends)
const PARTY={
  DMK:    {c:'#e11d48', en:'DMK',     ta:'தி.மு.க.'},
  AIADMK: {c:'#16a34a', en:'AIADMK',  ta:'அ.தி.மு.க.'},
  INC:    {c:'#2563eb', en:'Congress',ta:'காங்கிரஸ்'},
  CPI:    {c:'#dc2626', en:'CPI',     ta:'சிபிஐ'},
  CPM:    {c:'#b91c1c', en:'CPI(M)',  ta:'சிபிஎம்'},
  VCK:    {c:'#7c3aed', en:'VCK',     ta:'விசிகே'},
  PMK:    {c:'#f59e0b', en:'PMK',     ta:'பாமக'},
  BJP:    {c:'#ea580c', en:'BJP',     ta:'பாஜக'},
  DMDK:   {c:'#eab308', en:'DMDK',    ta:'தேமுதிக'},
  MNM:    {c:'#06b6d4', en:'MNM',     ta:'மநீம'},
  NTK:    {c:'#a855f7', en:'NTK',     ta:'நாதக'},
  AMMK:   {c:'#0891b2', en:'AMMK',    ta:'அமமக'},
  IUML:   {c:'#059669', en:'IUML',    ta:'இந்திய ஒன்றிய முஸ்லிம் லீக்'},
  TVK:    {c:'#ff1744', en:'TVK',     ta:'தி.வெ.க.'},
  IND:    {c:'#6b7280', en:'Ind',     ta:'சுயேட்சை'},
  OTH:    {c:'#64748b', en:'Other',   ta:'பிற'}
};

// ─── 2021 RESULTS (234 seats, all confirmed) ───
// Format: seatNum,winParty,runnerParty,marginVotes
// Source: StatisticsTimes + Wikipedia + MyNeta, cross-verified
const RAW_2021=`1,DMK,PMK,50938|2,INC,AIADMK,9689|3,DMK,AIADMK,29253|4,DMK,AIADMK,22701|5,DMK,PMK,94110|6,DMK,AIADMK,55275|7,DMK,AIADMK,31721|8,DMK,AIADMK,42146|9,DMK,AIADMK,57071|10,DMK,AIADMK,37661|11,DMK,AIADMK,42479|12,DMK,AIADMK,54976|13,DMK,AIADMK,70384|14,DMK,AIADMK,37237|15,DMK,AIADMK,55013|16,DMK,AIADMK,38768|17,DMK,AIADMK,27779|18,DMK,BJP,27274|19,DMK,PMK,69355|20,DMK,BJP,32462|21,DMK,AIADMK,27445|22,DMK,AIADMK,18367|23,DMK,AIADMK,29408|24,DMK,AIADMK,137|25,DMK,AIADMK,12633|26,INC,AIADMK,4352|27,DMK,AIADMK,35405|28,DMK,AIADMK,40571|29,INC,AIADMK,10879|30,DMK,AIADMK,37781|31,DMK,AIADMK,36824|32,DMK,AIADMK,26665|33,VCK,PMK,1947|34,VCK,AIADMK,4042|35,AIADMK,DMK,3570|36,DMK,AIADMK,1622|37,DMK,PMK,11595|38,AIADMK,VCK,27169|39,INC,PMK,26698|40,DMK,AIADMK,746|41,DMK,AIADMK,16498|42,DMK,PMK,19958|43,DMK,AIADMK,9181|44,DMK,AIADMK,6360|45,AIADMK,DMK,10582|46,DMK,AIADMK,6901|47,AIADMK,IND,4904|48,DMK,AIADMK,20232|49,DMK,AIADMK,1091|50,DMK,PMK,28240|51,AIADMK,INC,28387|52,DMK,AIADMK,12614|53,AIADMK,DMK,794|54,AIADMK,DMK,3054|55,DMK,AIADMK,12367|56,CPI,BJP,56226|57,AIADMK,DMK,28100|58,PMK,DMK,21186|59,PMK,DMK,26860|60,AIADMK,DMK,36943|61,AIADMK,CPM,30362|62,DMK,AIADMK,11570|63,DMK,BJP,94673|64,DMK,PMK,26787|65,DMK,AIADMK,9222|66,AIADMK,DMK,9725|67,AIADMK,DMK,3128|68,DMK,AIADMK,12271|69,DMK,PMK,35953|70,DMK,PMK,35803|71,PMK,DMK,2230|72,AIADMK,DMK,9753|73,AIADMK,VCK,21727|74,DMK,AIADMK,14868|75,DMK,AIADMK,9573|76,DMK,BJP,59680|77,DMK,AIADMK,5256|78,DMK,AIADMK,41728|79,DMK,PMK,45963|80,AIADMK,INC,25891|81,AIADMK,DMK,7361|82,AIADMK,DMK,8257|83,AIADMK,DMK,25955|84,AIADMK,INC,55294|85,PMK,DMK,656|86,AIADMK,DMK,93802|87,AIADMK,DMK,20045|88,PMK,DMK,21499|89,DMK,AIADMK,7588|90,AIADMK,DMK,22609|91,AIADMK,DMK,19895|92,DMK,AIADMK,1952|93,DMK,AIADMK,10493|94,DMK,AIADMK,27861|95,AIADMK,DMK,7662|96,DMK,AIADMK,2862|97,AIADMK,DMK,31646|98,INC,AIADMK,8904|99,DMK,AIADMK,22089|100,BJP,DMK,281|101,DMK,BJP,1393|102,DMK,AIADMK,7331|103,AIADMK,DMK,14507|104,AIADMK,DMK,22523|105,DMK,AIADMK,1275|106,AIADMK,DMK,28563|107,AIADMK,CPI,16008|108,INC,BJP,5348|109,AIADMK,DMK,1945|110,DMK,AIADMK,4105|111,AIADMK,DMK,2456|112,AIADMK,DMK,50902|113,AIADMK,CPI,40102|114,DMK,AIADMK,4709|115,AIADMK,DMK,32691|116,AIADMK,DMK,31932|117,AIADMK,DMK,9776|118,AIADMK,DMK,4001|119,AIADMK,DMK,41630|120,BJP,MNM,1728|121,AIADMK,DMK,10854|122,AIADMK,DMK,1095|123,AIADMK,DMK,1725|124,AIADMK,CPI,12223|125,AIADMK,INC,21895|126,AIADMK,DMK,6438|127,DMK,AIADMK,30056|128,DMK,AIADMK,28742|129,DMK,PMK,135571|130,AIADMK,DMK,27618|131,AIADMK,DMK,11932|132,AIADMK,CPM,17747|133,DMK,AIADMK,17553|134,DMK,BJP,24816|135,DMK,AIADMK,12448|136,DMK,AIADMK,31625|137,DMK,AIADMK,23540|138,DMK,AIADMK,12243|139,DMK,AIADMK,19915|140,DMK,AIADMK,85109|141,DMK,AIADMK,53797|142,DMK,AIADMK,49697|143,DMK,AIADMK,16949|144,DMK,AIADMK,59618|145,DMK,AIADMK,26836|146,DMK,AIADMK,22071|147,DMK,AIADMK,31034|148,DMK,AIADMK,6329|149,DMK,AIADMK,3234|150,DMK,PMK,5452|151,DMK,BJP,21563|152,INC,PMK,862|153,DMK,PMK,977|154,DMK,AIADMK,4697|155,DMK,AIADMK,5151|156,DMK,AIADMK,17527|157,AIADMK,DMK,8259|158,AIADMK,IUML,16937|159,VCK,AIADMK,10565|160,DMK,AIADMK,12148|161,INC,PMK,2742|162,DMK,AIADMK,3299|163,VCK,AIADMK,7238|164,CPM,PMK,16985|165,AIADMK,DMK,12329|166,CPI,AIADMK,30068|167,DMK,AIADMK,37393|168,DMK,AIADMK,51174|169,AIADMK,DMK,4424|170,DMK,AIADMK,10680|171,DMK,AIADMK,21383|172,DMK,AIADMK,16273|173,DMK,BJP,53650|174,DMK,AIADMK,47149|175,AIADMK,DMK,28835|176,DMK,AIADMK,25269|177,DMK,AIADMK,23503|178,CPM,AIADMK,12721|179,AIADMK,DMK,23598|180,DMK,AIADMK,13001|181,DMK,AIADMK,1382|182,DMK,AIADMK,25847|183,INC,AIADMK,30893|184,INC,BJP,21589|185,DMK,AIADMK,37374|186,AIADMK,CPI,11253|187,DMK,AIADMK,14091|188,AIADMK,INC,35162|189,DMK,AIADMK,49604|190,DMK,AIADMK,17045|191,DMK,BJP,22916|192,DMK,AIADMK,6515|193,DMK,AIADMK,34176|194,AIADMK,DMK,9121|195,AIADMK,CPM,29489|196,AIADMK,DMK,14087|197,AIADMK,DMK,7477|198,DMK,AIADMK,8538|199,DMK,AIADMK,21321|200,AIADMK,DMK,11021|201,DMK,AIADMK,42413|202,DMK,AIADMK,3898|203,AIADMK,INC,12738|204,DMK,AIADMK,11179|205,INC,AIADMK,17319|206,DMK,BJP,21339|207,DMK,AIADMK,39034|208,DMK,AIADMK,60992|209,DMK,AIADMK,13285|210,INC,AIADMK,13852|211,DMK,BJP,50479|212,DMK,AIADMK,20721|213,DMK,AIADMK,38549|214,DMK,AIADMK,50310|215,DMK,AIADMK,25263|216,INC,AIADMK,17372|217,DMK,AIADMK,8510|218,AIADMK,AMMK,12403|219,DMK,AIADMK,5297|220,DMK,AIADMK,2367|221,AIADMK,IUML,24349|222,AIADMK,DMK,3539|223,AIADMK,DMK,3539|224,BJP,DMK,23107|225,AIADMK,DMK,16915|226,DMK,AIADMK,52141|227,INC,AIADMK,16486|228,DMK,AIADMK,5925|229,AIADMK,DMK,16213|230,BJP,DMK,11669|231,INC,BJP,24832|232,DMK,AIADMK,26885|233,INC,BJP,28669|234,INC,AIADMK,55400`;

// Parse into P21 array indexed by seat number
const P21={};
RAW_2021.split("|").forEach(r=>{
  const[n,wp,rp,m]=r.split(",");
  P21[+n]={wp,rp,m:+m};
});

// ─── 2026 OPPOSITION CANDIDATES (partial, verified names) ───
// Keyed by constituency name (case-insensitive match). Only high-confidence picks.
// dmk = DMK 2026 candidate | admk = AIADMK 2026 candidate | ntk = NTK 2026 candidate
const C26={
  'Kolathur':      {dmk:'M.K. Stalin',          admk:'P. Santhanakrishnan', ntk:'Soundrapandian'},
  'Chepauk':       {dmk:'Udhayanidhi Stalin',   admk:'',                    ntk:'Ayisha Beham'},
  'Saidapet':      {dmk:'Ma. Subramanian'},
  'Mylapore':      {dmk:'T. Velu'},
  'T. Nagar':      {dmk:'Raja Anbazhagan',      admk:'B. Sathyanarayanan',  ntk:'Anusha Vijayakumar'},
  'Thousand Lights':{dmk:'Dr. Ezhilan Naganathan',admk:'B. Valarmathi',     ntk:'Kalanjiyam'},
  'Anna Nagar':    {dmk:'M.K. Mohan',           admk:'S. Gokula Indira',    ntk:'C. Shankar'},
  'Virugambakkam': {dmk:'Prabhakar Raja'},
  'Harbour':       {dmk:'P.K. Sekar Babu',      admk:'Royapuram R. Mano'},
  'Royapuram':     {dmk:'Dr. Idream R. Murthy', admk:'D. Jayakumar'},
  'Thiru-Vi-Ka-Nagar':{dmk:'K.S. Ravichandran'},
  'Villivakkam':   {dmk:'Karthikeyan',          admk:'S.R. Vijayakumar',    ntk:'Roshini'},
  'Perambur':      {dmk:'R.D. Sekar'},
  'Ambattur':      {dmk:'Dr. A.P. Poornima'},
  'Avadi':         {dmk:'S.M. Nasar'},
  'Madhavaram':    {ntk:'Kruthika Elumalai'},
  'Ponneri':       {admk:'P. Balaraman'},
  'Thiruvottiyur': {admk:'K. Kuppan'},
  'Velachery':     {admk:'M.K. Ashok',          ntk:'Keerthana'},
  'Sholinganallur':{dmk:'S. Aravind Ramesh',    admk:'K.P. Kandan',         ntk:'Jayalakshmi Raman'},
  'Alandur':       {admk:'S. Saravanan'},
  'Hosur':         {admk:'P. Balakrishna Reddy'},
  'Edappadi':      {admk:'K. Palaniswami (EPS)'},
  'Coimbatore South':{dmk:'V. Senthil Balaji',  admk:'Amman K. Arjunan'},
  'Pollachi':      {admk:'Pollachi V. Jayaraman'},
  'Veppanahalli':  {admk:'K.P. Munusamy'},
  'Dindigul':      {admk:'C. Srinivasan'},
  'Natham':        {admk:'R. Viswanathan'},
  'Thondamuthur':  {admk:'S.P. Velumani'},
  'Bodinayakkanur':{admk:'O. Panneerselvam (OPS)'},
  'Radhapuram':    {dmk:'M. Appavu'},
  'Kovilpatti':    {dmk:'Ka. Karunanithi'},
  'Tiruchendur':   {dmk:'Anitha Radhakrishnan'},
  'Thoothukudi':   {dmk:'P. Geetha Jeevan'},
  'Tiruchuli':     {dmk:'Thangam Thennarasu'},
  'Aruppukkottai': {dmk:'K.K.S.S.R. Ramachandran'},
  'Karaikudi':     {ntk:'Seeman (NTK Chief)'}
};

// Helper: lookup 2026 opposition candidates for a constituency name
function get2026(name){return C26[name]||{}}

// Helper: lookup 2021 result for a seat number
function get2021(n){return P21[n]||null}

// Aggregates for strongholds
const strongholds={DMK:[],AIADMK:[],swing:[],other:[]};
for(const n in P21){
  const r=P21[n],mg=r.m;
  if(r.wp==='DMK'&&mg>=30000)strongholds.DMK.push(+n);
  else if(r.wp==='AIADMK'&&mg>=30000)strongholds.AIADMK.push(+n);
  else if(mg<15000)strongholds.swing.push(+n);
  else strongholds.other.push(+n);
}
