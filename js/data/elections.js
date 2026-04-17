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
  TVK:    {c:'#ff1744', en:'TVK',     ta:'த.வெ.க.'},
  IND:    {c:'#6b7280', en:'Ind',     ta:'சுயேட்சை'},
  OTH:    {c:'#64748b', en:'Other',   ta:'பிற'}
};

// ─── 2021 RESULTS (234 seats, all confirmed, source: IndiaVotes CSV 2021) ───
// Format: seatNum,winParty,runnerParty,marginVotes,winnerName,totalElectors,pollPct,marginPct
const RAW_2021=`1,DMK,PMK,50938,Govindarajan T.J,267255,82.4,23.1|2,INC,AIADMK,9689,Durai. Chandrasekar,254351,82.1,4.6|3,DMK,AIADMK,29253,S.Chandran,276906,83.4,12.7|4,DMK,AIADMK,22701,Raajendran V.G.,260870,81.4,10.7|5,DMK,PMK,94110,Krishnaswamy A,332331,78.5,36.1|6,DMK,AIADMK,55275,Nasar S M,409701,72.9,18.5|7,DMK,AIADMK,31721,Ganapathy.K,413109,65.8,11.7|8,DMK,AIADMK,42146,Joseph Samuel,361656,65.8,17.7|9,DMK,AIADMK,57071,Sudharsanam. S,422016,71.2,19.0|10,DMK,AIADMK,37661,K.P.Shankar,287777,69.1,18.9|11,DMK,AIADMK,42479,Ebenezer. J.J. (@)  JOHN EBENEZER.J,248518,74.6,22.9|12,DMK,AIADMK,54976,Shekar. R.D,293597,67.7,27.6|13,DMK,AIADMK,70384,M.K. Stalin,268296,64.1,41.0|14,DMK,AIADMK,37237,A . Vetriazhagan,248131,57.5,26.1|15,DMK,AIADMK,55013,Sivakumar.P,210344,63.1,41.5|16,DMK,AIADMK,38768,I.Paranthamen,181071,65.2,32.8|17,DMK,AIADMK,27779,Murthy.R.Idream,178693,67.3,23.1|18,DMK,BJP,27274,Sekarbabu. P.K,168538,59.8,27.1|19,DMK,PMK,69355,Udhayanidhi Stalin,226272,59.8,51.2|20,DMK,BJP,32462,Ezhilan N,233867,57.5,24.1|21,DMK,AIADMK,27445,M.K. Mohan,274067,59.7,16.8|22,DMK,AIADMK,18367,Amv.Prabhakara Raja,273740,61.2,11.0|23,DMK,AIADMK,29295,Subramanian. Ma,269884,59.0,18.4|24,DMK,AIADMK,137,Karunanithi J,231382,59.0,0.1|25,DMK,AIADMK,12633,Velu.Dha,258722,58.8,8.3|26,INC,AIADMK,4352,Jmh.Aassan Maulaana,300466,58.2,2.5|27,DMK,AIADMK,35405,S.Aravindramesh,638950,60.3,9.2|28,DMK,AIADMK,40571,T.M.Anbarasan,363029,65.0,17.2|29,INC,AIADMK,10879,Selvaperunthagai,327294,80.1,4.2|30,DMK,AIADMK,36814,Karunanithi,407266,63.9,14.2|31,DMK,AIADMK,36824,Raja.S.R,380754,64.8,14.9|32,DMK,AIADMK,26665,Varalakshmi.M,397706,68.1,9.8|33,VCK,PMK,1947,S.S.Balaji,270769,83.0,0.9|34,VCK,AIADMK,4042,Babu M,216506,82.2,2.3|35,AIADMK,DMK,3570,Maragatham. K,218271,84.5,1.9|36,DMK,AIADMK,1622,Sundar K,247035,84.8,0.8|37,DMK,PMK,11595,C.V.M.P. Ezhailzrasan,293532,77.3,5.1|38,AIADMK,VCK,27169,S.Ravi,216909,78.3,16.0|39,INC,PMK,26698,A.M.Munirathinam,262083,85.0,12.0|40,DMK,AIADMK,746,Duraimurugan,238365,77.3,0.4|41,DMK,AIADMK,16498,R.Gandhi,254312,80.9,8.0|42,DMK,PMK,19958,J.L.Eswarappan,251362,82.6,9.6|43,DMK,AIADMK,9181,Karthikeyan .P,245491,72.7,5.1|44,DMK,AIADMK,6360,A.P.Nandakumar,241068,81.3,3.2|45,AIADMK,DMK,10582,M.Jagan Moorthy,216745,79.5,6.1|46,DMK,AIADMK,6901,Amulu.V,272216,77.1,3.3|47,AIADMK,IND,4904,G.Sendhil Kumar,237690,79.3,2.6|48,DMK,AIADMK,20232,Vilwanathan.A.C,225328,78.3,11.5|49,DMK,AIADMK,1091,Devaraji.K.,231496,84.2,0.6|50,DMK,PMK,28240,A. Nallathambi,229174,80.4,15.3|51,AIADMK,INC,28387,T.M.Tamilselvam,227710,82.1,15.2|52,DMK,AIADMK,12614,Mathiazhagan D,238180,82.4,6.4|53,AIADMK,DMK,794,Ashokkumar.K,256172,81.9,0.4|54,AIADMK,DMK,3054,K.P.Munusamy,238757,85.2,1.5|55,DMK,AIADMK,12367,Prakaash Y,327242,75.2,5.0|56,CPI,BJP,56226,Ramachandran.T,242107,79.3,29.3|57,AIADMK,DMK,28100,Anbalagan.K.P.,226980,90.4,13.7|58,PMK,DMK,21186,Mani. G.K,237160,87.9,10.2|59,PMK,DMK,26860,Venkateshwaran.S.P.,256946,83.9,12.5|60,AIADMK,DMK,36943,Govindasamy.A,253899,86.5,16.8|61,AIADMK,CPM,30362,Sampathkumar.V,236142,83.1,15.5|62,DMK,AIADMK,11570,Giri.M.P,263132,84.7,5.2|63,DMK,BJP,94673,E V Velu,274359,75.3,45.8|64,DMK,PMK,26787,K.Pitchandi,244367,83.0,13.2|65,DMK,AIADMK,9222,Saravanan.P.S.T,231257,84.3,4.7|66,AIADMK,DMK,9725,Agri Krishnamurthy. S S,236936,84.8,4.8|67,AIADMK,DMK,3128,S.Ramachandran,264335,83.1,1.4|68,DMK,AIADMK,12271,Jothi. O,249307,85.3,5.8|69,DMK,PMK,35953,Ambethkumar S,230358,80.0,19.5|70,DMK,PMK,35803,Masthan K S,253786,80.6,17.5|71,PMK,DMK,2230,Sivakumar C,214350,82.2,1.3|72,AIADMK,DMK,9753,Arjunan P,221033,81.9,5.4|73,AIADMK,VCK,21727,Chakrapani M,220185,82.1,12.0|74,DMK,AIADMK,14868,Lakshmanan R,249865,81.6,7.3|75,DMK,AIADMK,9573,Pugazhenthi N,223362,86.2,5.0|76,DMK,BJP,59680,K.Ponmudy,246907,78.6,30.7|77,DMK,AIADMK,5256,Manikannan A J,282798,85.8,2.2|78,DMK,AIADMK,41728,Karthikeyan K,254340,83.6,19.6|79,DMK,PMK,45963,Udhayasuriyan T,256349,83.8,21.4|80,AIADMK,INC,25891,Senthilkumar.M,272974,82.3,11.5|81,AIADMK,DMK,7361,Nallathambia.,228181,81.2,4.0|82,AIADMK,DMK,8257,Jayasankaran A.P.,243631,81.2,4.2|83,AIADMK,DMK,25955,G. Chitra,273284,86.7,11.0|84,AIADMK,INC,55294,R.Mani,282810,87.5,22.3|85,PMK,DMK,656,Sadhasivam.S,274547,78.7,0.3|86,AIADMK,DMK,93802,Edappadi Palaniswami. K,274079,89.8,38.1|87,AIADMK,DMK,20045,Sundararajan S.,263382,87.6,8.7|88,PMK,DMK,21499,Arul. R,286676,75.0,10.0|89,DMK,AIADMK,7588,R. Rajendran,266004,75.5,3.8|90,AIADMK,DMK,22609,E.Balasubramanian,253910,78.0,11.4|91,AIADMK,DMK,19895,Rajamuthu M.,248943,89.3,8.9|92,DMK,AIADMK,1952,Mathiventhan M,229784,84.8,1.0|93,DMK,AIADMK,10493,Ponnusamy K,235223,83.8,5.3|94,DMK,AIADMK,27861,Ramalingam P,248958,82.5,13.6|95,AIADMK,DMK,7662,Sekar S,213768,85.5,4.2|96,DMK,AIADMK,2862,Eswaran E R,222373,82.4,1.6|97,AIADMK,DMK,31646,Thangamani.P,243526,82.4,15.8|98,INC,AIADMK,8904,Thirumahan Everaae.,218783,68.8,5.9|99,DMK,AIADMK,22089,Muthusamy S,272477,74.7,10.8|100,BJP,DMK,281,Saraswathi.C,229956,78.1,0.2|101,DMK,BJP,1393,Kayalvizhi N,251040,76.5,0.7|102,DMK,AIADMK,7331,Saminathan.M.P,246360,80.7,3.7|103,AIADMK,DMK,14507,Jayakumar S.,217923,86.6,7.7|104,AIADMK,DMK,22523,Karuppanan.K.C,234551,85.0,11.3|105,DMK,AIADMK,1275,Venkatachalam.A.G,213651,82.1,0.7|106,AIADMK,DMK,28563,Sengottaiyan K.A,247467,86.1,13.4|107,AIADMK,CPI,16008,A.Bannari,248797,79.8,8.1|108,INC,BJP,5348,Ganesh R.,201429,69.4,3.8|109,AIADMK,DMK,1945,Pon.Jayaseelan,182352,75.3,1.4|110,DMK,AIADMK,4105,Ramachandran K.,186493,72.2,3.0|111,AIADMK,DMK,2456,Selvaraj A K,280968,79.1,1.1|112,AIADMK,DMK,50902,Dhanapal P,265952,79.1,24.2|113,AIADMK,CPI,40102,Vijeyakumar.K.N,354414,66.6,17.0|114,DMK,AIADMK,4709,Selvaraj. K.,261872,66.2,2.7|115,AIADMK,DMK,32691,Anandan M S M,362477,71.6,12.6|116,AIADMK,DMK,31932,Kandasamy V.P.,295216,81.0,13.4|117,AIADMK,DMK,9776,G.Arunkumar,429273,71.5,3.2|118,AIADMK,DMK,4001,Amman K.Arjunan,318780,63.1,2.0|119,AIADMK,DMK,41630,S.P. Velumani,308153,74.3,18.2|120,BJP,MNM,1728,Vanathi Srinivasan,244922,62.8,1.1|121,AIADMK,DMK,10854,Jayaram K.R,308023,65.1,5.4|122,AIADMK,DMK,1095,Damodaran.S,300959,76.5,0.5|123,AIADMK,DMK,1725,Pollachi V. Jayaraman,218199,80.6,1.0|124,AIADMK,CPI,12223,Amulkandasami T K,198211,72.5,8.5|125,AIADMK,INC,21895,Radhakrishnank.,257707,74.8,11.4|126,AIADMK,DMK,6438,C Mahendran,237102,76.3,3.6|127,DMK,AIADMK,30056,Senthil Kumar I.P,269523,75.8,14.7|128,DMK,AIADMK,28742,Sakkarapani R,231804,86.4,14.3|129,DMK,PMK,135571,Periyasamy I,279399,81.7,59.4|130,AIADMK,DMK,27618,S.Thenmozhi,229621,79.9,15.0|131,AIADMK,DMK,11932,Natham.R.Viswanathan,269460,83.1,5.3|132,AIADMK,CPM,17747,Sreenivasan.C,261916,73.8,9.2|133,DMK,AIADMK,17553,Gandhirajan S,253655,83.7,8.3|134,DMK,BJP,24816,Elango. R,205295,85.8,14.1|135,DMK,AIADMK,12448,Senthilbalaji V,234703,87.9,6.0|136,DMK,AIADMK,31625,Sivagama Sundari.K,205230,87.6,17.6|137,DMK,AIADMK,23540,R.Manickam,217112,90.4,12.0|138,DMK,AIADMK,12243,Abdul Samad P,274874,80.3,5.5|139,DMK,AIADMK,19915,Palaniyandi.M,296286,80.3,8.4|140,DMK,AIADMK,85109,Nehru K.N.,260130,69.6,47.0|141,DMK,AIADMK,53797,Inigo Irudayarajs.,247148,69.3,31.4|142,DMK,AIADMK,49697,Anbil Mahesh Poyyamozhi,283947,68.9,25.4|143,DMK,AIADMK,16949,A.Soundarapandian,210610,82.4,9.8|144,DMK,AIADMK,59618,S. Kathiravan,231827,84.4,30.5|145,DMK,AIADMK,26836,N. Thiyagarajan,224014,79.7,15.0|146,DMK,AIADMK,22071,S.Stalinkumar,218430,79.8,12.7|147,DMK,AIADMK,31034,Prabhaharan M.,289778,82.2,13.0|148,DMK,AIADMK,6329,Sivasankar S.S.,262924,83.3,2.9|149,DMK,AIADMK,3234,Chinnappa K,254281,88.0,1.4|150,DMK,PMK,5452,Kannan Ka So Ka,257745,83.2,2.5|151,DMK,BJP,21563,Ganesan  C.V.,213980,78.1,12.9|152,INC,PMK,862,Radhakrishnan,242427,80.8,0.4|153,DMK,PMK,977,Saba.Rajendran,210354,77.5,0.6|154,DMK,AIADMK,4697,Velmurugan.T,237508,82.4,2.4|155,DMK,AIADMK,5151,G.Iyappan,227937,79.3,2.8|156,DMK,AIADMK,17527,M.R.K.Panneerselvam,231741,85.3,8.9|157,AIADMK,DMK,8259,Arunmozhithevan. A,244178,80.3,4.2|158,AIADMK,IUML,16937,K.A. Pandian,239757,76.0,9.3|159,VCK,AIADMK,10565,Sinthanai Selvan,221278,79.0,6.0|160,DMK,AIADMK,12148,Panneerselvam,239251,79.6,6.4|161,INC,PMK,2742,Rajakumar.S,235653,73.7,1.6|162,DMK,AIADMK,3299,Nivedha M. Murugan,260928,79.4,1.6|163,VCK,AIADMK,7238,J. Mohamed Shanavas,189926,75.1,5.1|164,CPM,PMK,16985,Nagaimaali V P,170064,83.6,12.0|165,AIADMK,DMK,12329,O.S.Manian,184292,85.4,7.8|166,CPI,AIADMK,30068,Marimuthu K,230016,80.2,16.3|167,DMK,AIADMK,37393,Rajaa T R B,249307,77.1,19.4|168,DMK,AIADMK,51174,Kalaivanan  Poondi  K.,269259,76.7,24.8|169,AIADMK,DMK,4424,Kamaraj R,260052,84.9,2.0|170,DMK,AIADMK,10680,Chezhiaan  Govi.,243754,80.9,5.4|171,DMK,AIADMK,21383,Anbalagan G.,258243,75.9,10.9|172,DMK,AIADMK,16273,Dr.Jawahirullah M.H.,246963,79.3,8.3|173,DMK,BJP,53650,Durai.Chandrasekaran,257341,81.7,25.5|174,DMK,AIADMK,47149,Neelamegam T.K.G.,277373,69.6,24.4|175,AIADMK,DMK,28835,Vaithilingam R.,231555,82.5,15.1|176,DMK,AIADMK,25269,Annadurai K.,233674,75.4,14.3|177,DMK,AIADMK,23503,Ashokkumar N.,211705,80.3,13.8|178,CPM,AIADMK,12721,M.Chinnadurai,191615,81.5,8.1|179,AIADMK,DMK,23598,Vijaya Basker C,213462,90.4,12.2|180,DMK,AIADMK,13001,V . Muthuraja,229689,78.1,7.3|181,DMK,AIADMK,1382,S.Regupathy,215471,80.5,0.8|182,DMK,AIADMK,25847,Siva.V.Meyyanathan,203445,84.1,15.1|183,INC,AIADMK,30893,Ramachandran T,222766,75.2,18.4|184,INC,BJP,21589,S.Mangudi,301096,70.1,10.2|185,DMK,AIADMK,37374,Kr.Periyakaruppan,281221,74.6,17.8|186,AIADMK,CPI,11253,Pr. Senthilnathan,286529,70.1,5.6|187,DMK,AIADMK,14091,Tamilarasi A.,264191,76.4,7.0|188,AIADMK,INC,35162,Periyapullan @ Selvam  P.,239856,75.8,19.3|189,DMK,AIADMK,49604,Moorthy P,307184,76.8,21.0|190,DMK,AIADMK,17045,Venkatesan A,212801,82.0,9.8|191,DMK,BJP,22916,Thalapathi G,236352,65.6,14.8|192,DMK,AIADMK,6515,Boominathan.M,225393,64.9,4.5|193,DMK,AIADMK,34176,Palanivel Thiaga Rajan,236127,62.7,23.1|194,AIADMK,DMK,9121,Raju. K,294018,68.0,4.6|195,AIADMK,CPM,29489,Rajanchellappa V.V.,304719,76.7,12.6|196,AIADMK,DMK,14087,Udhayakumar R B,268427,81.8,6.4|197,AIADMK,DMK,7477,Ayyappan P,274840,76.9,3.5|198,DMK,AIADMK,8538,A.Maharajan,264498,78.7,4.1|199,DMK,AIADMK,21321,K.S.Saravanakumaar,269420,74.0,10.7|200,AIADMK,DMK,11021,O.Panneerselvam,265296,80.4,5.2|201,DMK,AIADMK,42413,N.Ramakrishnan,274002,73.2,21.1|202,DMK,AIADMK,3898,Thangapandian S.,230033,76.9,2.2|203,AIADMK,INC,12738,Manraj E.M.,238501,76.9,6.9|204,DMK,AIADMK,11179,Raghuraman  A.R.R.,237493,80.2,5.9|205,INC,AIADMK,17319,Ashokan.G,246554,74.4,9.4|206,DMK,BJP,21339,Seenivasan A.R.R,212379,75.4,13.3|207,DMK,AIADMK,39034,K.K.S.S.R.Ramachandran,214554,79.2,23.0|208,DMK,AIADMK,60992,Thangam Thenarasu,213068,80.8,35.4|209,DMK,AIADMK,13285,Murugesan S,247151,73.2,7.3|210,INC,AIADMK,13852,Karumanickam,279531,71.9,6.9|211,DMK,BJP,50479,Katharbatcha Muthuramalingam,293684,72.6,23.7|212,DMK,AIADMK,20721,R.S.Rajakannappan,303458,72.7,9.4|213,DMK,AIADMK,38549,Markandayan V,209256,79.4,23.2|214,DMK,AIADMK,50310,P.Geetha Jeevan,279188,66.9,26.9|215,DMK,AIADMK,25263,Anitha R. Radhakrishnan,234874,73.9,14.6|216,INC,AIADMK,17372,Amirtharaj .S,214449,76.3,10.6|217,DMK,AIADMK,8510,Shunmugaiah C,234643,75.1,4.8|218,AIADMK,AMMK,12403,Kadambur Raju,255257,70.4,6.9|219,DMK,AIADMK,5297,Raja E,243171,74.6,2.9|220,DMK,AIADMK,2367,Sadhan Thirumalaikumar Doctor.T,229421,75.7,1.4|221,AIADMK,IUML,24349,C.Krishnamurali,275470,74.2,11.9|222,INC,DMK,370,Palani Nadar.S,275643,77.3,0.2|223,AIADMK,DMK,3539,Paul Manoj Pandian,252558,79.9,1.8|224,BJP,DMK,23107,Nainar Nagenthran,278329,70.2,11.8|225,AIADMK,DMK,16915,E.Subaya,242456,72.6,9.6|226,DMK,AIADMK,52141,Abdul Wahab .M,261331,61.0,32.7|227,INC,AIADMK,16486,Ruby R Manoharan,256674,74.4,8.6|228,DMK,AIADMK,5925,M.Appavu,256384,72.7,3.2|229,AIADMK,DMK,16213,Thalavai Sundaram N.,279721,80.0,7.2|230,BJP,DMK,11669,Gandhi M.R.,254201,72.1,6.4|231,INC,BJP,24832,Prince J.G.,254691,71.5,13.6|232,DMK,AIADMK,26885,Mano Thangaraj T.,227967,74.2,15.9|233,INC,BJP,28669,Vijayadharani S,242916,68.8,17.2|234,INC,AIADMK,55400,Rajesh Kumar  S,241595,70.0,32.7`;

// Parse into P21 indexed by seat number
const P21={};
RAW_2021.split("|").forEach(r=>{
  const[n,wp,rp,m,wn,el,pv,mp]=r.split(",");
  P21[+n]={wp,rp,m:+m,wn,el:+el,pv:+pv,mp:+mp};
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
