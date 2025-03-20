// import React, { useState, useEffect } from 'react';
// import { Search, Globe } from 'lucide-react';

// // Language translations
// const translations = {
//     english: {
//         title: "Tehsil and Mohalla Dashboard",
//         subtitle: "Select a Tehsil/SRO and view related mohallas",
//         selectTehsil: "Select Tehsil/SRO:",
//         mohallasOf: "Mohallas of",
//         searchPlaceholder: "Search mohalla...",
//         code: "Code",
//         noResultsSearch: "No mohallas found for your search.",
//         noResults: "No mohallas found for this tehsil."
//     },
//     hindi: {
//         title: "तहसील और मोहल्ला डैशबोर्ड",
//         subtitle: "तहसील/एसआरओ का चयन करें और संबंधित मोहल्ला देखें",
//         selectTehsil: "तहसील/एसआरओ का चयन करें:",
//         mohallasOf: "के मोहल्ले",
//         searchPlaceholder: "मोहल्ला खोजें...",
//         code: "कोड",
//         noResultsSearch: "खोज के अनुसार कोई मोहल्ला नहीं मिला।",
//         noResults: "इस तहसील के लिए कोई मोहल्ला नहीं मिला।"
//     }
// };

// const TehsilMohallaDashboard = () => {
//     // State for storing tehsils and their villages
//     const [tehsils, setTehsils] = useState([]);
//     const [selectedTehsil, setSelectedTehsil] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredVillages, setFilteredVillages] = useState([]);
//     const [language, setLanguage] = useState('english'); // Default to English

//     // Toggle language function
//     const toggleLanguage = () => {
//         setLanguage(language === 'english' ? 'hindi' : 'english');
//     };

//     // Get current language text
//     const text = translations[language];

//     // Dummy data for demonstration - in actual implementation, this would come from your data files
//     useEffect(() => {
//         // Collecting tehsil information from the files
//         const tehsilData = [
//             { code: "208", name: "सदर प्रथम", nameEn: "Sadar First" },
//             { code: "209", name: "सदर द्वितीय", nameEn: "Sadar Second" },
//             { code: "210", name: "सदर तृतीय", nameEn: "Sadar Third" },
//             { code: "211", name: "सदर चतुर्थ", nameEn: "Sadar Fourth" },
//             { code: "212", name: "बिल्हौर", nameEn: "Bilhaur" },
//             { code: "213", name: "घाटमपुर", nameEn: "Ghatampur" },
//             { code: "370", name: "नरवल", nameEn: "Narwal" },
//         ];

//         // Villages/mohallas would be loaded from the files when a tehsil is selected
//         setTehsils(tehsilData);
//     }, []);

//     // Demo data for villages by tehsil
//     const getVillagesByTehsil = (tehsilCode) => {
//         // This would be replaced with actual data loading logic
//         const villageData = {
//             "208": [
//                 {
//                     "value": "900040",
//                     "name": "अटहा",
//                     "nameEn": "Ataha"
//                 },
//                 {
//                     "value": "900041",
//                     "name": "अल्‍लापुरवा",
//                     "nameEn": "Allapurava"
//                 },
//                 {
//                     "value": "900085",
//                     "name": "अशरफाबाद",
//                     "nameEn": "Asharaphabada"
//                 },
//                 {
//                     "value": "900100",
//                     "name": "आदर्श नगर",
//                     "nameEn": "Aadrsha Nagara"
//                 },
//                 {
//                     "value": "900030",
//                     "name": "आनन्‍द बाग चक सं०-१०६",
//                     "nameEn": "Aannda Baga Chak Sn0-106"
//                 },
//                 {
//                     "value": "900042",
//                     "name": "इकधरा",
//                     "nameEn": "Ikadhara"
//                 },
//                 {
//                     "value": "900034",
//                     "name": "इटावा बाजार चक सं०-२१",
//                     "nameEn": "Itava Bajara Chak Sn0-21"
//                 },
//                 {
//                     "value": "900002",
//                     "name": "ओमपुरवा",
//                     "nameEn": "Omapurava"
//                 },
//                 {
//                     "value": "900113",
//                     "name": "कछियाना मोहाल 66",
//                     "nameEn": "Kachhiyana Mohala 66"
//                 },
//                 {
//                     "value": "900197",
//                     "name": "कटरी किशनपुर",
//                     "nameEn": "Kataree Kishanapura"
//                 },
//                 {
//                     "value": "220312",
//                     "name": "कटरी किशुनपुर नर्वल",
//                     "nameEn": "Kataree Kishunapura Nrvala"
//                 },
//                 {
//                     "value": "220307",
//                     "name": "कटरी जाना",
//                     "nameEn": "Kataree Jana"
//                 },
//                 {
//                     "value": "900200",
//                     "name": "कटरी जाना",
//                     "nameEn": "Kataree Jana"
//                 },
//                 {
//                     "value": "900194",
//                     "name": "कटरी पैबन्‍दी",
//                     "nameEn": "Kataree Paibndee"
//                 },
//                 {
//                     "value": "220308",
//                     "name": "कटरी पैबन्दी",
//                     "nameEn": "Kataree Paibndee"
//                 },
//                 {
//                     "value": "220309",
//                     "name": "कटरी मदारपुर",
//                     "nameEn": "Kataree Madarapura"
//                 },
//                 {
//                     "value": "900195",
//                     "name": "कटरी मदारपुर",
//                     "nameEn": "Kataree Madarapura"
//                 },
//                 {
//                     "value": "900199",
//                     "name": "कटरी वा‍जिदपुर",
//                     "nameEn": "Kataree Vajidapura"
//                 },
//                 {
//                     "value": "220310",
//                     "name": "कटरी वाजिदपुर",
//                     "nameEn": "Kataree Vajidapura"
//                 },
//                 {
//                     "value": "900198",
//                     "name": "कटरी शेखपुर",
//                     "nameEn": "Kataree Shekhapura"
//                 },
//                 {
//                     "value": "220311",
//                     "name": "कटरी शेषपुर",
//                     "nameEn": "Kataree Sheshapura"
//                 },
//                 {
//                     "value": "220315",
//                     "name": "कमालपुर कानपुर",
//                     "nameEn": "Kamalapura Kanapura"
//                 },
//                 {
//                     "value": "900035",
//                     "name": "कराचीखाना चक सं०-२५",
//                     "nameEn": "Karacheekhana Chak Sn0-25"
//                 },
//                 {
//                     "value": "900248",
//                     "name": "कर्वी गॉव (कर्वी गॉव सलेमपुर)",
//                     "nameEn": "Krvee Gaova (krvee Gaova Salemapura)"
//                 },
//                 {
//                     "value": "900007",
//                     "name": "कलक्‍टरगंज चक सं०-७३",
//                     "nameEn": "Kalktaragnja Chak Sn0-73"
//                 },
//                 {
//                     "value": "900043",
//                     "name": "कल्‍यानपुर",
//                     "nameEn": "Klyanapura"
//                 },
//                 {
//                     "value": "220318",
//                     "name": "कल्यानपुर नर्बल",
//                     "nameEn": "Klyanapura Nrbala"
//                 },
//                 {
//                     "value": "900202",
//                     "name": "कल्‍यानपुर नर्वल",
//                     "nameEn": "Klyanapura Nrvala"
//                 },
//                 {
//                     "value": "900183",
//                     "name": "काजीखेडा",
//                     "nameEn": "Kajeekheda"
//                 },
//                 {
//                     "value": "900075",
//                     "name": "काहूकोठी 49",
//                     "nameEn": "Kahookothee 49"
//                 },
//                 {
//                     "value": "900204",
//                     "name": "किशनपुर नर्वल",
//                     "nameEn": "Kishanapura Nrvala"
//                 },
//                 {
//                     "value": "900044",
//                     "name": "किशुनपुर",
//                     "nameEn": "Kishunapura"
//                 },
//                 {
//                     "value": "220380",
//                     "name": "किशुनपुर नर्वल",
//                     "nameEn": "Kishunapura Nrvala"
//                 },
//                 {
//                     "value": "900124",
//                     "name": "कुरसवां 17 18",
//                     "nameEn": "Kurasavan 17 18"
//                 },
//                 {
//                     "value": "220305",
//                     "name": "कुलगाँव",
//                     "nameEn": "KulaGanw"
//                 },
//                 {
//                     "value": "900045",
//                     "name": "कुलगॉंव",
//                     "nameEn": "Kulagaonva"
//                 },
//                 {
//                     "value": "900015",
//                     "name": "कुली बाजार चक सं०-७७",
//                     "nameEn": "Kulee Bajara Chak Sn0-77"
//                 },
//                 {
//                     "value": "900086",
//                     "name": "के0डी0ए0 कालोनी जाजमऊ योजना ३९ ब्लाक a से f",
//                     "nameEn": "Ke0dee0e0 Kalonee Jajamaoo Yojana 39 Blaka A Se F"
//                 },
//                 {
//                     "value": "900161",
//                     "name": "कैनाल पटरी 58 59 चक",
//                     "nameEn": "Kainala Pataree 58 59 Chak"
//                 },
//                 {
//                     "value": "900101",
//                     "name": "कैलाश विहार ग्रेटर कैलाश",
//                     "nameEn": "Kailasha Vihara Gretara Kailasha"
//                 },
//                 {
//                     "value": "900018",
//                     "name": "कोपरगंज चक सं०-८०",
//                     "nameEn": "Koparagnja Chak Sn0-80"
//                 },
//                 {
//                     "value": "900047",
//                     "name": "खजुरिया",
//                     "nameEn": "Khajuriya"
//                 },
//                 {
//                     "value": "900021",
//                     "name": "खपरा मोहाल",
//                     "nameEn": "Khapara Mohala"
//                 },
//                 {
//                     "value": "900046",
//                     "name": "खलार",
//                     "nameEn": "Khalara"
//                 },
//                 {
//                     "value": "900087",
//                     "name": "गज्‍जूपुरवा",
//                     "nameEn": "Gjjoopurava"
//                 },
//                 {
//                     "value": "220324",
//                     "name": "गज्जू पुरवा",
//                     "nameEn": "Gjjoo Purava"
//                 },
//                 {
//                     "value": "900178",
//                     "name": "गडरिया मोहाल 64 चक",
//                     "nameEn": "Gadariya Mohala 64 Chak"
//                 },
//                 {
//                     "value": "900048",
//                     "name": "गदनपुर",
//                     "nameEn": "Gadanapura"
//                 },
//                 {
//                     "value": "900031",
//                     "name": "गॉंधी नगर चक सं०-१०६",
//                     "nameEn": "Gaondhee Nagara Chak Sn0-106"
//                 },
//                 {
//                     "value": "900088",
//                     "name": "गोवर्धनपुरवा",
//                     "nameEn": "Govrdhanapurava"
//                 },
//                 {
//                     "value": "900102",
//                     "name": "गौशाला",
//                     "nameEn": "Gaushala"
//                 },
//                 {
//                     "value": "900171",
//                     "name": "घाऊखेडा",
//                     "nameEn": "Ghaookheda"
//                 },
//                 {
//                     "value": "220328",
//                     "name": "घाघू खेड़ा",
//                     "nameEn": "Ghaghoo Khera"
//                 },
//                 {
//                     "value": "150571",
//                     "name": "चकेरी",
//                     "nameEn": "Chakeree"
//                 },
//                 {
//                     "value": "900049",
//                     "name": "चकेरी",
//                     "nameEn": "Chakeree"
//                 },
//                 {
//                     "value": "901103",
//                     "name": "चटाई मोहाल चक सं०-20",
//                     "nameEn": "Chataee Mohala Chak Sn0-20"
//                 },
//                 {
//                     "value": "900036",
//                     "name": "चटाई मोहाल चक सं०-२१",
//                     "nameEn": "Chataee Mohala Chak Sn0-21"
//                 },
//                 {
//                     "value": "900063",
//                     "name": "चंदारी",
//                     "nameEn": "Chndaree"
//                 },
//                 {
//                     "value": "220332",
//                     "name": "़चन्दारी",
//                     "nameEn": "Chndaree"
//                 },
//                 {
//                     "value": "900003",
//                     "name": "चन्‍द्र नगर",
//                     "nameEn": "Chndra Nagara"
//                 },
//                 {
//                     "value": "900004",
//                     "name": "चरारी",
//                     "nameEn": "Chararee"
//                 },
//                 {
//                     "value": "900064",
//                     "name": "चौक सर्राफा चक सं०- 43",
//                     "nameEn": "Chauka Srrapha Chak Sn0- 43"
//                 },
//                 {
//                     "value": "900076",
//                     "name": "छप्‍पर मोहाल‚मूलगंज चक सं0 45‚ 46",
//                     "nameEn": "Chhppara Mohala‚moolagnja Chak Sn0 45‚ 46"
//                 },
//                 {
//                     "value": "900089",
//                     "name": "छबीलेपुरवा",
//                     "nameEn": "Chhabeelepurava"
//                 },
//                 {
//                     "value": "900022",
//                     "name": "छावनी",
//                     "nameEn": "Chhavanee"
//                 },
//                 {
//                     "value": "900005",
//                     "name": "जगईपुरवा",
//                     "nameEn": "Jagaeepurava"
//                 },
//                 {
//                     "value": "220335",
//                     "name": "जगतापुर",
//                     "nameEn": "Jagatapura"
//                 },
//                 {
//                     "value": "900077",
//                     "name": "जनरलगंज 48 49",
//                     "nameEn": "Janaralagnja 48 49"
//                 },
//                 {
//                     "value": "900090",
//                     "name": "जाजमऊ वाजिदपुर",
//                     "nameEn": "Jajamaoo Vajidapura"
//                 },
//                 {
//                     "value": "220340",
//                     "name": "जाना",
//                     "nameEn": "Jana"
//                 },
//                 {
//                     "value": "900050",
//                     "name": "जाना",
//                     "nameEn": "Jana"
//                 },
//                 {
//                     "value": "900103",
//                     "name": "जे0 के0 कालोनी",
//                     "nameEn": "Je0 Ke0 Kalonee"
//                 },
//                 {
//                     "value": "900104",
//                     "name": "डिफेन्‍स कालोनी जाजमऊ ब्लाक a से f",
//                     "nameEn": "Diphensa Kalonee Jajamaoo Blaka A Se F"
//                 },
//                 {
//                     "value": "900065",
//                     "name": "तलाक महल चक सं०-४४",
//                     "nameEn": "Talaka Mahala Chak Sn0-44"
//                 },
//                 {
//                     "value": "900128",
//                     "name": "तलाक महल चक सं0 95",
//                     "nameEn": "Talaka Mahala Chak Sn0 95"
//                 },
//                 {
//                     "value": "900099",
//                     "name": "तलाक महल चक सं0 95‚ 97",
//                     "nameEn": "Talaka Mahala Chak Sn0 95‚ 97"
//                 },
//                 {
//                     "value": "900261",
//                     "name": "तिलसहरी बुजुर्ग",
//                     "nameEn": "Tilasaharee Bujurga"
//                 },
//                 {
//                     "value": "900105",
//                     "name": "तिवारीपुर जाजमऊ",
//                     "nameEn": "Tivareepura Jajamaoo"
//                 },
//                 {
//                     "value": "900051",
//                     "name": "त्रिलोकपुर",
//                     "nameEn": "Trilokapura"
//                 },
//                 {
//                     "value": "900116",
//                     "name": "दानाखोरी 69",
//                     "nameEn": "Danakhoree 69"
//                 },
//                 {
//                     "value": "900162",
//                     "name": "दाल मण्‍डी 60 चक",
//                     "nameEn": "Dala Mndee 60 Chak"
//                 },
//                 {
//                     "value": "900106",
//                     "name": "दुर्गा विहार",
//                     "nameEn": "Durga Vihara"
//                 },
//                 {
//                     "value": "900173",
//                     "name": "देवीगंज",
//                     "nameEn": "Deveegnja"
//                 },
//                 {
//                     "value": "900115",
//                     "name": "दौलतगंज 67",
//                     "nameEn": "Daulatagnja 67"
//                 },
//                 {
//                     "value": "900009",
//                     "name": "धनकुटटी चक सं०-७४",
//                     "nameEn": "Dhanakutatee Chak Sn0-74"
//                 },
//                 {
//                     "value": "900066",
//                     "name": "धोबी मोहाल चक सं०-४३",
//                     "nameEn": "Dhobee Mohala Chak Sn0-43"
//                 },
//                 {
//                     "value": "900068",
//                     "name": "नई सडक चक सं०-४४",
//                     "nameEn": "Naee Sadaka Chak Sn0-44"
//                 },
//                 {
//                     "value": "900079",
//                     "name": "नयागंज 52 53 54 55",
//                     "nameEn": "Nayagnja 52 53 54 55"
//                 },
//                 {
//                     "value": "900130",
//                     "name": "नया चौक परेड 40 चक",
//                     "nameEn": "Naya Chauka Pareda 40 Chak"
//                 },
//                 {
//                     "value": "900163",
//                     "name": "नयांज 52 53 54 55 चक",
//                     "nameEn": "Nayanja 52 53 54 55 Chak"
//                 },
//                 {
//                     "value": "900067",
//                     "name": "नारियल बाजार",
//                     "nameEn": "Nariyala Bajara"
//                 },
//                 {
//                     "value": "900120",
//                     "name": "नेहरु नगर 109",
//                     "nameEn": "Neharu Nagara 109"
//                 },
//                 {
//                     "value": "900270",
//                     "name": "नौगवां",
//                     "nameEn": "Naugavan"
//                 },
//                 {
//                     "value": "900078",
//                     "name": "नौघडा 50",
//                     "nameEn": "Naughada 50"
//                 },
//                 {
//                     "value": "900125",
//                     "name": "पटकापुर 19",
//                     "nameEn": "Patakapura 19"
//                 },
//                 {
//                     "value": "900037",
//                     "name": "पटकापुर चक सं० 19",
//                     "nameEn": "Patakapura Chak Sn0 19"
//                 },
//                 {
//                     "value": "901104",
//                     "name": "पटकापुर चक सं0 23",
//                     "nameEn": "Patakapura Chak Sn0 23"
//                 },
//                 {
//                     "value": "901105",
//                     "name": "पटकापुर चक सं0 24",
//                     "nameEn": "Patakapura Chak Sn0 24"
//                 },
//                 {
//                     "value": "220354",
//                     "name": "परदेवनपुर गौशाला",
//                     "nameEn": "Paradevanapura Gaushala"
//                 },
//                 {
//                     "value": "900185",
//                     "name": "परदेवनपुरवा",
//                     "nameEn": "Paradevanapurava"
//                 },
//                 {
//                     "value": "900121",
//                     "name": "परमट 13",
//                     "nameEn": "Paramata 13"
//                 },
//                 {
//                     "value": "900135",
//                     "name": "परेड 95चक",
//                     "nameEn": "Pareda 95Chak"
//                 },
//                 {
//                     "value": "900133",
//                     "name": "परेड बूचडखाना 93 चक",
//                     "nameEn": "Pareda Boochadakhana 93 Chak"
//                 },
//                 {
//                     "value": "900155",
//                     "name": "परेड स्थित मालरोड 14 15 चक",
//                     "nameEn": "Pareda Sthita Malaroda 14 15 Chak"
//                 },
//                 {
//                     "value": "900032",
//                     "name": "पी0 रोड चक सं०-१०८",
//                     "nameEn": "Pee0 Roda Chak Sn0-108"
//                 },
//                 {
//                     "value": "900143",
//                     "name": "पुराना हाता सवाई सिंह 34 चक",
//                     "nameEn": "Purana Hata Savaee Sinha 34 Chak"
//                 },
//                 {
//                     "value": "900141",
//                     "name": "पुरानी चावल मण्‍डी",
//                     "nameEn": "Puranee Chavala Mndee"
//                 },
//                 {
//                     "value": "900131",
//                     "name": "पेंचबाग 93 चक",
//                     "nameEn": "Penchabaga 93 Chak"
//                 },
//                 {
//                     "value": "900053",
//                     "name": "पैबन्‍दी",
//                     "nameEn": "Paibndee"
//                 },
//                 {
//                     "value": "220356",
//                     "name": "पैबन्दी",
//                     "nameEn": "Paibndee"
//                 },
//                 {
//                     "value": "900006",
//                     "name": "पोखरपुर",
//                     "nameEn": "Pokharapura"
//                 },
//                 {
//                     "value": "220357",
//                     "name": "पोहकरपुर",
//                     "nameEn": "Pohakarapura"
//                 },
//                 {
//                     "value": "900136",
//                     "name": "फर्राशखाना चक सं0 94",
//                     "nameEn": "Phrrashakhana Chak Sn0 94"
//                 },
//                 {
//                     "value": "901107",
//                     "name": "फर्राशखाना चक सं0 94",
//                     "nameEn": "Phrrashakhana Chak Sn0 94"
//                 },
//                 {
//                     "value": "900069",
//                     "name": "फर्राशखाना‚ चौबेगोला चक सं०-41",
//                     "nameEn": "Phrrashakhana‚ Chaubegola Chak Sn0-41"
//                 },
//                 {
//                     "value": "901115",
//                     "name": "फीलखाना चक 22",
//                     "nameEn": "Pheelakhana Chak 22"
//                 },
//                 {
//                     "value": "901111",
//                     "name": "फीलखाना चक सं०-22",
//                     "nameEn": "Pheelakhana Chak Sn0-22"
//                 },
//                 {
//                     "value": "901106",
//                     "name": "फीलखाना चक सं०-26",
//                     "nameEn": "Pheelakhana Chak Sn0-26"
//                 },
//                 {
//                     "value": "901112",
//                     "name": "फीलखाना चक सं०-26",
//                     "nameEn": "Pheelakhana Chak Sn0-26"
//                 },
//                 {
//                     "value": "900144",
//                     "name": "फीलखाना सिरकी माेहाल चक सं० 28",
//                     "nameEn": "Pheelakhana Sirakee Maehala Chak Sn0 28"
//                 },
//                 {
//                     "value": "900038",
//                     "name": "फीलखाना",
//                     "nameEn": "Pheelakhana"
//                 },
//                 {
//                     "value": "900023",
//                     "name": "फेथफुलगंज",
//                     "nameEn": "Phethaphulagnja"
//                 },
//                 {
//                     "value": "900147",
//                     "name": "बंगाली मोहाल राम मोहन हाता 34 35 36 चक",
//                     "nameEn": "Bngalee Mohala Rama Mohana Hata 34 35 36 Chak"
//                 },
//                 {
//                     "value": "900080",
//                     "name": "बान बाजार चक सं0 46‚75",
//                     "nameEn": "Bana Bajara Chak Sn0 46‚75"
//                 },
//                 {
//                     "value": "900010",
//                     "name": "बान बाजार व चक सं०-४६",
//                     "nameEn": "Bana Bajara Va Chak Sn0-46"
//                 },
//                 {
//                     "value": "900165",
//                     "name": "बिरहाना रोड",
//                     "nameEn": "Birahana Roda"
//                 },
//                 {
//                     "value": "900070",
//                     "name": "बिसाती बाजार चक सं०-४२",
//                     "nameEn": "Bisatee Bajara Chak Sn0-42"
//                 },
//                 {
//                     "value": "220367",
//                     "name": "बीबीपुर",
//                     "nameEn": "Beebeepura"
//                 },
//                 {
//                     "value": "900174",
//                     "name": "बीबीपुर",
//                     "nameEn": "Beebeepura"
//                 },
//                 {
//                     "value": "900091",
//                     "name": "बुढिया घाट",
//                     "nameEn": "Budhiya Ghata"
//                 },
//                 {
//                     "value": "900019",
//                     "name": "बूचडखाना चक सं०-८०",
//                     "nameEn": "Boochadakhana Chak Sn0-80"
//                 },
//                 {
//                     "value": "900146",
//                     "name": "बेलदारी मोहाल 29 चक",
//                     "nameEn": "Beladaree Mohala 29 Chak"
//                 },
//                 {
//                     "value": "900093",
//                     "name": "मकदूम नगर",
//                     "nameEn": "Makadooma Nagara"
//                 },
//                 {
//                     "value": "900092",
//                     "name": "मक्‍कू शहीद का भटठा",
//                     "nameEn": "Mkkoo Shaheeda Ka Bhatatha"
//                 },
//                 {
//                     "value": "900117",
//                     "name": "मथुरी मोहाल 70",
//                     "nameEn": "Mathuree Mohala 70"
//                 },
//                 {
//                     "value": "220368",
//                     "name": "मदारपुर",
//                     "nameEn": "Madarapura"
//                 },
//                 {
//                     "value": "900054",
//                     "name": "मदारपुर",
//                     "nameEn": "Madarapura"
//                 },
//                 {
//                     "value": "900081",
//                     "name": "मनीराम बगिया 47",
//                     "nameEn": "Maneerama Bagiya 47"
//                 },
//                 {
//                     "value": "901108",
//                     "name": "मनीराम बगिया चक सं० 47",
//                     "nameEn": "Maneerama Bagiya Chak Sn0 47"
//                 },
//                 {
//                     "value": "900072",
//                     "name": "मनीराम बगिया",
//                     "nameEn": "Maneerama Bagiya"
//                 },
//                 {
//                     "value": "220369",
//                     "name": "मवइया",
//                     "nameEn": "Mavaiya"
//                 },
//                 {
//                     "value": "900056",
//                     "name": "मवइया",
//                     "nameEn": "Mavaiya"
//                 },
//                 {
//                     "value": "900149",
//                     "name": "महेश्‍वरी मोहाल 30 चक",
//                     "nameEn": "Maheshvaree Mohala 30 Chak"
//                 },
//                 {
//                     "value": "900107",
//                     "name": "मानस विहार",
//                     "nameEn": "Manasa Vihara"
//                 },
//                 {
//                     "value": "900152",
//                     "name": "माल गोदाम 82 चक",
//                     "nameEn": "Mala Godama 82 Chak"
//                 },
//                 {
//                     "value": "900179",
//                     "name": "माल रोड कैण्‍ट 62 63 चक",
//                     "nameEn": "Mala Roda Kainta 62 63 Chak"
//                 },
//                 {
//                     "value": "900025",
//                     "name": "मालरोड कैण्‍ट चक सं०-६२",
//                     "nameEn": "Malaroda Kainta Chak Sn0-62"
//                 },
//                 {
//                     "value": "900109",
//                     "name": "मालरोड चक सं0 16‚ 17‚ 18",
//                     "nameEn": "Malaroda Chak Sn0 16‚ 17‚ 18"
//                 },
//                 {
//                     "value": "901109",
//                     "name": "माल रोड चक सं0 37",
//                     "nameEn": "Mala Roda Chak Sn0 37"
//                 },
//                 {
//                     "value": "901110",
//                     "name": "मालरोड (तारघर रोड) चक सं० 37",
//                     "nameEn": "Malaroda (taraghara Roda) Chak Sn0 37"
//                 },
//                 {
//                     "value": "900158",
//                     "name": "माल रोड",
//                     "nameEn": "Mala Roda"
//                 },
//                 {
//                     "value": "900074",
//                     "name": "मिश्री बाजार 44",
//                     "nameEn": "Mishree Bajara 44"
//                 },
//                 {
//                     "value": "900024",
//                     "name": "मीरपुर",
//                     "nameEn": "Meerapura"
//                 },
//                 {
//                     "value": "220370",
//                     "name": "मुजफ्फरपुर",
//                     "nameEn": "Mujphpharapura"
//                 },
//                 {
//                     "value": "900073",
//                     "name": "मूलगंज 44 45",
//                     "nameEn": "Moolagnja 44 45"
//                 },
//                 {
//                     "value": "900071",
//                     "name": "मैदा बाजार",
//                     "nameEn": "Maida Bajara"
//                 },
//                 {
//                     "value": "900094",
//                     "name": "मोती नगर जाजमऊ",
//                     "nameEn": "Motee Nagara Jajamaoo"
//                 },
//                 {
//                     "value": "900055",
//                     "name": "मोतीपुर",
//                     "nameEn": "Moteepura"
//                 },
//                 {
//                     "value": "900180",
//                     "name": "मोती मोहाल 65 चक",
//                     "nameEn": "Motee Mohala 65 Chak"
//                 },
//                 {
//                     "value": "900011",
//                     "name": "रंजीतपुरवा चक सं०-७५",
//                     "nameEn": "Rnjeetapurava Chak Sn0-75"
//                 },
//                 {
//                     "value": "900082",
//                     "name": "रामगंज 51",
//                     "nameEn": "Ramagnja 51"
//                 },
//                 {
//                     "value": "900127",
//                     "name": "राम नारायण बाजार 17",
//                     "nameEn": "Rama Narayana Bajara 17"
//                 },
//                 {
//                     "value": "900095",
//                     "name": "रामराय सराय",
//                     "nameEn": "Ramaraya Saraya"
//                 },
//                 {
//                     "value": "900057",
//                     "name": "रुमा",
//                     "nameEn": "Ruma"
//                 },
//                 {
//                     "value": "220373",
//                     "name": "रूमा",
//                     "nameEn": "Rooma"
//                 },
//                 {
//                     "value": "900026",
//                     "name": "रेल बाजार",
//                     "nameEn": "Rela Bajara"
//                 },
//                 {
//                     "value": "900012",
//                     "name": "रेलवे कालोनी चक सं०-७२",
//                     "nameEn": "Relave Kalonee Chak Sn0-72"
//                 },
//                 {
//                     "value": "900039",
//                     "name": "रोटी गोदाम चक– 26 27",
//                     "nameEn": "Rotee Godama Chak– 26 27"
//                 },
//                 {
//                     "value": "900154",
//                     "name": "लक्ष्‍मीपुरवा 85 चक",
//                     "nameEn": "Laksh्meepurava 85 Chak"
//                 },
//                 {
//                     "value": "900097",
//                     "name": "ललतूपुरवा",
//                     "nameEn": "Lalatoopurava"
//                 },
//                 {
//                     "value": "900016",
//                     "name": "लाटूश रोड चक सं०-७६",
//                     "nameEn": "Latoosha Roda Chak Sn0-76"
//                 },
//                 {
//                     "value": "900020",
//                     "name": "लाटूश रोड चक सं०-८०",
//                     "nameEn": "Latoosha Roda Chak Sn0-80"
//                 },
//                 {
//                     "value": "900151",
//                     "name": "लाठी मोहाल",
//                     "nameEn": "Lathee Mohala"
//                 },
//                 {
//                     "value": "900096",
//                     "name": "लारी मार्केट",
//                     "nameEn": "Laree Marketa"
//                 },
//                 {
//                     "value": "900027",
//                     "name": "लाल कुर्ती",
//                     "nameEn": "Lala Kurtee"
//                 },
//                 {
//                     "value": "900118",
//                     "name": "लोकमन मोहाल 68",
//                     "nameEn": "Lokamana Mohala 68"
//                 },
//                 {
//                     "value": "900058",
//                     "name": "लोधीपुर",
//                     "nameEn": "Lodheepura"
//                 },
//                 {
//                     "value": "220375",
//                     "name": "वाजिदपुर उर्फ जाजमऊ",
//                     "nameEn": "Vajidapura Urpha Jajamaoo"
//                 },
//                 {
//                     "value": "900028",
//                     "name": "शान्‍ती नगर",
//                     "nameEn": "Shantee Nagara"
//                 },
//                 {
//                     "value": "900098",
//                     "name": "शीतला बाजार",
//                     "nameEn": "Sheetala Bajara"
//                 },
//                 {
//                     "value": "220379",
//                     "name": "शीशामऊ",
//                     "nameEn": "Sheeshamaoo"
//                 },
//                 {
//                     "value": "900059",
//                     "name": "शेखपुर उर्फ शेषपुर",
//                     "nameEn": "Shekhapura Urpha Sheshapura"
//                 },
//                 {
//                     "value": "220377",
//                     "name": "शेषपुर",
//                     "nameEn": "Sheshapura"
//                 },
//                 {
//                     "value": "900167",
//                     "name": "सतरंजी मोहाल 56 57 चक",
//                     "nameEn": "Satarnjee Mohala 56 57 Chak"
//                 },
//                 {
//                     "value": "900061",
//                     "name": "सन्‍तनपुरवा",
//                     "nameEn": "Sntanapurava"
//                 },
//                 {
//                     "value": "900875",
//                     "name": "सफीपुर",
//                     "nameEn": "Sapheepura"
//                 },
//                 {
//                     "value": "220400",
//                     "name": "सफीपुर कानपुर",
//                     "nameEn": "Sapheepura Kanapura"
//                 },
//                 {
//                     "value": "900176",
//                     "name": "सफीपुर प्रथम",
//                     "nameEn": "Sapheepura Prathama"
//                 },
//                 {
//                     "value": "900177",
//                     "name": "सफीपुर सेकेण्‍ड",
//                     "nameEn": "Sapheepura Sekenda"
//                 },
//                 {
//                     "value": "900017",
//                     "name": "सब्‍जी मण्‍डी चक सं०-७७",
//                     "nameEn": "Sbjee Mndee Chak Sn0-77"
//                 },
//                 {
//                     "value": "220403",
//                     "name": "सराय राम राम",
//                     "nameEn": "Saraya Rama Rama"
//                 },
//                 {
//                     "value": "900108",
//                     "name": "सिद्धनाथ घाट",
//                     "nameEn": "Siddhanatha Ghata"
//                 },
//                 {
//                     "value": "900168",
//                     "name": "सिरकी मोहाल 57 चक",
//                     "nameEn": "Sirakee Mohala 57 Chak"
//                 },
//                 {
//                     "value": "900160",
//                     "name": "सिविल लाईन्‍स 14 15 चक",
//                     "nameEn": "Sivila Laeensa 14 15 Chak"
//                 },
//                 {
//                     "value": "900112",
//                     "name": "सि‍‍विल लाईन्‍स 16",
//                     "nameEn": "Sivila Laeensa 16"
//                 },
//                 {
//                     "value": "900122",
//                     "name": "सिविल लार्इन्‍स 13",
//                     "nameEn": "Sivila Larinsa 13"
//                 },
//                 {
//                     "value": "900169",
//                     "name": "सीताराम मोहाल 61 चक",
//                     "nameEn": "Seetarama Mohala 61 Chak"
//                 },
//                 {
//                     "value": "900033",
//                     "name": "सीसामऊ चक सं०-१०४",
//                     "nameEn": "Seesamaoo Chak Sn0-104"
//                 },
//                 {
//                     "value": "900060",
//                     "name": "सुखनीपुर",
//                     "nameEn": "Sukhaneepura"
//                 },
//                 {
//                     "value": "900013",
//                     "name": "सुतरखाना चक सं०-७१",
//                     "nameEn": "Sutarakhana Chak Sn0-71"
//                 },
//                 {
//                     "value": "900084",
//                     "name": "हटिया 47",
//                     "nameEn": "Hatiya 47"
//                 },
//                 {
//                     "value": "900186",
//                     "name": "हरजेन्‍दर नगर",
//                     "nameEn": "Harajendara Nagara"
//                 },
//                 {
//                     "value": "900181",
//                     "name": "हरबंश मोहाल 62 63 चक",
//                     "nameEn": "Harabnsha Mohala 62 63 Chak"
//                 },
//                 {
//                     "value": "900062",
//                     "name": "ह‍र्रिया",
//                     "nameEn": "Hrriya"
//                 },
//                 {
//                     "value": "900083",
//                     "name": "हालसी रोड 46",
//                     "nameEn": "Halasee Roda 46"
//                 },
//                 {
//                     "value": "900014",
//                     "name": "हालसी रोड चक सं०-46 75",
//                     "nameEn": "Halasee Roda Chak Sn0-46 75"
//                 },
//                 {
//                     "value": "900029",
//                     "name": "हैरिसगंज",
//                     "nameEn": "Hairisagnja"
//                 }
//             ],
//             "209": [
//                 {
//                     "value": "900934",
//                     "name": "अचाक पुरवा",
//                     "nameEn": "AChak Purava"
//                 },
//                 {
//                     "value": "900959",
//                     "name": "अजीमुल्ला नगर बिठूर कला",
//                     "nameEn": "Ajeemulla Nagara Bithoora Kala"
//                 },
//                 {
//                     "value": "901043",
//                     "name": "अवधपुरी",
//                     "nameEn": "Avadhapuree"
//                 },
//                 {
//                     "value": "900936",
//                     "name": "अशोक नगर चक–111 व 111ए",
//                     "nameEn": "Ashoka Nagara Chak–111 Va 111e"
//                 },
//                 {
//                     "value": "900935",
//                     "name": "आजाद नगर चक–2ए",
//                     "nameEn": "Azad Nagara Chak–2e"
//                 },
//                 {
//                     "value": "901094",
//                     "name": "आजाद नगर⁄ न्यू आजाद नगर (जी0टी0 राेड)",
//                     "nameEn": "Azad Nagara⁄ Nyoo Azad Nagara (jee0tee0 Raeda)"
//                 },
//                 {
//                     "value": "220301",
//                     "name": "आराजी लश्कर",
//                     "nameEn": "Aarajee Lshkara"
//                 },
//                 {
//                     "value": "900960",
//                     "name": "आराजी लश्कर",
//                     "nameEn": "Aarajee Lshkara"
//                 },
//                 {
//                     "value": "900941",
//                     "name": "आर्य नगर चक–08 व 112",
//                     "nameEn": "Aarya Nagara Chak–08 Va 112"
//                 },
//                 {
//                     "value": "901099",
//                     "name": "इन्द्रानगर",
//                     "nameEn": "Indranagara"
//                 },
//                 {
//                     "value": "901054",
//                     "name": "ईदगाह कालोनी चक–09",
//                     "nameEn": "Eedagaha Kalonee Chak–09"
//                 },
//                 {
//                     "value": "150307",
//                     "name": "ईश्वरीगंज",
//                     "nameEn": "Eeshvareegnja"
//                 },
//                 {
//                     "value": "900946",
//                     "name": "उजियारिन पुरवा ख्योरा कंछार",
//                     "nameEn": "Ujiyarina Purava Khyora Knchhara"
//                 },
//                 {
//                     "value": "900962",
//                     "name": "एन0आर0आई0 सिटी कटरी ख्यौरा",
//                     "nameEn": "Ena0aara0aaee0 Sitee Kataree Khyaura"
//                 },
//                 {
//                     "value": "901056",
//                     "name": "एलनगंज चक–10",
//                     "nameEn": "Elanagnja Chak–10"
//                 },
//                 {
//                     "value": "900944",
//                     "name": "कंघी मोहाल चक–99",
//                     "nameEn": "Knghee Mohala Chak–99"
//                 },
//                 {
//                     "value": "150365",
//                     "name": "कटरा घनश्याम",
//                     "nameEn": "Katara Ghanshyama"
//                 },
//                 {
//                     "value": "150320",
//                     "name": "कटरी कानपुर कोहना",
//                     "nameEn": "Kataree Kanapura Kohana"
//                 },
//                 {
//                     "value": "220306",
//                     "name": "कटरी ख्यौरा",
//                     "nameEn": "Kataree Khyaura"
//                 },
//                 {
//                     "value": "150318",
//                     "name": "कटरी ज्योरा नवाबगंज",
//                     "nameEn": "Kataree Jyora Navabagnja"
//                 },
//                 {
//                     "value": "150292",
//                     "name": "कटरी बिठूर कँला",
//                     "nameEn": "Kataree Bithoora Knla"
//                 },
//                 {
//                     "value": "150293",
//                     "name": "कटरी बिठूर खुर्द",
//                     "nameEn": "Kataree Bithoora Khurd"
//                 },
//                 {
//                     "value": "150322",
//                     "name": "कटरी लक्ष्मी खेड़ा",
//                     "nameEn": "Kataree Laksh्mee Khera"
//                 },
//                 {
//                     "value": "150321",
//                     "name": "कटरी लोधवा खेड़ा",
//                     "nameEn": "Kataree Lodhava Khera"
//                 },
//                 {
//                     "value": "150319",
//                     "name": "कटरी शंकरपुर सराय",
//                     "nameEn": "Kataree Shnkarapura Saraya"
//                 },
//                 {
//                     "value": "901060",
//                     "name": "कर्नेलगंज-101",
//                     "nameEn": "Krnelagnja-101"
//                 },
//                 {
//                     "value": "900943",
//                     "name": "कर्नेलगंज चक–96 व 100‚101‚102‚103",
//                     "nameEn": "Krnelagnja Chak–96 Va 100‚101‚102‚103"
//                 },
//                 {
//                     "value": "901058",
//                     "name": "कासिमगंज चक–89",
//                     "nameEn": "Kasimagnja Chak–89"
//                 },
//                 {
//                     "value": "150333",
//                     "name": "कुरसौली",
//                     "nameEn": "Kurasaulee"
//                 },
//                 {
//                     "value": "901044",
//                     "name": "केसा कालोनी",
//                     "nameEn": "Kesa Kalonee"
//                 },
//                 {
//                     "value": "901057",
//                     "name": "खलासी लाईन चक–10",
//                     "nameEn": "Khalasee Laeena Chak–10"
//                 },
//                 {
//                     "value": "150305",
//                     "name": "खुशहाल गंज",
//                     "nameEn": "Khushahala Ganj"
//                 },
//                 {
//                     "value": "220320",
//                     "name": "ख्योरा कछार",
//                     "nameEn": "Khyora Kachhara"
//                 },
//                 {
//                     "value": "900956",
//                     "name": "ख्योरा कंछार",
//                     "nameEn": "Khyora Knchhara"
//                 },
//                 {
//                     "value": "900947",
//                     "name": "ख्योरा बांगर",
//                     "nameEn": "Khyora Bangara"
//                 },
//                 {
//                     "value": "220321",
//                     "name": "ख्योरा बांगर",
//                     "nameEn": "Khyora Bangara"
//                 },
//                 {
//                     "value": "150327",
//                     "name": "गंगपुर कछार",
//                     "nameEn": "Gngapura Kachhara"
//                 },
//                 {
//                     "value": "150315",
//                     "name": "गंगपुर चकबदा",
//                     "nameEn": "Gngapura Chakbada"
//                 },
//                 {
//                     "value": "220326",
//                     "name": "गंगापुर",
//                     "nameEn": "Gngapura"
//                 },
//                 {
//                     "value": "901045",
//                     "name": "गडरियनपुरवा चक–02",
//                     "nameEn": "Gadariyanapurava Chak–02"
//                 },
//                 {
//                     "value": "150354",
//                     "name": "गढ़ी कानपुर",
//                     "nameEn": "Garhee Kanapura"
//                 },
//                 {
//                     "value": "150369",
//                     "name": "गदन खेड़ा",
//                     "nameEn": "Gadana Khera"
//                 },
//                 {
//                     "value": "150309",
//                     "name": "गम्भीरपुर कछार",
//                     "nameEn": "Gmbheerapura Kachhara"
//                 },
//                 {
//                     "value": "900931",
//                     "name": "गांधी नगर चक–105",
//                     "nameEn": "Gandhee Nagara Chak–105"
//                 },
//                 {
//                     "value": "900945",
//                     "name": "गुटैया चक–07",
//                     "nameEn": "Gutaiya Chak–07"
//                 },
//                 {
//                     "value": "901062",
//                     "name": "ग्वालटोली चक–12 व 12ए",
//                     "nameEn": "Gvalatolee Chak–12 Va 12e"
//                 },
//                 {
//                     "value": "900938",
//                     "name": "घुसरामऊ चक–111ए",
//                     "nameEn": "Ghusaramaoo Chak–111e"
//                 },
//                 {
//                     "value": "150329",
//                     "name": "चकरतनपुर",
//                     "nameEn": "Chakratanapura"
//                 },
//                 {
//                     "value": "220330",
//                     "name": "चचेण्डी - सचेण्डी-I",
//                     "nameEn": "Chachendee - Sachendee-I"
//                 },
//                 {
//                     "value": "220331",
//                     "name": "चचेण्डी - सचेण्डी-II",
//                     "nameEn": "Chachendee - Sachendee-II"
//                 },
//                 {
//                     "value": "901046",
//                     "name": "चन्द नगर ⁄ चन्द्र बिहार",
//                     "nameEn": "Chnda Nagara ⁄ Chndra Bihara"
//                 },
//                 {
//                     "value": "900930",
//                     "name": "चमनगंज चक–88 व 105",
//                     "nameEn": "Chamanagnja Chak–88 Va 105"
//                 },
//                 {
//                     "value": "901047",
//                     "name": "चमारनपुरवा",
//                     "nameEn": "Chamaranapurava"
//                 },
//                 {
//                     "value": "150310",
//                     "name": "चिरान",
//                     "nameEn": "Chirana"
//                 },
//                 {
//                     "value": "901061",
//                     "name": "चुन्नीगंज चक–96 व 100 101‚102‚103‚105‚",
//                     "nameEn": "Chunneegnja Chak–96 Va 100 101‚102‚103‚105‚"
//                 },
//                 {
//                     "value": "150351",
//                     "name": "छीतेपुर",
//                     "nameEn": "Chheetepura"
//                 },
//                 {
//                     "value": "901065",
//                     "name": "जवाहर नगर चक–107",
//                     "nameEn": "Javahara Nagara Chak–107"
//                 },
//                 {
//                     "value": "901079",
//                     "name": "ज्योरा",
//                     "nameEn": "Jyora"
//                 },
//                 {
//                     "value": "220334",
//                     "name": "ज्योरा नवाबगंज",
//                     "nameEn": "Jyora Navabagnja"
//                 },
//                 {
//                     "value": "901080",
//                     "name": "ज्योरा नवाबगंज",
//                     "nameEn": "Jyora Navabagnja"
//                 },
//                 {
//                     "value": "150342",
//                     "name": "झखरा",
//                     "nameEn": "Jhakhara"
//                 },
//                 {
//                     "value": "150336",
//                     "name": "टिकरा कानपुर",
//                     "nameEn": "Tikara Kanapura"
//                 },
//                 {
//                     "value": "150337",
//                     "name": "टिकरी",
//                     "nameEn": "Tikaree"
//                 },
//                 {
//                     "value": "901089",
//                     "name": "टुकनियापुरवा चक–105",
//                     "nameEn": "Tukaniyapurava Chak–105"
//                 },
//                 {
//                     "value": "901075",
//                     "name": "डिप्टी का पडाव 89",
//                     "nameEn": "Diptee Ka Padava 89"
//                 },
//                 {
//                     "value": "900985",
//                     "name": "तात्या टोपे नगर आराजी लश्कर",
//                     "nameEn": "Tatya Tope Nagara Aarajee Lshkara"
//                 },
//                 {
//                     "value": "901067",
//                     "name": "तिलक नगर चक–07",
//                     "nameEn": "Tilaka Nagara Chak–07"
//                 },
//                 {
//                     "value": "901048",
//                     "name": "दयानन्द बिहार",
//                     "nameEn": "Dayannda Bihara"
//                 },
//                 {
//                     "value": "901076",
//                     "name": "दलेलपुरवा चक–89 व 91",
//                     "nameEn": "Dalelapurava Chak–89 Va 91"
//                 },
//                 {
//                     "value": "901081",
//                     "name": "दीन दयाल नगर",
//                     "nameEn": "Deena Dayala Nagara"
//                 },
//                 {
//                     "value": "150344",
//                     "name": "दूल",
//                     "nameEn": "Doola"
//                 },
//                 {
//                     "value": "220348",
//                     "name": "धरमंगदपुर",
//                     "nameEn": "Dharamngadapura"
//                 },
//                 {
//                     "value": "150313",
//                     "name": "धरमपुर",
//                     "nameEn": "Dharamapura"
//                 },
//                 {
//                     "value": "900988",
//                     "name": "धुव नगर बिठूर कला",
//                     "nameEn": "Dhuva Nagara Bithoora Kala"
//                 },
//                 {
//                     "value": "150346",
//                     "name": "नकटू",
//                     "nameEn": "Nakatoo"
//                 },
//                 {
//                     "value": "901082",
//                     "name": "नवाबगंज चक–1 व 2 व 2ए व 3",
//                     "nameEn": "Navabagnja Chak–1 Va 2 Va 2e Va 3"
//                 },
//                 {
//                     "value": "901083",
//                     "name": "नवाबगंज चक–3ए",
//                     "nameEn": "Navabagnja Chak–3e"
//                 },
//                 {
//                     "value": "901095",
//                     "name": "नाजिरबाग चक–98",
//                     "nameEn": "Najirabaga Chak–98"
//                 },
//                 {
//                     "value": "150328",
//                     "name": "नारामऊ कछार",
//                     "nameEn": "Naramaoo Kachhara"
//                 },
//                 {
//                     "value": "901069",
//                     "name": "नारामऊ कछार",
//                     "nameEn": "Naramaoo Kachhara"
//                 },
//                 {
//                     "value": "220349",
//                     "name": "नारामऊ बांगर",
//                     "nameEn": "Naramaoo Bangara"
//                 },
//                 {
//                     "value": "901070",
//                     "name": "नारामऊ बांगार",
//                     "nameEn": "Naramaoo Bangara"
//                 },
//                 {
//                     "value": "901066",
//                     "name": "नेहरू नगर चक–107",
//                     "nameEn": "Neharoo Nagara Chak–107"
//                 },
//                 {
//                     "value": "150335",
//                     "name": "नौरंगाबाद",
//                     "nameEn": "Naurngabada"
//                 },
//                 {
//                     "value": "150368",
//                     "name": "पकरी",
//                     "nameEn": "Pakaree"
//                 },
//                 {
//                     "value": "901049",
//                     "name": "पत्रकारपुरम स्‍कीम;38 ⁄पाषर्द नगर",
//                     "nameEn": "Patrkarapurama Skeema;38 ⁄pashrda Nagara"
//                 },
//                 {
//                     "value": "150350",
//                     "name": "पनका बहादुर नगर",
//                     "nameEn": "Panaka Bahadura Nagara"
//                 },
//                 {
//                     "value": "150325",
//                     "name": "परगही बांगर",
//                     "nameEn": "Paragahee Bangara"
//                 },
//                 {
//                     "value": "900948",
//                     "name": "परमियांपुरवा",
//                     "nameEn": "Paramiyanpurava"
//                 },
//                 {
//                     "value": "901084",
//                     "name": "पहलवान का पुरवा",
//                     "nameEn": "Pahalavana Ka Purava"
//                 },
//                 {
//                     "value": "901086",
//                     "name": "पुराना कानपुर चक–2ए",
//                     "nameEn": "Purana Kanapura Chak–2e"
//                 },
//                 {
//                     "value": "901087",
//                     "name": "पुराना कानपुर चक–3ए व 4 व 5 व 6",
//                     "nameEn": "Purana Kanapura Chak–3e Va 4 Va 5 Va 6"
//                 },
//                 {
//                     "value": "150306",
//                     "name": "पृथ्वीगंज",
//                     "nameEn": "Prithveegnja"
//                 },
//                 {
//                     "value": "900997",
//                     "name": "पेशवा नगर बिठूर खुर्द",
//                     "nameEn": "Peshava Nagara Bithoora Khurd"
//                 },
//                 {
//                     "value": "150302",
//                     "name": "पैगूपुर कछार",
//                     "nameEn": "Paigoopura Kachhara"
//                 },
//                 {
//                     "value": "150299",
//                     "name": "पैगूपुर बांगर",
//                     "nameEn": "Paigoopura Bangara"
//                 },
//                 {
//                     "value": "150356",
//                     "name": "प्रतापपुर सरसई",
//                     "nameEn": "Pratapapura Sarasaee"
//                 },
//                 {
//                     "value": "150311",
//                     "name": "प्रतापपुर हरी",
//                     "nameEn": "Pratapapura Haree"
//                 },
//                 {
//                     "value": "901050",
//                     "name": "प्रहलाद का पुरवा",
//                     "nameEn": "Prahalada Ka Purava"
//                 },
//                 {
//                     "value": "900932",
//                     "name": "प्रेम नगर चक–105",
//                     "nameEn": "Prema Nagara Chak–105"
//                 },
//                 {
//                     "value": "900933",
//                     "name": "प्रेम नगर चक–88",
//                     "nameEn": "Prema Nagara Chak–88"
//                 },
//                 {
//                     "value": "220358",
//                     "name": "फत्तेपुर उत्तर",
//                     "nameEn": "Phttepura Uttara"
//                 },
//                 {
//                     "value": "150324",
//                     "name": "बगदौधीकछार परगहीकछार",
//                     "nameEn": "Bagadaudheekachhara Paragaheekachhara"
//                 },
//                 {
//                     "value": "150323",
//                     "name": "बगदौधी बांगर",
//                     "nameEn": "Bagadaudhee Bangara"
//                 },
//                 {
//                     "value": "900949",
//                     "name": "बरसाईतपुर",
//                     "nameEn": "Barasaeetapura"
//                 },
//                 {
//                     "value": "150300",
//                     "name": "बरहट कछार",
//                     "nameEn": "Barahata Kachhara"
//                 },
//                 {
//                     "value": "150298",
//                     "name": "बरहट बाँगर",
//                     "nameEn": "Barahata Bangara"
//                 },
//                 {
//                     "value": "150340",
//                     "name": "बहेड़ा",
//                     "nameEn": "Bahera"
//                 },
//                 {
//                     "value": "220384",
//                     "name": "बिठूर कलां",
//                     "nameEn": "Bithoora Kalan"
//                 },
//                 {
//                     "value": "220385",
//                     "name": "बिठूर खुर्द",
//                     "nameEn": "Bithoora Khurd"
//                 },
//                 {
//                     "value": "900950",
//                     "name": "बिनुवापुर नौबस्ता",
//                     "nameEn": "Binuvapura Naubsta"
//                 },
//                 {
//                     "value": "900957",
//                     "name": "बेकनगंज चक–98 व 99",
//                     "nameEn": "Bekanagnja Chak–98 Va 99"
//                 },
//                 {
//                     "value": "900958",
//                     "name": "बेनाझाबर चक–112",
//                     "nameEn": "Benajhabara Chak–112"
//                 },
//                 {
//                     "value": "150308",
//                     "name": "बैकुण्ठपुर",
//                     "nameEn": "Baikunthapura"
//                 },
//                 {
//                     "value": "220364",
//                     "name": "बैरी अकबरपुर कछार",
//                     "nameEn": "Bairee Akbarpur Kachhara"
//                 },
//                 {
//                     "value": "901071",
//                     "name": "बैरी अकबरपुर कछार",
//                     "nameEn": "Bairee Akbarpur Kachhara"
//                 },
//                 {
//                     "value": "220365",
//                     "name": "बैरी अकबरपुर बांगर",
//                     "nameEn": "Bairee Akbarpur Bangara"
//                 },
//                 {
//                     "value": "901072",
//                     "name": "बैरी अकबरपुर बांगर (आजाद नगर व अवन्तीपुरम)",
//                     "nameEn": "Bairee Akbarpur Bangara (Azad Nagara Va Avnteepurama)"
//                 },
//                 {
//                     "value": "900937",
//                     "name": "ब्रम्‍‍ह नगर चक–111",
//                     "nameEn": "Brmha Nagara Chak–111"
//                 },
//                 {
//                     "value": "150367",
//                     "name": "भिसार",
//                     "nameEn": "Bhisara"
//                 },
//                 {
//                     "value": "150347",
//                     "name": "भीसीजरगाँव",
//                     "nameEn": "BheeseejaraGanw"
//                 },
//                 {
//                     "value": "150345",
//                     "name": "भूल",
//                     "nameEn": "Bhoola"
//                 },
//                 {
//                     "value": "901088",
//                     "name": "भैरो घाट चक–3 व 3ए",
//                     "nameEn": "Bhairo Ghata Chak–3 Va 3e"
//                 },
//                 {
//                     "value": "150352",
//                     "name": "भैलामऊ",
//                     "nameEn": "Bhailamaoo"
//                 },
//                 {
//                     "value": "150348",
//                     "name": "भौतीखेड़ा",
//                     "nameEn": "Bhauteekhera"
//                 },
//                 {
//                     "value": "150349",
//                     "name": "भौती प्रतापपुर",
//                     "nameEn": "Bhautee Pratapapura"
//                 },
//                 {
//                     "value": "900951",
//                     "name": "मकडी खेडा",
//                     "nameEn": "Makadee Kheda"
//                 },
//                 {
//                     "value": "901055",
//                     "name": "मकराबर्टगंज चक–09",
//                     "nameEn": "Makarabrtagnja Chak–09"
//                 },
//                 {
//                     "value": "150339",
//                     "name": "मकसूदाबाद",
//                     "nameEn": "Makasoodabada"
//                 },
//                 {
//                     "value": "900952",
//                     "name": "मदारपुर",
//                     "nameEn": "Madarapura"
//                 },
//                 {
//                     "value": "901019",
//                     "name": "महर्षि बाल्मीकि नगर आराजी लश्कर",
//                     "nameEn": "Mahrshi Balmeeki Nagara Aarajee Lshkara"
//                 },
//                 {
//                     "value": "901051",
//                     "name": "मुखर्जी बिहार",
//                     "nameEn": "Mukhrjee Bihara"
//                 },
//                 {
//                     "value": "901020",
//                     "name": "मैनावती नगर बिठूर कलॉ",
//                     "nameEn": "Mainavatee Nagara Bithoora Kalao"
//                 },
//                 {
//                     "value": "150296",
//                     "name": "मोहम्मदपुर",
//                     "nameEn": "Mohmmadapura"
//                 },
//                 {
//                     "value": "150294",
//                     "name": "रमेल कछार",
//                     "nameEn": "Ramela Kachhara"
//                 },
//                 {
//                     "value": "150297",
//                     "name": "रमेल बांगर",
//                     "nameEn": "Ramela Bangara"
//                 },
//                 {
//                     "value": "901085",
//                     "name": "रानी गंज",
//                     "nameEn": "Ranee Ganj"
//                 },
//                 {
//                     "value": "900940",
//                     "name": "रामक्रष्‍ण नगर चक–110",
//                     "nameEn": "Ramkrshna Nagara Chak–110"
//                 },
//                 {
//                     "value": "150355",
//                     "name": "रामपुर भीमसेन",
//                     "nameEn": "Ramapura Bheemasena"
//                 },
//                 {
//                     "value": "901090",
//                     "name": "राम बाग चक–104ए",
//                     "nameEn": "Rama Baga Chak–104e"
//                 },
//                 {
//                     "value": "901073",
//                     "name": "रूद्रपुर",
//                     "nameEn": "Roodrapura"
//                 },
//                 {
//                     "value": "150331",
//                     "name": "रैकेपुर",
//                     "nameEn": "Raikepura"
//                 },
//                 {
//                     "value": "150341",
//                     "name": "रौतेपुर",
//                     "nameEn": "Rautepura"
//                 },
//                 {
//                     "value": "901027",
//                     "name": "लक्ष्मीबाई नगर बिठूर कलॉ",
//                     "nameEn": "Laksh्meebaee Nagara Bithoora Kalao"
//                 },
//                 {
//                     "value": "901052",
//                     "name": "लखनपुर",
//                     "nameEn": "Lakhanapura"
//                 },
//                 {
//                     "value": "901028",
//                     "name": "लवकुश नगर आराजी लश्कर",
//                     "nameEn": "Lavakusha Nagara Aarajee Lshkara"
//                 },
//                 {
//                     "value": "220389",
//                     "name": "लिखनपुर",
//                     "nameEn": "Likhanapura"
//                 },
//                 {
//                     "value": "220374",
//                     "name": "लोहदर",
//                     "nameEn": "Lohadara"
//                 },
//                 {
//                     "value": "150332",
//                     "name": "लोहार खेड़ा",
//                     "nameEn": "Lohara Khera"
//                 },
//                 {
//                     "value": "901053",
//                     "name": "विकास नगर",
//                     "nameEn": "Vikasa Nagara"
//                 },
//                 {
//                     "value": "901093",
//                     "name": "विष्णुपुरी चक–3 व 3ए",
//                     "nameEn": "Vishnupuree Chak–3 Va 3e"
//                 },
//                 {
//                     "value": "220393",
//                     "name": "विसायकपुर कछार",
//                     "nameEn": "Visayakapura Kachhara"
//                 },
//                 {
//                     "value": "900953",
//                     "name": "विसायकपुर कछांर",
//                     "nameEn": "Visayakapura Kachhanra"
//                 },
//                 {
//                     "value": "900954",
//                     "name": "विसायकपुर बंगार",
//                     "nameEn": "Visayakapura Bngara"
//                 },
//                 {
//                     "value": "220394",
//                     "name": "विसायकपुर बाँगर",
//                     "nameEn": "Visayakapura Bangara"
//                 },
//                 {
//                     "value": "150316",
//                     "name": "सम्भरपुर",
//                     "nameEn": "Smbharapura"
//                 },
//                 {
//                     "value": "901063",
//                     "name": "सिविल लाइन्स चक–12 व 12ए",
//                     "nameEn": "Sivila Lainsa Chak–12 Va 12e"
//                 },
//                 {
//                     "value": "150314",
//                     "name": "सिंहपुर कछार",
//                     "nameEn": "Sinhapura Kachhara"
//                 },
//                 {
//                     "value": "901092",
//                     "name": "सीसामऊ चक–105",
//                     "nameEn": "Seesamaoo Chak–105"
//                 },
//                 {
//                     "value": "900955",
//                     "name": "सुक्खा पुरवा",
//                     "nameEn": "Sukkha Purava"
//                 },
//                 {
//                     "value": "150353",
//                     "name": "सुजानपुरा",
//                     "nameEn": "Sujanapura"
//                 },
//                 {
//                     "value": "150343",
//                     "name": "सुरार",
//                     "nameEn": "Surara"
//                 },
//                 {
//                     "value": "901091",
//                     "name": "सूटरगंज चक–11",
//                     "nameEn": "Sootaragnja Chak–11"
//                 },
//                 {
//                     "value": "901036",
//                     "name": "सूबेदार नगर आराजी लश्कर",
//                     "nameEn": "Soobedara Nagara Aarajee Lshkara"
//                 },
//                 {
//                     "value": "901068",
//                     "name": "स्वरूप नगर चक–112 व 113 व 7",
//                     "nameEn": "Svaroopa Nagara Chak–112 Va 113 Va 7"
//                 },
//                 {
//                     "value": "900939",
//                     "name": "हर्ष नगर चक–111",
//                     "nameEn": "Hrsha Nagara Chak–111"
//                 },
//                 {
//                     "value": "901077",
//                     "name": "हलवा खेडा",
//                     "nameEn": "Halava Kheda"
//                 },
//                 {
//                     "value": "150312",
//                     "name": "हिन्दूपुर",
//                     "nameEn": "Hindoopura"
//                 },
//                 {
//                     "value": "150303",
//                     "name": "हिरदेपुर",
//                     "nameEn": "Hiradepura"
//                 },
//                 {
//                     "value": "150301",
//                     "name": "हींगूपुर कछार",
//                     "nameEn": "Heengoopura Kachhara"
//                 },
//                 {
//                     "value": "150295",
//                     "name": "हींगूपुर बांगर",
//                     "nameEn": "Heengoopura Bangara"
//                 },
//                 {
//                     "value": "901096",
//                     "name": "हीरामन का पुरवा चक–91 व 92",
//                     "nameEn": "Heeramana Ka Purava Chak–91 Va 92"
//                 },
//                 {
//                     "value": "150326",
//                     "name": "होरा कछार",
//                     "nameEn": "Hora Kachhara"
//                 },
//                 {
//                     "value": "150330",
//                     "name": "होरा बांगर",
//                     "nameEn": "Hora Bangara"
//                 }
//             ],
//             "210": [
//                 {
//                     "value": "900705",
//                     "name": "127 आनन्दपुरी",
//                     "nameEn": "127 Aanndapuree"
//                 },
//                 {
//                     "value": "900702",
//                     "name": "127 जूही एस ब्लाक बिनोबा नगर",
//                     "nameEn": "127 Joohee Esa Blaka Binoba Nagara"
//                 },
//                 {
//                     "value": "900714",
//                     "name": "127 डबलू 2 नहर के पूर्व बसंत बिहार",
//                     "nameEn": "127 Dabaloo 2 Nahara Ke Poorva Basnta Bihara"
//                 },
//                 {
//                     "value": "900537",
//                     "name": "127 डब्लू डब्‍लू 1 साकेत नगर",
//                     "nameEn": "127 Dbloo Dbloo 1 Saketa Nagara"
//                 },
//                 {
//                     "value": "900764",
//                     "name": "127 निराला नगर",
//                     "nameEn": "127 Nirala Nagara"
//                 },
//                 {
//                     "value": "900763",
//                     "name": "127 निराला नगर टी ब्‍लाक",
//                     "nameEn": "127 Nirala Nagara Tee Blaka"
//                 },
//                 {
//                     "value": "900762",
//                     "name": "127 निराला नगर यू ब्‍लाक",
//                     "nameEn": "127 Nirala Nagara Yoo Blaka"
//                 },
//                 {
//                     "value": "900594",
//                     "name": "128 किदवई नगर ए बी सी साइट न 1",
//                     "nameEn": "128 Kidavaee Nagara E Bee See Saita Na 1"
//                 },
//                 {
//                     "value": "900632",
//                     "name": "128 किदवई नगर एल आई सी",
//                     "nameEn": "128 Kidavaee Nagara Ela Aaee See"
//                 },
//                 {
//                     "value": "900614",
//                     "name": "128 किदवई नगर के ओ ब्लाक एवं सूची में वर्णित के अतिरिक्त अन्य",
//                     "nameEn": "128 Kidavaee Nagara Ke O Blaka Evn Soochee Men Vrnita Ke Atirikta Anya"
//                 },
//                 {
//                     "value": "900625",
//                     "name": "128 किदवई नगर ब्लाक एच एच 1 व एच 2 एवं के",
//                     "nameEn": "128 Kidavaee Nagara Blaka Echa Echa 1 Va Echa 2 Evn Ke"
//                 },
//                 {
//                     "value": "900768",
//                     "name": "128 किदवई नगर ब्लाक वाई‚वाई–1",
//                     "nameEn": "128 Kidavaee Nagara Blaka Vaee‚vaee–1"
//                 },
//                 {
//                     "value": "900630",
//                     "name": "128 गोवर्धनपुरवा",
//                     "nameEn": "128 Govrdhanapurava"
//                 },
//                 {
//                     "value": "900769",
//                     "name": "128 पशुपति नगर",
//                     "nameEn": "128 Pashupati Nagara"
//                 },
//                 {
//                     "value": "900618",
//                     "name": "128 बाबूपुरवा",
//                     "nameEn": "128 Baboopurava"
//                 },
//                 {
//                     "value": "900599",
//                     "name": "129 किदवई नगर",
//                     "nameEn": "129 Kidavaee Nagara"
//                 },
//                 {
//                     "value": "900784",
//                     "name": "129 बाबूपुरवा",
//                     "nameEn": "129 Baboopurava"
//                 },
//                 {
//                     "value": "900001",
//                     "name": "130 अजीतगंज",
//                     "nameEn": "130 Ajeetagnja"
//                 },
//                 {
//                     "value": "900819",
//                     "name": "130 अजीतगंज आबादी",
//                     "nameEn": "130 Ajeetagnja Aabadee"
//                 },
//                 {
//                     "value": "900820",
//                     "name": "130 अजीतगंज कालोनी",
//                     "nameEn": "130 Ajeetagnja Kalonee"
//                 },
//                 {
//                     "value": "900468",
//                     "name": "130 खटिकाना बाबूपुरवा",
//                     "nameEn": "130 Khatikana Baboopurava"
//                 },
//                 {
//                     "value": "900786",
//                     "name": "130 बगाही",
//                     "nameEn": "130 Bagahee"
//                 },
//                 {
//                     "value": "900787",
//                     "name": "130 बगाही भठठा",
//                     "nameEn": "130 Bagahee Bhathatha"
//                 },
//                 {
//                     "value": "900785",
//                     "name": "130 बाकरगंज",
//                     "nameEn": "130 Bakaragnja"
//                 },
//                 {
//                     "value": "900788",
//                     "name": "131 बेगमपुरवा",
//                     "nameEn": "131 Begamapurava"
//                 },
//                 {
//                     "value": "901113",
//                     "name": "132 बाबू पुरवा",
//                     "nameEn": "132 Baboo Purava"
//                 },
//                 {
//                     "value": "900789",
//                     "name": "132 मुंशीपुरवा",
//                     "nameEn": "132 Munsheepurava"
//                 },
//                 {
//                     "value": "900495",
//                     "name": "133 आनन्‍दपुरी",
//                     "nameEn": "133 Aanndapuree"
//                 },
//                 {
//                     "value": "900476",
//                     "name": "133 किदवई नगर",
//                     "nameEn": "133 Kidavaee Nagara"
//                 },
//                 {
//                     "value": "900483",
//                     "name": "133 किदवई नगर ओ ब्‍लाक एम एन साइट नं 1",
//                     "nameEn": "133 Kidavaee Nagara O Blaka Ema Ena Saita Nn 1"
//                 },
//                 {
//                     "value": "900723",
//                     "name": "133जूही हमीरपुर रोड",
//                     "nameEn": "133joohee Hameerapura Roda"
//                 },
//                 {
//                     "value": "900491",
//                     "name": "133 टान्‍सपोर्ट नगर",
//                     "nameEn": "133 Tansaporta Nagara"
//                 },
//                 {
//                     "value": "900486",
//                     "name": "133 नया पुरवा",
//                     "nameEn": "133 Naya Purava"
//                 },
//                 {
//                     "value": "900470",
//                     "name": "133 सब्‍जीमण्‍डी ओ ब्‍लाक",
//                     "nameEn": "133 Sbjeemndee O Blaka"
//                 },
//                 {
//                     "value": "900506",
//                     "name": "78–79 लाटूश रोड",
//                     "nameEn": "78–79 Latoosha Roda"
//                 },
//                 {
//                     "value": "900500",
//                     "name": "78–90 अनवरगंज",
//                     "nameEn": "78–90 Anavaragnja"
//                 },
//                 {
//                     "value": "900527",
//                     "name": "79 बासमण्‍डी",
//                     "nameEn": "79 Basamndee"
//                 },
//                 {
//                     "value": "900518",
//                     "name": "90 इफितखाराबाद",
//                     "nameEn": "90 Iphitakharabada"
//                 },
//                 {
//                     "value": "900511",
//                     "name": "90फूलवाली गली",
//                     "nameEn": "90phoolavalee Galee"
//                 },
//                 {
//                     "value": "900524",
//                     "name": "90 बेकनगंज",
//                     "nameEn": "90 Bekanagnja"
//                 },
//                 {
//                     "value": "150455",
//                     "name": "अटवा",
//                     "nameEn": "Atwa"
//                 },
//                 {
//                     "value": "900677",
//                     "name": "अम्‍बेडक्‍र नगर",
//                     "nameEn": "Ambedkra Nagara"
//                 },
//                 {
//                     "value": "220299",
//                     "name": "अरर्ा",
//                     "nameEn": "Arra"
//                 },
//                 {
//                     "value": "900732",
//                     "name": "अर्रा",
//                     "nameEn": "Arra"
//                 },
//                 {
//                     "value": "220298",
//                     "name": "अहिरवाँ",
//                     "nameEn": "Ahiravan"
//                 },
//                 {
//                     "value": "900802",
//                     "name": "अहिरवां",
//                     "nameEn": "Ahiravan"
//                 },
//                 {
//                     "value": "900778",
//                     "name": "आदर्श नगर",
//                     "nameEn": "Aadrsha Nagara"
//                 },
//                 {
//                     "value": "900840",
//                     "name": "आदर्श नगर",
//                     "nameEn": "Aadrsha Nagara"
//                 },
//                 {
//                     "value": "900737",
//                     "name": "आनन्‍द बिहार",
//                     "nameEn": "Aannda Bihara"
//                 },
//                 {
//                     "value": "150458",
//                     "name": "आराजी मझावन",
//                     "nameEn": "Aarajee Majhavana"
//                 },
//                 {
//                     "value": "220297",
//                     "name": "इमलीपुर",
//                     "nameEn": "Imaleepura"
//                 },
//                 {
//                     "value": "900533",
//                     "name": "उस्‍मानपुर",
//                     "nameEn": "Usmanapura"
//                 },
//                 {
//                     "value": "220303",
//                     "name": "उस्मानपुर",
//                     "nameEn": "Usmanapura"
//                 },
//                 {
//                     "value": "900535",
//                     "name": "उस्‍मानपुर केडीए कालोनी",
//                     "nameEn": "Usmanapura Kedeee Kalonee"
//                 },
//                 {
//                     "value": "150430",
//                     "name": "ओरियारा",
//                     "nameEn": "Oriyara"
//                 },
//                 {
//                     "value": "900549",
//                     "name": "कंजर पुरवा",
//                     "nameEn": "Knjara Purava"
//                 },
//                 {
//                     "value": "900657",
//                     "name": "कमालपुर",
//                     "nameEn": "Kamalapura"
//                 },
//                 {
//                     "value": "900794",
//                     "name": "करमपुर",
//                     "nameEn": "Karamapura"
//                 },
//                 {
//                     "value": "900733",
//                     "name": "कर्रही",
//                     "nameEn": "Krrahee"
//                 },
//                 {
//                     "value": "900588",
//                     "name": "किदवई नगर केडीए कालोनी",
//                     "nameEn": "Kidavaee Nagara Kedeee Kalonee"
//                 },
//                 {
//                     "value": "900577",
//                     "name": "किदवई नगर ब्‍लाक डी ई एफ जी",
//                     "nameEn": "Kidavaee Nagara Blaka Dee Ee Epha Jee"
//                 },
//                 {
//                     "value": "900753",
//                     "name": "कुंज बिहार",
//                     "nameEn": "Kunja Bihara"
//                 },
//                 {
//                     "value": "900563",
//                     "name": "कुम्‍हारटोला",
//                     "nameEn": "Kumharatola"
//                 },
//                 {
//                     "value": "900660",
//                     "name": "कुरियां",
//                     "nameEn": "Kuriyan"
//                 },
//                 {
//                     "value": "900568",
//                     "name": "कृष्णा नगर",
//                     "nameEn": "Krishna Nagara"
//                 },
//                 {
//                     "value": "900566",
//                     "name": "कृष्‍णापुरम",
//                     "nameEn": "Krishnapurama"
//                 },
//                 {
//                     "value": "900841",
//                     "name": "के आर पुरम",
//                     "nameEn": "Ke Aara Puram"
//                 },
//                 {
//                     "value": "900756",
//                     "name": "के डी ए कालोनी",
//                     "nameEn": "Ke Dee E Kalonee"
//                 },
//                 {
//                     "value": "900739",
//                     "name": "के डी ए कालोनी अर्रा",
//                     "nameEn": "Ke Dee E Kalonee Arra"
//                 },
//                 {
//                     "value": "900757",
//                     "name": "के डी ए कालोनी गंगापुर",
//                     "nameEn": "Ke Dee E Kalonee Gngapura"
//                 },
//                 {
//                     "value": "900709",
//                     "name": "के डी ए कालोनी जूही",
//                     "nameEn": "Ke Dee E Kalonee Joohee"
//                 },
//                 {
//                     "value": "900765",
//                     "name": "केनाल कालोनी",
//                     "nameEn": "Kenala Kalonee"
//                 },
//                 {
//                     "value": "900858",
//                     "name": "कैटिल कालोनी",
//                     "nameEn": "Kaitila Kalonee"
//                 },
//                 {
//                     "value": "900844",
//                     "name": "कोयला नगर",
//                     "nameEn": "Koyala Nagara"
//                 },
//                 {
//                     "value": "220322",
//                     "name": "खजुरी",
//                     "nameEn": "Khajuree"
//                 },
//                 {
//                     "value": "150438",
//                     "name": "खरगपुर",
//                     "nameEn": "Kharagapura"
//                 },
//                 {
//                     "value": "900686",
//                     "name": "खाण्‍डेपुर",
//                     "nameEn": "Khandepura"
//                 },
//                 {
//                     "value": "220323",
//                     "name": "खाण्डेपुर",
//                     "nameEn": "Khandepura"
//                 },
//                 {
//                     "value": "900556",
//                     "name": "गंगागंज",
//                     "nameEn": "Gngagnja"
//                 },
//                 {
//                     "value": "900838",
//                     "name": "गंगा नगर",
//                     "nameEn": "Gnga Nagara"
//                 },
//                 {
//                     "value": "900747",
//                     "name": "गंगापुर मछरिया",
//                     "nameEn": "Gngapura Machhariya"
//                 },
//                 {
//                     "value": "900731",
//                     "name": "गडरिनपुरवा",
//                     "nameEn": "Gadarinapurava"
//                 },
//                 {
//                     "value": "900849",
//                     "name": "गणेशपुर",
//                     "nameEn": "Ganeshapura"
//                 },
//                 {
//                     "value": "900827",
//                     "name": "गदियाना",
//                     "nameEn": "Gadiyana"
//                 },
//                 {
//                     "value": "900639",
//                     "name": "गांधी ग्राम",
//                     "nameEn": "Gandhee Grama"
//                 },
//                 {
//                     "value": "900836",
//                     "name": "गायत्री नगर",
//                     "nameEn": "Gayatree Nagara"
//                 },
//                 {
//                     "value": "900828",
//                     "name": "गिरजा नगर",
//                     "nameEn": "Giraja Nagara"
//                 },
//                 {
//                     "value": "220325",
//                     "name": "गुजैनी",
//                     "nameEn": "Gujainee"
//                 },
//                 {
//                     "value": "900675",
//                     "name": "गुजैनी अन्‍य",
//                     "nameEn": "Gujainee Anya"
//                 },
//                 {
//                     "value": "900671",
//                     "name": "गुजैनी कालेनी ब्‍लाक जे",
//                     "nameEn": "Gujainee Kalenee Blaka Je"
//                 },
//                 {
//                     "value": "900670",
//                     "name": "गुजैनी कालोनी ब्‍लाक ई",
//                     "nameEn": "Gujainee Kalonee Blaka Ee"
//                 },
//                 {
//                     "value": "900664",
//                     "name": "गुजैनी कालोनी ब्‍लाक ए",
//                     "nameEn": "Gujainee Kalonee Blaka E"
//                 },
//                 {
//                     "value": "900673",
//                     "name": "गुजैनी कालोनी ब्‍लाक एच",
//                     "nameEn": "Gujainee Kalonee Blaka Echa"
//                 },
//                 {
//                     "value": "900674",
//                     "name": "गुजैनी कालोनी ब्‍लाक के",
//                     "nameEn": "Gujainee Kalonee Blaka Ke"
//                 },
//                 {
//                     "value": "900672",
//                     "name": "गुजैनी कालोनी ब्‍लाक जी",
//                     "nameEn": "Gujainee Kalonee Blaka Jee"
//                 },
//                 {
//                     "value": "900669",
//                     "name": "गुजैनी कालोनी ब्‍लाक वाई",
//                     "nameEn": "Gujainee Kalonee Blaka Vaee"
//                 },
//                 {
//                     "value": "900667",
//                     "name": "गुजैनी कालोनी ब्‍लाक सी",
//                     "nameEn": "Gujainee Kalonee Blaka See"
//                 },
//                 {
//                     "value": "900665",
//                     "name": "गुजैनी कॉलोनी ब्लाक बी",
//                     "nameEn": "Gujainee Kaolonee Blaka Bee"
//                 },
//                 {
//                     "value": "900539",
//                     "name": "गुलमोहर बिहार",
//                     "nameEn": "Gulamohara Bihara"
//                 },
//                 {
//                     "value": "900751",
//                     "name": "गोपाल नगर",
//                     "nameEn": "Gopala Nagara"
//                 },
//                 {
//                     "value": "900853",
//                     "name": "गौरिया",
//                     "nameEn": "Gauriya"
//                 },
//                 {
//                     "value": "150437",
//                     "name": "घिसुरी",
//                     "nameEn": "Ghisuree"
//                 },
//                 {
//                     "value": "150457",
//                     "name": "चकद्वारी",
//                     "nameEn": "Chakdvaree"
//                 },
//                 {
//                     "value": "900843",
//                     "name": "चंदन नगर",
//                     "nameEn": "Chndana Nagara"
//                 },
//                 {
//                     "value": "900678",
//                     "name": "चन्‍दारी गाव",
//                     "nameEn": "Chndaree Gava"
//                 },
//                 {
//                     "value": "900848",
//                     "name": "चन्द्र नगरी",
//                     "nameEn": "Chndra Nagaree"
//                 },
//                 {
//                     "value": "900829",
//                     "name": "चाणक्यपुरी",
//                     "nameEn": "Chankyapuree"
//                 },
//                 {
//                     "value": "900842",
//                     "name": "चिश्ती नगर",
//                     "nameEn": "Chishtee Nagara"
//                 },
//                 {
//                     "value": "900814",
//                     "name": "चेत नगर",
//                     "nameEn": "Cheta Nagara"
//                 },
//                 {
//                     "value": "900559",
//                     "name": "छेदा की टटिया",
//                     "nameEn": "Chheda Kee Tatiya"
//                 },
//                 {
//                     "value": "900774",
//                     "name": "छेदी सिह का पुरवा व बली का पुरवा",
//                     "nameEn": "Chhedee Siha Ka Purava Va Balee Ka Purava"
//                 },
//                 {
//                     "value": "900693",
//                     "name": "जगईपुरवा",
//                     "nameEn": "Jagaeepurava"
//                 },
//                 {
//                     "value": "220337",
//                     "name": "जरौली",
//                     "nameEn": "Jaraulee"
//                 },
//                 {
//                     "value": "900688",
//                     "name": "जरौली अन्‍य",
//                     "nameEn": "Jaraulee Anya"
//                 },
//                 {
//                     "value": "900687",
//                     "name": "जरौली केडीए",
//                     "nameEn": "Jaraulee Kedeee"
//                 },
//                 {
//                     "value": "900846",
//                     "name": "जवाहरपुरम",
//                     "nameEn": "Javaharapurama"
//                 },
//                 {
//                     "value": "900720",
//                     "name": "जाटनपुरवा",
//                     "nameEn": "Jatanapurava"
//                 },
//                 {
//                     "value": "900703",
//                     "name": "जूही अन्‍य ब्‍लाक",
//                     "nameEn": "Joohee Anya Blaka"
//                 },
//                 {
//                     "value": "900699",
//                     "name": "जूही कंजरपुरवा",
//                     "nameEn": "Joohee Knjarapurava"
//                 },
//                 {
//                     "value": "220339",
//                     "name": "जूहीकलाँ",
//                     "nameEn": "Jooheekalan"
//                 },
//                 {
//                     "value": "900697",
//                     "name": "जूही गढा",
//                     "nameEn": "Joohee Gadha"
//                 },
//                 {
//                     "value": "900700",
//                     "name": "जूही गढा गाव",
//                     "nameEn": "Joohee Gadha Gava"
//                 },
//                 {
//                     "value": "900696",
//                     "name": "जूही गौशाला",
//                     "nameEn": "Joohee Gaushala"
//                 },
//                 {
//                     "value": "900695",
//                     "name": "जूही बम्‍बुरिहा",
//                     "nameEn": "Joohee Bmburiha"
//                 },
//                 {
//                     "value": "900701",
//                     "name": "जूही बारादेवी",
//                     "nameEn": "Joohee Baradevee"
//                 },
//                 {
//                     "value": "900698",
//                     "name": "जूही विजय गढा",
//                     "nameEn": "Joohee Vijaya Gadha"
//                 },
//                 {
//                     "value": "900767",
//                     "name": "जे पी कालोनी",
//                     "nameEn": "Je Pee Kalonee"
//                 },
//                 {
//                     "value": "900683",
//                     "name": "टटिया खेडा",
//                     "nameEn": "Tatiya Kheda"
//                 },
//                 {
//                     "value": "220341",
//                     "name": "टटिया झनाकू",
//                     "nameEn": "Tatiya Jhanakoo"
//                 },
//                 {
//                     "value": "900642",
//                     "name": "टटिया झनाकू",
//                     "nameEn": "Tatiya Jhanakoo"
//                 },
//                 {
//                     "value": "900682",
//                     "name": "टटिया बल्‍ला",
//                     "nameEn": "Tatiya Blla"
//                 },
//                 {
//                     "value": "900681",
//                     "name": "टटिया भगवन्‍त",
//                     "nameEn": "Tatiya Bhagavnta"
//                 },
//                 {
//                     "value": "900679",
//                     "name": "टटिया सिंधी",
//                     "nameEn": "Tatiya Sindhee"
//                 },
//                 {
//                     "value": "900851",
//                     "name": "टिकरा पैगम्बर",
//                     "nameEn": "Tikara Paigmbara"
//                 },
//                 {
//                     "value": "900852",
//                     "name": "टिकरियाछतमरा",
//                     "nameEn": "Tikariyachhatamara"
//                 },
//                 {
//                     "value": "220342",
//                     "name": "टीकर मघई",
//                     "nameEn": "Teekara Maghaee"
//                 },
//                 {
//                     "value": "900721",
//                     "name": "ट्रान्‍सपोर्ट नगर",
//                     "nameEn": "Transaporta Nagara"
//                 },
//                 {
//                     "value": "900716",
//                     "name": "डबलू2 नहर के पश्चिचम दामोदरनगर बाई पास दक्षिण",
//                     "nameEn": "Dabaloo2 Nahara Ke Pshchichama Damodaranagara Baee Pasa Dakshina"
//                 },
//                 {
//                     "value": "900715",
//                     "name": "डबलू 2/नहर पश्चिम दामोदर नगर सम्‍पूर्ण क्षेत्र",
//                     "nameEn": "Dabaloo 2/nahara Pshchima Damodara Nagara Smpoorna Kshetr"
//                 },
//                 {
//                     "value": "900545",
//                     "name": "डब्लू ब्‍लाक केशव नगर",
//                     "nameEn": "Dbloo Blaka Keshava Nagara"
//                 },
//                 {
//                     "value": "900717",
//                     "name": "ढकनापुरवा",
//                     "nameEn": "Dhakanapurava"
//                 },
//                 {
//                     "value": "900676",
//                     "name": "तात्‍या टोपे नगर",
//                     "nameEn": "Tatya Tope Nagara"
//                 },
//                 {
//                     "value": "900831",
//                     "name": "तुलसी नगर",
//                     "nameEn": "Tulasee Nagara"
//                 },
//                 {
//                     "value": "900541",
//                     "name": "तुलसी बिहार",
//                     "nameEn": "Tulasee Bihara"
//                 },
//                 {
//                     "value": "220344",
//                     "name": "तौधकपुर",
//                     "nameEn": "Taudhakapura"
//                 },
//                 {
//                     "value": "900748",
//                     "name": "तौधकपुर",
//                     "nameEn": "Taudhakapura"
//                 },
//                 {
//                     "value": "220345",
//                     "name": "दबौली",
//                     "nameEn": "Dabaulee"
//                 },
//                 {
//                     "value": "900727",
//                     "name": "दबौली अन्‍य ब्‍लाक",
//                     "nameEn": "Dabaulee Anya Blaka"
//                 },
//                 {
//                     "value": "900725",
//                     "name": "दबौली कालोनी भाग 1",
//                     "nameEn": "Dabaulee Kalonee Bhaga 1"
//                 },
//                 {
//                     "value": "900726",
//                     "name": "दबौली कालोनी भाग 2",
//                     "nameEn": "Dabaulee Kalonee Bhaga 2"
//                 },
//                 {
//                     "value": "900724",
//                     "name": "दबौली गाव",
//                     "nameEn": "Dabaulee Gava"
//                 },
//                 {
//                     "value": "900761",
//                     "name": "दयालपुरम",
//                     "nameEn": "Dayalapurama"
//                 },
//                 {
//                     "value": "900835",
//                     "name": "दलनपुर",
//                     "nameEn": "Dalanapura"
//                 },
//                 {
//                     "value": "220346",
//                     "name": "दहेली सुजानपुर",
//                     "nameEn": "Dahelee Sujanapura"
//                 },
//                 {
//                     "value": "900740",
//                     "name": "दिवेदी नगर",
//                     "nameEn": "Divedee Nagara"
//                 },
//                 {
//                     "value": "900793",
//                     "name": "देवकी नगर",
//                     "nameEn": "Devakee Nagara"
//                 },
//                 {
//                     "value": "900826",
//                     "name": "देहली सुजानपुर",
//                     "nameEn": "Dehalee Sujanapura"
//                 },
//                 {
//                     "value": "900795",
//                     "name": "धरी का पुरवा",
//                     "nameEn": "Dharee Ka Purava"
//                 },
//                 {
//                     "value": "900718",
//                     "name": "नयापुरवा",
//                     "nameEn": "Nayapurava"
//                 },
//                 {
//                     "value": "150338",
//                     "name": "नसेनियाँ",
//                     "nameEn": "Naseniyan"
//                 },
//                 {
//                     "value": "900738",
//                     "name": "नारायणपुरी",
//                     "nameEn": "Narayanapuree"
//                 },
//                 {
//                     "value": "900825",
//                     "name": "निहरा गांव",
//                     "nameEn": "Nihara Ganw"
//                 },
//                 {
//                     "value": "900749",
//                     "name": "निहुरी",
//                     "nameEn": "Nihuree"
//                 },
//                 {
//                     "value": "150396",
//                     "name": "नेवरी",
//                     "nameEn": "Nevaree"
//                 },
//                 {
//                     "value": "900816",
//                     "name": "नोनियनपुरवा",
//                     "nameEn": "Noniyanapurava"
//                 },
//                 {
//                     "value": "220350",
//                     "name": "नौबस्ता",
//                     "nameEn": "Naubsta"
//                 },
//                 {
//                     "value": "900728",
//                     "name": "नौबस्‍ता‚नौबस्‍ता पुरानी बस्‍ती",
//                     "nameEn": "Naubsta‚naubsta Puranee Bstee"
//                 },
//                 {
//                     "value": "900742",
//                     "name": "नौबस्ता पूर्व",
//                     "nameEn": "Naubsta Poorva"
//                 },
//                 {
//                     "value": "900797",
//                     "name": "न्‍यू आजाद नगर",
//                     "nameEn": "Nyoo Azad Nagara"
//                 },
//                 {
//                     "value": "900653",
//                     "name": "पटेल नगर",
//                     "nameEn": "Patela Nagara"
//                 },
//                 {
//                     "value": "150439",
//                     "name": "परसौली",
//                     "nameEn": "Parasaulee"
//                 },
//                 {
//                     "value": "900750",
//                     "name": "पहरनपुर",
//                     "nameEn": "Paharanapura"
//                 },
//                 {
//                     "value": "900685",
//                     "name": "पहाडपुर",
//                     "nameEn": "Pahadapura"
//                 },
//                 {
//                     "value": "900707",
//                     "name": "पीली कालोनी",
//                     "nameEn": "Peelee Kalonee"
//                 },
//                 {
//                     "value": "900809",
//                     "name": "प्रज्ञा बिहार",
//                     "nameEn": "Pragyaa Bihara"
//                 },
//                 {
//                     "value": "900690",
//                     "name": "प्रेरणा बिहार",
//                     "nameEn": "Prerana Bihara"
//                 },
//                 {
//                     "value": "220360",
//                     "name": "बगाही",
//                     "nameEn": "Bagahee"
//                 },
//                 {
//                     "value": "900758",
//                     "name": "बजरंगपुरी",
//                     "nameEn": "Bajarngapuree"
//                 },
//                 {
//                     "value": "220361",
//                     "name": "बरर्ा",
//                     "nameEn": "Barra"
//                 },
//                 {
//                     "value": "900770",
//                     "name": "बर्रा 1",
//                     "nameEn": "Brra 1"
//                 },
//                 {
//                     "value": "900771",
//                     "name": "बर्रा 2",
//                     "nameEn": "Brra 2"
//                 },
//                 {
//                     "value": "900772",
//                     "name": "बर्रा 3",
//                     "nameEn": "Brra 3"
//                 },
//                 {
//                     "value": "900773",
//                     "name": "बर्रा 4",
//                     "nameEn": "Brra 4"
//                 },
//                 {
//                     "value": "900775",
//                     "name": "बर्रा 5",
//                     "nameEn": "Brra 5"
//                 },
//                 {
//                     "value": "900780",
//                     "name": "बर्रा 6",
//                     "nameEn": "Brra 6"
//                 },
//                 {
//                     "value": "900781",
//                     "name": "बर्रा 7",
//                     "nameEn": "Brra 7"
//                 },
//                 {
//                     "value": "900782",
//                     "name": "बर्रा 8",
//                     "nameEn": "Brra 8"
//                 },
//                 {
//                     "value": "900783",
//                     "name": "बर्रा अन्‍य ब्‍लाक",
//                     "nameEn": "Brra Anya Blaka"
//                 },
//                 {
//                     "value": "901100",
//                     "name": "बर्रा के यू डी पी",
//                     "nameEn": "Brra Ke Yoo Dee Pee"
//                 },
//                 {
//                     "value": "900776",
//                     "name": "बर्रा गॉव",
//                     "nameEn": "Brra Gaova"
//                 },
//                 {
//                     "value": "900779",
//                     "name": "बर्रा जेड 1",
//                     "nameEn": "Brra Jeda 1"
//                 },
//                 {
//                     "value": "901101",
//                     "name": "बर्रा यू पी यू डी पी",
//                     "nameEn": "Brra Yoo Pee Yoo Dee Pee"
//                 },
//                 {
//                     "value": "900730",
//                     "name": "बाबा नगर",
//                     "nameEn": "Baba Nagara"
//                 },
//                 {
//                     "value": "900684",
//                     "name": "बिनगवां",
//                     "nameEn": "Binagavan"
//                 },
//                 {
//                     "value": "900743",
//                     "name": "बूढपुर मछरिया",
//                     "nameEn": "Boodhapura Machhariya"
//                 },
//                 {
//                     "value": "220363",
//                     "name": "बूढ़पुर मछरिहा",
//                     "nameEn": "Boorhpura Machhariha"
//                 },
//                 {
//                     "value": "900736",
//                     "name": "बौद्ध् नगर",
//                     "nameEn": "Bauddh Nagara"
//                 },
//                 {
//                     "value": "901102",
//                     "name": "भवानी नगर",
//                     "nameEn": "Bhavanee Nagara"
//                 },
//                 {
//                     "value": "900646",
//                     "name": "भाभा नगर",
//                     "nameEn": "Bhabha Nagara"
//                 },
//                 {
//                     "value": "150436",
//                     "name": "भारू",
//                     "nameEn": "Bharoo"
//                 },
//                 {
//                     "value": "900832",
//                     "name": "मंगला बिहार 1 व मंगला बिहार 2",
//                     "nameEn": "Mngala Bihara 1 Va Mngala Bihara 2"
//                 },
//                 {
//                     "value": "150454",
//                     "name": "मझावन",
//                     "nameEn": "Majhavana"
//                 },
//                 {
//                     "value": "150417",
//                     "name": "मटियारा",
//                     "nameEn": "Matiyara"
//                 },
//                 {
//                     "value": "900815",
//                     "name": "मथुरापुर",
//                     "nameEn": "Mathurapura"
//                 },
//                 {
//                     "value": "900755",
//                     "name": "मनोहर नगर",
//                     "nameEn": "Manohara Nagara"
//                 },
//                 {
//                     "value": "900790",
//                     "name": "यशोदा नगर",
//                     "nameEn": "Yashoda Nagara"
//                 },
//                 {
//                     "value": "900811",
//                     "name": "यादव नगर",
//                     "nameEn": "Yadava Nagara"
//                 },
//                 {
//                     "value": "900800",
//                     "name": "रतन लाल नगर",
//                     "nameEn": "Ratana Lala Nagara"
//                 },
//                 {
//                     "value": "900722",
//                     "name": "रत्‍तूपुरवा",
//                     "nameEn": "Rttoopurava"
//                 },
//                 {
//                     "value": "150431",
//                     "name": "रमईपुर",
//                     "nameEn": "Ramaeepura"
//                 },
//                 {
//                     "value": "900734",
//                     "name": "राजीव बिहार",
//                     "nameEn": "Rajeeva Bihara"
//                 },
//                 {
//                     "value": "900760",
//                     "name": "राजेन्‍द्रपुरम",
//                     "nameEn": "Rajendrapurama"
//                 },
//                 {
//                     "value": "900845",
//                     "name": "राधापुरम",
//                     "nameEn": "Radhapurama"
//                 },
//                 {
//                     "value": "900833",
//                     "name": "रामपुरम",
//                     "nameEn": "Ramapurama"
//                 },
//                 {
//                     "value": "900706",
//                     "name": "लाल कालोनी",
//                     "nameEn": "Lala Kalonee"
//                 },
//                 {
//                     "value": "900796",
//                     "name": "लालपुर",
//                     "nameEn": "Lalapura"
//                 },
//                 {
//                     "value": "150433",
//                     "name": "लुधौरी",
//                     "nameEn": "Ludhauree"
//                 },
//                 {
//                     "value": "900692",
//                     "name": "वरुण बिहार",
//                     "nameEn": "Varuna Bihara"
//                 },
//                 {
//                     "value": "900694",
//                     "name": "वसुधा बिहार",
//                     "nameEn": "Vasudha Bihara"
//                 },
//                 {
//                     "value": "901114",
//                     "name": "वाजिदपुर",
//                     "nameEn": "Vajidapura"
//                 },
//                 {
//                     "value": "220390",
//                     "name": "विनगवाँ",
//                     "nameEn": "Vinagavan"
//                 },
//                 {
//                     "value": "900643",
//                     "name": "विमान नगर",
//                     "nameEn": "Vimana Nagara"
//                 },
//                 {
//                     "value": "900644",
//                     "name": "विमानपुरी",
//                     "nameEn": "Vimanapuree"
//                 },
//                 {
//                     "value": "900805",
//                     "name": "विराट नगर",
//                     "nameEn": "Virata Nagara"
//                 },
//                 {
//                     "value": "900839",
//                     "name": "विश्वकर्मा नगर",
//                     "nameEn": "Vishvakrma Nagara"
//                 },
//                 {
//                     "value": "900777",
//                     "name": "विश्‍व बैक कालोनी",
//                     "nameEn": "Vishva Baika Kalonee"
//                 },
//                 {
//                     "value": "900689",
//                     "name": "वैदेही बिहार",
//                     "nameEn": "Vaidehee Bihara"
//                 },
//                 {
//                     "value": "900691",
//                     "name": "वैष्‍णवी बिहार",
//                     "nameEn": "Vaishnavee Bihara"
//                 },
//                 {
//                     "value": "900759",
//                     "name": "शंकराचार्य नगर",
//                     "nameEn": "Shnkaracharya Nagara"
//                 },
//                 {
//                     "value": "150435",
//                     "name": "शाहपुर मझावन",
//                     "nameEn": "Shahpur Majhavana"
//                 },
//                 {
//                     "value": "900655",
//                     "name": "शिवकटरा",
//                     "nameEn": "Shivakatara"
//                 },
//                 {
//                     "value": "900806",
//                     "name": "शिवपुरी",
//                     "nameEn": "Shivapuree"
//                 },
//                 {
//                     "value": "900813",
//                     "name": "शिवशंकरपुरम",
//                     "nameEn": "Shivashnkarapurama"
//                 },
//                 {
//                     "value": "900830",
//                     "name": "श्याम नगर के०डी०ए०कालोनी",
//                     "nameEn": "Shyama Nagara Ke0dee0e0kalonee"
//                 },
//                 {
//                     "value": "900680",
//                     "name": "श्याम नगर ब्‍लाक ए बी सी",
//                     "nameEn": "Shyama Nagara Blaka E Bee See"
//                 },
//                 {
//                     "value": "900824",
//                     "name": "श्याम नगर ब्लाक डी व ई",
//                     "nameEn": "Shyama Nagara Blaka Dee Va Ee"
//                 },
//                 {
//                     "value": "900823",
//                     "name": "सकरापुर",
//                     "nameEn": "Sakarapura"
//                 },
//                 {
//                     "value": "220397",
//                     "name": "सकरापुर",
//                     "nameEn": "Sakarapura"
//                 },
//                 {
//                     "value": "900729",
//                     "name": "संजय गाधी नगर",
//                     "nameEn": "Snjaya Gadhee Nagara"
//                 },
//                 {
//                     "value": "900821",
//                     "name": "संजय नगर",
//                     "nameEn": "Snjaya Nagara"
//                 },
//                 {
//                     "value": "900744",
//                     "name": "संजय नगर",
//                     "nameEn": "Snjaya Nagara"
//                 },
//                 {
//                     "value": "900850",
//                     "name": "सजारी",
//                     "nameEn": "Sajaree"
//                 },
//                 {
//                     "value": "220399",
//                     "name": "सजारी",
//                     "nameEn": "Sajaree"
//                 },
//                 {
//                     "value": "900812",
//                     "name": "संजीव नगर 1/ संजीव नगर 2",
//                     "nameEn": "Snjeeva Nagara 1/ Snjeeva Nagara 2"
//                 },
//                 {
//                     "value": "900791",
//                     "name": "सतवरी",
//                     "nameEn": "SAtwaree"
//                 },
//                 {
//                     "value": "220398",
//                     "name": "सतवरी",
//                     "nameEn": "SAtwaree"
//                 },
//                 {
//                     "value": "900803",
//                     "name": "सदानन्‍द नगर",
//                     "nameEn": "Sadannda Nagara"
//                 },
//                 {
//                     "value": "220404",
//                     "name": "सनिगवा",
//                     "nameEn": "Sanigava"
//                 },
//                 {
//                     "value": "900817",
//                     "name": "सनिगवा",
//                     "nameEn": "Sanigava"
//                 },
//                 {
//                     "value": "900704",
//                     "name": "सफेद कालोनी",
//                     "nameEn": "Sapheda Kalonee"
//                 },
//                 {
//                     "value": "900808",
//                     "name": "सरन स्‍टेट",
//                     "nameEn": "Sarana Steta"
//                 },
//                 {
//                     "value": "900553",
//                     "name": "सहदुल्‍लापुर",
//                     "nameEn": "Sahadullapura"
//                 },
//                 {
//                     "value": "900837",
//                     "name": "सावित्री नगर",
//                     "nameEn": "Savitree Nagara"
//                 },
//                 {
//                     "value": "900807",
//                     "name": "सिद्धार्थ नगर",
//                     "nameEn": "Siddhartha Nagara"
//                 },
//                 {
//                     "value": "900834",
//                     "name": "सिद्धार्थ नगर(शहीद नगर)",
//                     "nameEn": "Siddhartha Nagara(shaheeda Nagara)"
//                 },
//                 {
//                     "value": "900810",
//                     "name": "सीताराम नगर",
//                     "nameEn": "Seetarama Nagara"
//                 },
//                 {
//                     "value": "900719",
//                     "name": "सुक्‍खापुरवा",
//                     "nameEn": "Sukkhapurava"
//                 },
//                 {
//                     "value": "900822",
//                     "name": "सुजातगंज",
//                     "nameEn": "Sujatagnja"
//                 },
//                 {
//                     "value": "900754",
//                     "name": "सुन्‍दर नगर",
//                     "nameEn": "Sundara Nagara"
//                 },
//                 {
//                     "value": "150456",
//                     "name": "सेनियां",
//                     "nameEn": "Seniyan"
//                 },
//                 {
//                     "value": "900792",
//                     "name": "सेमरा",
//                     "nameEn": "Semara"
//                 },
//                 {
//                     "value": "900804",
//                     "name": "सैनिक नगर",
//                     "nameEn": "Sainika Nagara"
//                 },
//                 {
//                     "value": "900799",
//                     "name": "स्‍वर्ण जयन्‍ती बिहार",
//                     "nameEn": "Svrna Jayntee Bihara"
//                 },
//                 {
//                     "value": "900847",
//                     "name": "स्वर्ण नगरी",
//                     "nameEn": "Svrna Nagaree"
//                 },
//                 {
//                     "value": "900735",
//                     "name": "हनुमन्‍त बिहार",
//                     "nameEn": "Hanumnta Bihara"
//                 },
//                 {
//                     "value": "900741",
//                     "name": "हरदेव नगर",
//                     "nameEn": "Haradeva Nagara"
//                 },
//                 {
//                     "value": "150464",
//                     "name": "हरदौली",
//                     "nameEn": "Haradaulee"
//                 },
//                 {
//                     "value": "900708",
//                     "name": "हरी कालोनी",
//                     "nameEn": "Haree Kalonee"
//                 },
//                 {
//                     "value": "220395",
//                     "name": "हंसपुर",
//                     "nameEn": "Hnsapura"
//                 },
//                 {
//                     "value": "900746",
//                     "name": "हंसपुरम अन्य",
//                     "nameEn": "Hnsapurama Anya"
//                 },
//                 {
//                     "value": "900745",
//                     "name": "हंसपुरम",
//                     "nameEn": "Hnsapurama"
//                 },
//                 {
//                     "value": "900818",
//                     "name": "हाइवे सिटी व विस्तार",
//                     "nameEn": "Haive Sitee Va Vistara"
//                 },
//                 {
//                     "value": "150434",
//                     "name": "हाजीपुर",
//                     "nameEn": "Hajeepura"
//                 },
//                 {
//                     "value": "900798",
//                     "name": "हीरा नगर",
//                     "nameEn": "Heera Nagara"
//                 }
//             ],
//             "211": [
//                 {
//                     "value": "900369",
//                     "name": "अनवर गंज 84 चक",
//                     "nameEn": "Anavara Ganj 84 Chak"
//                 },
//                 {
//                     "value": "900540",
//                     "name": "अफजलपुर",
//                     "nameEn": "Aphajalapura"
//                 },
//                 {
//                     "value": "150424",
//                     "name": "अफजलपुर",
//                     "nameEn": "Aphajalapura"
//                 },
//                 {
//                     "value": "900262",
//                     "name": "अम्‍बेडकर नगर 117 चक",
//                     "nameEn": "Ambedakara Nagara 117 Chak"
//                 },
//                 {
//                     "value": "900317",
//                     "name": "अशोक नगर कल्‍यानपुर",
//                     "nameEn": "Ashoka Nagara Klyanapura"
//                 },
//                 {
//                     "value": "900485",
//                     "name": "अहिल्‍याबाई होल्‍कर नगर",
//                     "nameEn": "Ahilyabaee Holkara Nagara"
//                 },
//                 {
//                     "value": "900425",
//                     "name": "आचार्य नगर 87 चक",
//                     "nameEn": "Aacharya Nagara 87 Chak"
//                 },
//                 {
//                     "value": "900431",
//                     "name": "आदर्श नगर मथुरा नगर जनता नगर कुशवाहा नगर कैलाश नगर रावतपुर",
//                     "nameEn": "Aadrsha Nagara Mathura Nagara Janata Nagara Kushavaha Nagara Kailasha Nagara Ravatapura"
//                 },
//                 {
//                     "value": "900411",
//                     "name": "आदर्श नगर मसवानपुर",
//                     "nameEn": "Aadrsha Nagara Masavanapura"
//                 },
//                 {
//                     "value": "900217",
//                     "name": "आवास विकास अमबेडकरपुरम",
//                     "nameEn": "Aavasa Vikasa Amabedakarapurama"
//                 },
//                 {
//                     "value": "900214",
//                     "name": "आवास विकास योजना 1 केशवपुरम",
//                     "nameEn": "Aavasa Vikasa Yojana 1 Keshavapurama"
//                 },
//                 {
//                     "value": "900215",
//                     "name": "आवास विकास योजना 3 पनकी कल्यानपुर रोड",
//                     "nameEn": "Aavasa Vikasa Yojana 3 Panakee Klyanapura Roda"
//                 },
//                 {
//                     "value": "150378",
//                     "name": "इटारा",
//                     "nameEn": "Itara"
//                 },
//                 {
//                     "value": "900645",
//                     "name": "इटारा",
//                     "nameEn": "Itara"
//                 },
//                 {
//                     "value": "900401",
//                     "name": "इन्‍डस्ट्रियल इस्‍टेट फजलगंज",
//                     "nameEn": "Indstriyala Isteta Phajalagnja"
//                 },
//                 {
//                     "value": "900271",
//                     "name": "इन्‍द्रपुरी 117 चक",
//                     "nameEn": "Indrapuree 117 Chak"
//                 },
//                 {
//                     "value": "900505",
//                     "name": "इस्‍पात नगर",
//                     "nameEn": "Ispata Nagara"
//                 },
//                 {
//                     "value": "900521",
//                     "name": "ई एस आई कालोनी",
//                     "nameEn": "Ee Esa Aaee Kalonee"
//                 },
//                 {
//                     "value": "900462",
//                     "name": "ई एस आई फण्‍ड कालोनी",
//                     "nameEn": "Ee Esa Aaee Phnda Kalonee"
//                 },
//                 {
//                     "value": "900344",
//                     "name": "उघोग नगर ए ब्‍लाक",
//                     "nameEn": "Ughoga Nagara E Blaka"
//                 },
//                 {
//                     "value": "900346",
//                     "name": "उघोग नगर बी ब्‍लाक",
//                     "nameEn": "Ughoga Nagara Bee Blaka"
//                 },
//                 {
//                     "value": "900348",
//                     "name": "उघ्‍ाोग नगर सी ब्‍लाक",
//                     "nameEn": "Ughaoga Nagara See Blaka"
//                 },
//                 {
//                     "value": "150376",
//                     "name": "उदयपुर",
//                     "nameEn": "Udayapura"
//                 },
//                 {
//                     "value": "900595",
//                     "name": "उदयपुर",
//                     "nameEn": "Udayapura"
//                 },
//                 {
//                     "value": "900450",
//                     "name": "एम पी उघोग मिल कैम्‍पस 117 चक",
//                     "nameEn": "Ema Pee Ughoga Mila Kaimpasa 117 Chak"
//                 },
//                 {
//                     "value": "150374",
//                     "name": "एेंती",
//                     "nameEn": "Eentee"
//                 },
//                 {
//                     "value": "900597",
//                     "name": "ऐती",
//                     "nameEn": "Aitee"
//                 },
//                 {
//                     "value": "900374",
//                     "name": "ओम नगर  119 चक",
//                     "nameEn": "Oma Nagara  119 Chak"
//                 },
//                 {
//                     "value": "900598",
//                     "name": "कठारा",
//                     "nameEn": "Kathara"
//                 },
//                 {
//                     "value": "150404",
//                     "name": "कठारा 1",
//                     "nameEn": "Kathara 1"
//                 },
//                 {
//                     "value": "220313",
//                     "name": "कठारा 2",
//                     "nameEn": "Kathara 2"
//                 },
//                 {
//                     "value": "220314",
//                     "name": "कठारा 3",
//                     "nameEn": "Kathara 3"
//                 },
//                 {
//                     "value": "900647",
//                     "name": "कठुई",
//                     "nameEn": "Kathuee"
//                 },
//                 {
//                     "value": "150425",
//                     "name": "कठुई",
//                     "nameEn": "Kathuee"
//                 },
//                 {
//                     "value": "150407",
//                     "name": "कठेरूआ",
//                     "nameEn": "Katherooaa"
//                 },
//                 {
//                     "value": "900606",
//                     "name": "कठेरूआ",
//                     "nameEn": "Katherooaa"
//                 },
//                 {
//                     "value": "150400",
//                     "name": "कडरी चम्पतपुर",
//                     "nameEn": "Kadaree Chmpatapura"
//                 },
//                 {
//                     "value": "900601",
//                     "name": "कड़री चम्‍पतपुर",
//                     "nameEn": "Karree Chmpatapura"
//                 },
//                 {
//                     "value": "220319",
//                     "name": "कपिली",
//                     "nameEn": "Kapilee"
//                 },
//                 {
//                     "value": "900393",
//                     "name": "कपिली के डी ए कालोनी व शताब्दी नगर  फेज 3",
//                     "nameEn": "Kapilee Ke Dee E Kalonee Va Shatabdee Nagara  Pheja 3"
//                 },
//                 {
//                     "value": "900391",
//                     "name": "कपिली गांव",
//                     "nameEn": "Kapilee Ganw"
//                 },
//                 {
//                     "value": "900395",
//                     "name": "कबाड़ी मार्केट122 123 चक",
//                     "nameEn": "Kabaree Marketa122 123 Chak"
//                 },
//                 {
//                     "value": "900441",
//                     "name": "कमला नगर",
//                     "nameEn": "Kamala Nagara"
//                 },
//                 {
//                     "value": "220316",
//                     "name": "कल्यानपुर कलाँ",
//                     "nameEn": "Klyanapura Kalan"
//                 },
//                 {
//                     "value": "900306",
//                     "name": "कल्‍यानपुर कलां",
//                     "nameEn": "Klyanapura Kalan"
//                 },
//                 {
//                     "value": "900304",
//                     "name": "कल्‍यानपुर खुर्द",
//                     "nameEn": "Klyanapura Khurd"
//                 },
//                 {
//                     "value": "220317",
//                     "name": "कल्यानपुर खुर्द",
//                     "nameEn": "Klyanapura Khurd"
//                 },
//                 {
//                     "value": "900324",
//                     "name": "कल्‍यानपुर सी व बी  ब्‍लाक",
//                     "nameEn": "Klyanapura See Va Bee  Blaka"
//                 },
//                 {
//                     "value": "900308",
//                     "name": "कश्‍यप नगर",
//                     "nameEn": "Kshyapa Nagara"
//                 },
//                 {
//                     "value": "900266",
//                     "name": "काकादेव अो ब्‍लाक ⁄ गीता नगर 117 चक",
//                     "nameEn": "Kakadeva Ao Blaka ⁄ Geeta Nagara 117 Chak"
//                 },
//                 {
//                     "value": "900240",
//                     "name": "काकादेव आर एस पुरम 117 चक",
//                     "nameEn": "Kakadeva Aara Esa Purama 117 Chak"
//                 },
//                 {
//                     "value": "900458",
//                     "name": "काकादेव एच एच1एच2 ब्‍लाक",
//                     "nameEn": "Kakadeva Echa Echa1echa2 Blaka"
//                 },
//                 {
//                     "value": "900246",
//                     "name": "काकादेव एन ब्‍लाक 117 चक",
//                     "nameEn": "Kakadeva Ena Blaka 117 Chak"
//                 },
//                 {
//                     "value": "900234",
//                     "name": "काकादेव एम ब्‍लाक 117 चक",
//                     "nameEn": "Kakadeva Ema Blaka 117 Chak"
//                 },
//                 {
//                     "value": "900244",
//                     "name": "काकादेव एल ब्‍लाक 117 चक",
//                     "nameEn": "Kakadeva Ela Blaka 117 Chak"
//                 },
//                 {
//                     "value": "900238",
//                     "name": "काकादेव के ब्‍लाक 117 चक",
//                     "nameEn": "Kakadeva Ke Blaka 117 Chak"
//                 },
//                 {
//                     "value": "900269",
//                     "name": "काकादेव क्‍यू ब्‍लाक 117 चक",
//                     "nameEn": "Kakadeva Kyoo Blaka 117 Chak"
//                 },
//                 {
//                     "value": "900220",
//                     "name": "काकादेव गांव 117",
//                     "nameEn": "Kakadeva Ganw 117"
//                 },
//                 {
//                     "value": "900236",
//                     "name": "काकादेव पी व पी 1  व पी 2 ब्‍लाक 117 चक",
//                     "nameEn": "Kakadeva Pee Va Pee 1  Va Pee 2 Blaka 117 Chak"
//                 },
//                 {
//                     "value": "150408",
//                     "name": "काकोरी",
//                     "nameEn": "Kakoree"
//                 },
//                 {
//                     "value": "900648",
//                     "name": "काकोरी",
//                     "nameEn": "Kakoree"
//                 },
//                 {
//                     "value": "900367",
//                     "name": "कारवालो नगर 84 व 86 चक",
//                     "nameEn": "Karavalo Nagara 84 Va 86 Chak"
//                 },
//                 {
//                     "value": "900608",
//                     "name": "किशनपुर मझावन",
//                     "nameEn": "Kishanapura Majhavana"
//                 },
//                 {
//                     "value": "150422",
//                     "name": "किशुनपुर मझावन",
//                     "nameEn": "Kishunapura Majhavana"
//                 },
//                 {
//                     "value": "900602",
//                     "name": "कीरतपुर",
//                     "nameEn": "Keeratapura"
//                 },
//                 {
//                     "value": "150380",
//                     "name": "कीरतपुर",
//                     "nameEn": "Keeratapura"
//                 },
//                 {
//                     "value": "900543",
//                     "name": "कुरौना बहादुर नगर",
//                     "nameEn": "Kurauna Bahadura Nagara"
//                 },
//                 {
//                     "value": "150393",
//                     "name": "कुरौना बहादुर नगर",
//                     "nameEn": "Kurauna Bahadura Nagara"
//                 },
//                 {
//                     "value": "900605",
//                     "name": "कुल्‍हौली",
//                     "nameEn": "Kulhaulee"
//                 },
//                 {
//                     "value": "150462",
//                     "name": "कुल्हौली",
//                     "nameEn": "Kulhaulee"
//                 },
//                 {
//                     "value": "900544",
//                     "name": "कैंधा",
//                     "nameEn": "Kaindha"
//                 },
//                 {
//                     "value": "150362",
//                     "name": "कैंधा",
//                     "nameEn": "Kaindha"
//                 },
//                 {
//                     "value": "900330",
//                     "name": "कौशलपुरी 118 चक व गुमटी न 5",
//                     "nameEn": "Kaushalapuree 118 Chak Va Gumatee Na 5"
//                 },
//                 {
//                     "value": "150405",
//                     "name": "खड़ेसर",
//                     "nameEn": "Kharesara"
//                 },
//                 {
//                     "value": "900610",
//                     "name": "खड़ेसर",
//                     "nameEn": "Kharesara"
//                 },
//                 {
//                     "value": "150423",
//                     "name": "खेरसा",
//                     "nameEn": "Kherasa"
//                 },
//                 {
//                     "value": "900546",
//                     "name": "खेरसा",
//                     "nameEn": "Kherasa"
//                 },
//                 {
//                     "value": "900405",
//                     "name": "गड़रियनपुरवा 123 चक",
//                     "nameEn": "Garriyanapurava 123 Chak"
//                 },
//                 {
//                     "value": "150421",
//                     "name": "गढेवा मझावन",
//                     "nameEn": "Gadheva Majhavana"
//                 },
//                 {
//                     "value": "900548",
//                     "name": "गढ़ेवा मझावन",
//                     "nameEn": "Garheva Majhavana"
//                 },
//                 {
//                     "value": "900550",
//                     "name": "गढ़ेवा मोहसनपुर",
//                     "nameEn": "Garheva Mohasanapura"
//                 },
//                 {
//                     "value": "150395",
//                     "name": "गढेवा मोहसिंनपुर",
//                     "nameEn": "Gadheva Mohasinnapura"
//                 },
//                 {
//                     "value": "900386",
//                     "name": "गम्‍भीरपुर",
//                     "nameEn": "Gmbheerapura"
//                 },
//                 {
//                     "value": "900554",
//                     "name": "गम्‍भीरपुर दक्षिण",
//                     "nameEn": "Gmbheerapura Dakshina"
//                 },
//                 {
//                     "value": "150384",
//                     "name": "गम्भीरपुर दक्षिण",
//                     "nameEn": "Gmbheerapura Dakshina"
//                 },
//                 {
//                     "value": "900310",
//                     "name": "गायत्रीपुरम",
//                     "nameEn": "Gayatreepurama"
//                 },
//                 {
//                     "value": "150360",
//                     "name": "गोपालपुर",
//                     "nameEn": "Gopalapura"
//                 },
//                 {
//                     "value": "900552",
//                     "name": "गोपालपुर",
//                     "nameEn": "Gopalapura"
//                 },
//                 {
//                     "value": "900336",
//                     "name": "गोविन्‍द नगर 124 चक‚ ब्लाक ए बी सी डी ई एम के वी एन  10  ब्लाक तथा 1 से 7 ब्‍लाक तथा 11 12 व 13 ब्‍लाक",
//                     "nameEn": "Govinda Nagara 124 Chak‚ Blaka E Bee See Dee Ee Ema Ke Vee Ena  10  Blaka Tatha 1 Se 7 Blaka Tatha 11 12 Va 13 Blaka"
//                 },
//                 {
//                     "value": "900358",
//                     "name": "गोविन्‍द नगर 125 चक‚ व लाल क्वार्टर 125 चक व 7 8 9 10 एवं एच आई जे आर एस टी क्‍यू एल ओ यू ब्‍लाक व अन्‍य शेष",
//                     "nameEn": "Govinda Nagara 125 Chak‚ Va Lala Kvartara 125 Chak Va 7 8 9 10 Evn Echa Aaee Je Aara Esa Tee Kyoo Ela O Yoo Blaka Va Anya Shesha"
//                 },
//                 {
//                     "value": "900377",
//                     "name": "गोविन्‍द नगर 126 चक‚ यूं एफ जी एच आई जे आर एस टी पी वी क्यू व 13 ब्‍लाक",
//                     "nameEn": "Govinda Nagara 126 Chak‚ Yoon Epha Jee Echa Aaee Je Aara Esa Tee Pee Vee Kyoo Va 13 Blaka"
//                 },
//                 {
//                     "value": "150402",
//                     "name": "गोसरा",
//                     "nameEn": "Gosara"
//                 },
//                 {
//                     "value": "900612",
//                     "name": "गोसरा",
//                     "nameEn": "Gosara"
//                 },
//                 {
//                     "value": "900314",
//                     "name": "गौतम विहार शिवली रोड",
//                     "nameEn": "Gautama Vihara Shivalee Roda"
//                 },
//                 {
//                     "value": "900615",
//                     "name": "चक कुल्‍हौली",
//                     "nameEn": "Chak Kulhaulee"
//                 },
//                 {
//                     "value": "150463",
//                     "name": "चक कुल्हौली",
//                     "nameEn": "Chak Kulhaulee"
//                 },
//                 {
//                     "value": "900321",
//                     "name": "चमारनपुरवा",
//                     "nameEn": "Chamaranapurava"
//                 },
//                 {
//                     "value": "150411",
//                     "name": "चौराई",
//                     "nameEn": "Chauraee"
//                 },
//                 {
//                     "value": "900617",
//                     "name": "चौराई",
//                     "nameEn": "Chauraee"
//                 },
//                 {
//                     "value": "900446",
//                     "name": "छोटा लखनपुर 114 चक",
//                     "nameEn": "Chhota Lakhanapura 114 Chak"
//                 },
//                 {
//                     "value": "150413",
//                     "name": "छौकी",
//                     "nameEn": "Chhaukee"
//                 },
//                 {
//                     "value": "900620",
//                     "name": "छौंकी",
//                     "nameEn": "Chhaunkee"
//                 },
//                 {
//                     "value": "150453",
//                     "name": "जगदीशपुर",
//                     "nameEn": "Jagadeeshapura"
//                 },
//                 {
//                     "value": "900555",
//                     "name": "जगदीशपुर",
//                     "nameEn": "Jagadeeshapura"
//                 },
//                 {
//                     "value": "900649",
//                     "name": "जमरेही",
//                     "nameEn": "Jamarehee"
//                 },
//                 {
//                     "value": "150398",
//                     "name": "जमरेही",
//                     "nameEn": "Jamarehee"
//                 },
//                 {
//                     "value": "220336",
//                     "name": "जमुई",
//                     "nameEn": "Jamuee"
//                 },
//                 {
//                     "value": "900515",
//                     "name": "जमूई",
//                     "nameEn": "Jamooee"
//                 },
//                 {
//                     "value": "900368",
//                     "name": "जरीब चौकी 84 चक",
//                     "nameEn": "Jareeba Chaukee 84 Chak"
//                 },
//                 {
//                     "value": "900383",
//                     "name": "जवाहरपुरम ग्रीन सिटी",
//                     "nameEn": "Javaharapurama Greena Sitee"
//                 },
//                 {
//                     "value": "900856",
//                     "name": "जहानपुर",
//                     "nameEn": "Jahanapura"
//                 },
//                 {
//                     "value": "150427",
//                     "name": "जहाँनपुर",
//                     "nameEn": "Jahannapura"
//                 },
//                 {
//                     "value": "150390",
//                     "name": "जादौपुर",
//                     "nameEn": "Jadaupura"
//                 },
//                 {
//                     "value": "900650",
//                     "name": "जादौपुर",
//                     "nameEn": "Jadaupura"
//                 },
//                 {
//                     "value": "150391",
//                     "name": "जामू",
//                     "nameEn": "Jamoo"
//                 },
//                 {
//                     "value": "900558",
//                     "name": "जामू",
//                     "nameEn": "Jamoo"
//                 },
//                 {
//                     "value": "220338",
//                     "name": "जूही खुर्द",
//                     "nameEn": "Joohee Khurd"
//                 },
//                 {
//                     "value": "900362",
//                     "name": "जूही खुर्द 83ए",
//                     "nameEn": "Joohee Khurd 83e"
//                 },
//                 {
//                     "value": "900359",
//                     "name": "जूही खुर्द 83 व 83 ए",
//                     "nameEn": "Joohee Khurd 83 Va 83 E"
//                 },
//                 {
//                     "value": "900370",
//                     "name": "झकरकटी 84 चक",
//                     "nameEn": "Jhakarakatee 84 Chak"
//                 },
//                 {
//                     "value": "900519",
//                     "name": "टेलीफोन कालोनी",
//                     "nameEn": "Teleephona Kalonee"
//                 },
//                 {
//                     "value": "900561",
//                     "name": "डांडे का पुरवा",
//                     "nameEn": "Dande Ka Purava"
//                 },
//                 {
//                     "value": "150394",
//                     "name": "डांडे का पुरवा",
//                     "nameEn": "Dande Ka Purava"
//                 },
//                 {
//                     "value": "900464",
//                     "name": "डीआई आफिस कालोनी",
//                     "nameEn": "Deeaaee Aaphisa Kalonee"
//                 },
//                 {
//                     "value": "150399",
//                     "name": "ढरहरा",
//                     "nameEn": "Dharahara"
//                 },
//                 {
//                     "value": "900623",
//                     "name": "ढरहरा",
//                     "nameEn": "Dharahara"
//                 },
//                 {
//                     "value": "900622",
//                     "name": "ढोढर",
//                     "nameEn": "Dhodhara"
//                 },
//                 {
//                     "value": "150371",
//                     "name": "ढोढर",
//                     "nameEn": "Dhodhara"
//                 },
//                 {
//                     "value": "900651",
//                     "name": "तकसीमपुर",
//                     "nameEn": "Takaseemapura"
//                 },
//                 {
//                     "value": "150460",
//                     "name": "तकसीमपुर",
//                     "nameEn": "Takaseemapura"
//                 },
//                 {
//                     "value": "900250",
//                     "name": "तुलसी नगर काकादेव 117 चक",
//                     "nameEn": "Tulasee Nagara Kakadeva 117 Chak"
//                 },
//                 {
//                     "value": "900332",
//                     "name": "दर्शनपुरवा 119   118 चक",
//                     "nameEn": "Drshanapurava 119   118 Chak"
//                 },
//                 {
//                     "value": "900652",
//                     "name": "दलेलपुर",
//                     "nameEn": "Dalelapura"
//                 },
//                 {
//                     "value": "150409",
//                     "name": "दलेलपुर",
//                     "nameEn": "Dalelapura"
//                 },
//                 {
//                     "value": "900624",
//                     "name": "दहेली उजागर",
//                     "nameEn": "Dahelee Ujagara"
//                 },
//                 {
//                     "value": "150401",
//                     "name": "दहेली उजागर",
//                     "nameEn": "Dahelee Ujagara"
//                 },
//                 {
//                     "value": "900343",
//                     "name": "दादा नगर",
//                     "nameEn": "Dada Nagara"
//                 },
//                 {
//                     "value": "150397",
//                     "name": "दुर्जनपुर",
//                     "nameEn": "Durjanapura"
//                 },
//                 {
//                     "value": "900654",
//                     "name": "दुर्जनपुर",
//                     "nameEn": "Durjanapura"
//                 },
//                 {
//                     "value": "900293",
//                     "name": "देवी सहाय नगर पुरानी व नई बस्‍ती",
//                     "nameEn": "Devee Sahaya Nagara Puranee Va Naee Bstee"
//                 },
//                 {
//                     "value": "900417",
//                     "name": "दौलतपुर",
//                     "nameEn": "Daulatapura"
//                 },
//                 {
//                     "value": "220347",
//                     "name": "दौलतपुर उर्फ धामीखेड",
//                     "nameEn": "Daulatapura Urpha Dhameekheda"
//                 },
//                 {
//                     "value": "900414",
//                     "name": "धामीखेड़ा",
//                     "nameEn": "Dhameekhera"
//                 },
//                 {
//                     "value": "900439",
//                     "name": "नरायनपुरवा 120 चक",
//                     "nameEn": "Narayanapurava 120 Chak"
//                 },
//                 {
//                     "value": "900255",
//                     "name": "नवीन नगर 117 चक",
//                     "nameEn": "Naveena Nagara 117 Chak"
//                 },
//                 {
//                     "value": "900373",
//                     "name": "नसीमाबाद  119 चक",
//                     "nameEn": "Naseemabada  119 Chak"
//                 },
//                 {
//                     "value": "900274",
//                     "name": "नानकारी",
//                     "nameEn": "Nanakaree"
//                 },
//                 {
//                     "value": "900627",
//                     "name": "नूरपुर",
//                     "nameEn": "Noorapura"
//                 },
//                 {
//                     "value": "150459",
//                     "name": "नूरपुर उर्फ लालपुर",
//                     "nameEn": "Noorapura Urpha Lalapura"
//                 },
//                 {
//                     "value": "900501",
//                     "name": "नोनियनपुरवा",
//                     "nameEn": "Noniyanapurava"
//                 },
//                 {
//                     "value": "220351",
//                     "name": "नौरइयाखेड़ा",
//                     "nameEn": "Nauraiyakhera"
//                 },
//                 {
//                     "value": "900513",
//                     "name": "नौरैयाखेड़ा",
//                     "nameEn": "Nauraiyakhera"
//                 },
//                 {
//                     "value": "900508",
//                     "name": "न्‍यू ट्रान्‍सपोर्ट नगर",
//                     "nameEn": "Nyoo Transaporta Nagara"
//                 },
//                 {
//                     "value": "150357",
//                     "name": "पतरसा",
//                     "nameEn": "Patarasa"
//                 },
//                 {
//                     "value": "900656",
//                     "name": "पतरसा",
//                     "nameEn": "Patarasa"
//                 },
//                 {
//                     "value": "900658",
//                     "name": "पतेहुरी",
//                     "nameEn": "Patehuree"
//                 },
//                 {
//                     "value": "150385",
//                     "name": "पत्तेहुरी",
//                     "nameEn": "Pttehuree"
//                 },
//                 {
//                     "value": "900490",
//                     "name": "पनकी इं एरिया साइट  1 व उघोग कुंज",
//                     "nameEn": "Panakee In Eriya Saita  1 Va Ughoga Kunja"
//                 },
//                 {
//                     "value": "900477",
//                     "name": "पनकी ए बी सी डी व अन्‍य समस्‍त ब्‍लाक",
//                     "nameEn": "Panakee E Bee See Dee Va Anya Samsta Blaka"
//                 },
//                 {
//                     "value": "900378",
//                     "name": "पनकी कटरा",
//                     "nameEn": "Panakee Katara"
//                 },
//                 {
//                     "value": "900381",
//                     "name": "पनकी कलां",
//                     "nameEn": "Panakee Kalan"
//                 },
//                 {
//                     "value": "220353",
//                     "name": "पनकीगंगागंज",
//                     "nameEn": "Panakeegngagnja"
//                 },
//                 {
//                     "value": "900380",
//                     "name": "पनकी गंगागंज व शताब्दी नगर फेज 4 व 5 मन्दाकिनी इन्क्लेव",
//                     "nameEn": "Panakee Gngagnja Va Shatabdee Nagara Pheja 4 Va 5 Mndakinee Inkleva"
//                 },
//                 {
//                     "value": "220352",
//                     "name": "पनकी भौसिंह",
//                     "nameEn": "Panakee Bhausinha"
//                 },
//                 {
//                     "value": "900503",
//                     "name": "पनकी भौंसिंह व कालपी नगर व कालिंद्री नगर",
//                     "nameEn": "Panakee Bhaunsinha Va Kalapee Nagara Va Kalindree Nagara"
//                 },
//                 {
//                     "value": "900361",
//                     "name": "परमपुरवा 83 चक",
//                     "nameEn": "Paramapurava 83 Chak"
//                 },
//                 {
//                     "value": "900628",
//                     "name": "पलरा",
//                     "nameEn": "Palara"
//                 },
//                 {
//                     "value": "150372",
//                     "name": "पलरा",
//                     "nameEn": "Palara"
//                 },
//                 {
//                     "value": "900457",
//                     "name": "पाण्‍डु नगर 117 चक",
//                     "nameEn": "Pandu Nagara 117 Chak"
//                 },
//                 {
//                     "value": "900562",
//                     "name": "पिपौरी",
//                     "nameEn": "Pipauree"
//                 },
//                 {
//                     "value": "150383",
//                     "name": "पिपौरी",
//                     "nameEn": "Pipauree"
//                 },
//                 {
//                     "value": "900403",
//                     "name": "पी टी ब्‍लाक फजलगंज",
//                     "nameEn": "Pee Tee Blaka Phajalagnja"
//                 },
//                 {
//                     "value": "220355",
//                     "name": "पुरवा नानकारी",
//                     "nameEn": "Purava Nanakaree"
//                 },
//                 {
//                     "value": "900283",
//                     "name": "पुरवा नानकारी",
//                     "nameEn": "Purava Nanakaree"
//                 },
//                 {
//                     "value": "900397",
//                     "name": "प्रतापगंज",
//                     "nameEn": "Pratapagnja"
//                 },
//                 {
//                     "value": "900388",
//                     "name": "प्रतापपुर",
//                     "nameEn": "Pratapapura"
//                 },
//                 {
//                     "value": "900564",
//                     "name": "प्रतापपुर मजरा रामपुर",
//                     "nameEn": "Pratapapura Majara Ramapura"
//                 },
//                 {
//                     "value": "150358",
//                     "name": "प्रतापपुर मजरारामपुर",
//                     "nameEn": "Pratapapura Majararamapura"
//                 },
//                 {
//                     "value": "901098",
//                     "name": "प्रह्लाद्पुरवा 117 चक",
//                     "nameEn": "Prhladpurava 117 Chak"
//                 },
//                 {
//                     "value": "900396",
//                     "name": "फजलगंज 122 व 123 चक",
//                     "nameEn": "Phajalagnja 122 Va 123 Chak"
//                 },
//                 {
//                     "value": "900371",
//                     "name": "फजलगंज 84 चक",
//                     "nameEn": "Phajalagnja 84 Chak"
//                 },
//                 {
//                     "value": "900567",
//                     "name": "फत्‍तेपुर दक्षिण",
//                     "nameEn": "Phttepura Dakshina"
//                 },
//                 {
//                     "value": "220359",
//                     "name": "फत्तेपुर दक्षिण",
//                     "nameEn": "Phttepura Dakshina"
//                 },
//                 {
//                     "value": "900402",
//                     "name": "फैक्‍ट्री एरिया 123 चक",
//                     "nameEn": "Phaiktree Eriya 123 Chak"
//                 },
//                 {
//                     "value": "900400",
//                     "name": "फैक्‍ट्री एरिया फजलगंज",
//                     "nameEn": "Phaiktree Eriya Phajalagnja"
//                 },
//                 {
//                     "value": "900631",
//                     "name": "बकौली",
//                     "nameEn": "Bakaulee"
//                 },
//                 {
//                     "value": "150403",
//                     "name": "बकौली",
//                     "nameEn": "Bakaulee"
//                 },
//                 {
//                     "value": "900337",
//                     "name": "बंगाली कालोनी",
//                     "nameEn": "Bngalee Kalonee"
//                 },
//                 {
//                     "value": "900498",
//                     "name": "बदुआपुर",
//                     "nameEn": "Baduaapura"
//                 },
//                 {
//                     "value": "900375",
//                     "name": "बम्‍बा रोड 119 चक",
//                     "nameEn": "Bmba Roda 119 Chak"
//                 },
//                 {
//                     "value": "900496",
//                     "name": "बरगदियापुरवा",
//                     "nameEn": "Baragadiyapurava"
//                 },
//                 {
//                     "value": "900366",
//                     "name": "बसन्‍ती नगर 83 चक",
//                     "nameEn": "Basntee Nagara 83 Chak"
//                 },
//                 {
//                     "value": "150432",
//                     "name": "बाजपुर",
//                     "nameEn": "Bajapura"
//                 },
//                 {
//                     "value": "900659",
//                     "name": "बाजपुर",
//                     "nameEn": "Bajapura"
//                 },
//                 {
//                     "value": "220366",
//                     "name": "बारा सिरोही",
//                     "nameEn": "Bara Sirohee"
//                 },
//                 {
//                     "value": "900287",
//                     "name": "बारासिरोही",
//                     "nameEn": "Barasirohee"
//                 },
//                 {
//                     "value": "900569",
//                     "name": "बिधनू",
//                     "nameEn": "Bidhanoo"
//                 },
//                 {
//                     "value": "150419",
//                     "name": "बिधनू",
//                     "nameEn": "Bidhanoo"
//                 },
//                 {
//                     "value": "900570",
//                     "name": "बिनौर",
//                     "nameEn": "Binaura"
//                 },
//                 {
//                     "value": "220386",
//                     "name": "बिनौर द्वितीय",
//                     "nameEn": "Binaura Dviteeya"
//                 },
//                 {
//                     "value": "220387",
//                     "name": "बिनौर प्रथम",
//                     "nameEn": "Binaura Prathama"
//                 },
//                 {
//                     "value": "900338",
//                     "name": "बी एम मार्केट 83 च 124 चक",
//                     "nameEn": "Bee Ema Marketa 83 Cha 124 Chak"
//                 },
//                 {
//                     "value": "150415",
//                     "name": "बीछी गाँव",
//                     "nameEn": "Beechhee Ganw"
//                 },
//                 {
//                     "value": "900634",
//                     "name": "बीछीगांव",
//                     "nameEn": "BeechheeGanw"
//                 },
//                 {
//                     "value": "900389",
//                     "name": "भटठा एरिया रानीगंज",
//                     "nameEn": "Bhatatha Eriya Raneegnja"
//                 },
//                 {
//                     "value": "900422",
//                     "name": "भन्‍नानापुरवा 87 चक",
//                     "nameEn": "Bhnnanapurava 87 Chak"
//                 },
//                 {
//                     "value": "900385",
//                     "name": "भवानीपुर",
//                     "nameEn": "Bhavaneepura"
//                 },
//                 {
//                     "value": "150377",
//                     "name": "भैरमपुर",
//                     "nameEn": "Bhairamapura"
//                 },
//                 {
//                     "value": "900572",
//                     "name": "भैरमपुर",
//                     "nameEn": "Bhairamapura"
//                 },
//                 {
//                     "value": "900575",
//                     "name": "मगरासा",
//                     "nameEn": "Magarasa"
//                 },
//                 {
//                     "value": "150429",
//                     "name": "मगरासा",
//                     "nameEn": "Magarasa"
//                 },
//                 {
//                     "value": "900473",
//                     "name": "मतैयापुरवा",
//                     "nameEn": "Mataiyapurava"
//                 },
//                 {
//                     "value": "150382",
//                     "name": "मरदनपुर",
//                     "nameEn": "Maradanapura"
//                 },
//                 {
//                     "value": "900573",
//                     "name": "मर्दनपुर",
//                     "nameEn": "Mrdanapura"
//                 },
//                 {
//                     "value": "900351",
//                     "name": "मलिन बस्‍ती व हरिजन बस्ती",
//                     "nameEn": "Malina Bstee Va Harijana Bstee"
//                 },
//                 {
//                     "value": "900407",
//                     "name": "मसवानपुर",
//                     "nameEn": "Masavanapura"
//                 },
//                 {
//                     "value": "900410",
//                     "name": "मसवानपुर नई बस्‍ती",
//                     "nameEn": "Masavanapura Naee Bstee"
//                 },
//                 {
//                     "value": "900327",
//                     "name": "महाबलीपुरम एलआईजी एमआईजी 1 एमआईजी 2 मिनी एलआईजी",
//                     "nameEn": "Mahabaleepurama Elaaaeejee Emaaaeejee 1 Emaaaeejee 2 Minee Elaaaeejee"
//                 },
//                 {
//                     "value": "900455",
//                     "name": "माडल टाउन 117 चक",
//                     "nameEn": "Madala Tauna 117 Chak"
//                 },
//                 {
//                     "value": "220388",
//                     "name": "मिजर्ापुर",
//                     "nameEn": "Mijrapura"
//                 },
//                 {
//                     "value": "900289",
//                     "name": "मिर्जापुर",
//                     "nameEn": "Mirjapura"
//                 },
//                 {
//                     "value": "900576",
//                     "name": "मेहरबान सिंह का पुरवा",
//                     "nameEn": "Meharabana Sinha Ka Purava"
//                 },
//                 {
//                     "value": "150381",
//                     "name": "मेहरबानसिंह का पुरवा",
//                     "nameEn": "Meharabanasinha Ka Purava"
//                 },
//                 {
//                     "value": "900221",
//                     "name": "मोमिन नगर 117 चक",
//                     "nameEn": "Momina Nagara 117 Chak"
//                 },
//                 {
//                     "value": "900408",
//                     "name": "मोहसिनपुर",
//                     "nameEn": "Mohasinapura"
//                 },
//                 {
//                     "value": "220371",
//                     "name": "मोहसिनपुर",
//                     "nameEn": "Mohasinapura"
//                 },
//                 {
//                     "value": "900436",
//                     "name": "रंजीत नगर 120 चक",
//                     "nameEn": "Rnjeeta Nagara 120 Chak"
//                 },
//                 {
//                     "value": "900382",
//                     "name": "रतनपुर व शताब्दी नगर फेज 1 व 2",
//                     "nameEn": "Ratanapura Va Shatabdee Nagara Pheja 1 Va 2"
//                 },
//                 {
//                     "value": "900349",
//                     "name": "राखी मण्‍डी",
//                     "nameEn": "Rakhee Mndee"
//                 },
//                 {
//                     "value": "900231",
//                     "name": "राजीव नगर 117 चक",
//                     "nameEn": "Rajeeva Nagara 117 Chak"
//                 },
//                 {
//                     "value": "900222",
//                     "name": "राणा प्रताप नगर 117 चक",
//                     "nameEn": "Rana Pratapa Nagara 117 Chak"
//                 },
//                 {
//                     "value": "900252",
//                     "name": "रानीगंज  117  चक",
//                     "nameEn": "Raneegnja  117  Chak"
//                 },
//                 {
//                     "value": "900857",
//                     "name": "राम खेड़ा",
//                     "nameEn": "Rama Khera"
//                 },
//                 {
//                     "value": "150410",
//                     "name": "रामखेड़ा",
//                     "nameEn": "Ramakhera"
//                 },
//                 {
//                     "value": "900580",
//                     "name": "रामपुर खास",
//                     "nameEn": "Ramapura Khasa"
//                 },
//                 {
//                     "value": "150361",
//                     "name": "रामपुर खास",
//                     "nameEn": "Ramapura Khasa"
//                 },
//                 {
//                     "value": "900434",
//                     "name": "रामलला रोड रावतपुर 116 चक",
//                     "nameEn": "Ramalala Roda Ravatapura 116 Chak"
//                 },
//                 {
//                     "value": "150373",
//                     "name": "रायपुर कठार",
//                     "nameEn": "Rayapura Kathara"
//                 },
//                 {
//                     "value": "900635",
//                     "name": "रायपुर कठार",
//                     "nameEn": "Rayapura Kathara"
//                 },
//                 {
//                     "value": "900423",
//                     "name": "रायपुरवा ⁄ देवनगर ⁄ हीरागंज 86 चक",
//                     "nameEn": "Rayapurava ⁄ Devanagara ⁄ Heeragnja 86 Chak"
//                 },
//                 {
//                     "value": "220372",
//                     "name": "रावतपुर",
//                     "nameEn": "Ravatapura"
//                 },
//                 {
//                     "value": "900427",
//                     "name": "रावतपुर 115 व 116 चक",
//                     "nameEn": "Ravatapura 115 Va 116 Chak"
//                 },
//                 {
//                     "value": "900429",
//                     "name": "रोशन नगर",
//                     "nameEn": "Roshana Nagara"
//                 },
//                 {
//                     "value": "900578",
//                     "name": "रौतारा",
//                     "nameEn": "Rautara"
//                 },
//                 {
//                     "value": "150428",
//                     "name": "रौतारा",
//                     "nameEn": "Rautara"
//                 },
//                 {
//                     "value": "900522",
//                     "name": "लक्ष्‍मी रतन का हाता",
//                     "nameEn": "Laksh्mee Ratana Ka Hata"
//                 },
//                 {
//                     "value": "900448",
//                     "name": "लखनपुर दक्षिण 114 चक",
//                     "nameEn": "Lakhanapura Dakshina 114 Chak"
//                 },
//                 {
//                     "value": "900435",
//                     "name": "लाजपत नगर 120 चक",
//                     "nameEn": "Lajapata Nagara 120 Chak"
//                 },
//                 {
//                     "value": "900636",
//                     "name": "लाल्‍हेपुर",
//                     "nameEn": "Lalhepura"
//                 },
//                 {
//                     "value": "150375",
//                     "name": "लाल्हेपुर",
//                     "nameEn": "Lalhepura"
//                 },
//                 {
//                     "value": "900353",
//                     "name": "विघार्थी मार्केट 126 चक",
//                     "nameEn": "Vigharthee Marketa 126 Chak"
//                 },
//                 {
//                     "value": "900449",
//                     "name": "विजय नगर 121 चक",
//                     "nameEn": "Vijaya Nagara 121 Chak"
//                 },
//                 {
//                     "value": "900341",
//                     "name": "विधवा र्क्‍वाटर",
//                     "nameEn": "Vidhava Rkvatara"
//                 },
//                 {
//                     "value": "220391",
//                     "name": "विनायकपुर",
//                     "nameEn": "Vinayakapura"
//                 },
//                 {
//                     "value": "900444",
//                     "name": "विनायकपुर  114  117 चक",
//                     "nameEn": "Vinayakapura  114  117 Chak"
//                 },
//                 {
//                     "value": "900443",
//                     "name": "विनायकपुर 114 चक",
//                     "nameEn": "Vinayakapura 114 Chak"
//                 },
//                 {
//                     "value": "900340",
//                     "name": "विवेकानन्‍द नगर",
//                     "nameEn": "Vivekannda Nagara"
//                 },
//                 {
//                     "value": "900509",
//                     "name": "व्‍यापार नगर",
//                     "nameEn": "Vyapara Nagara"
//                 },
//                 {
//                     "value": "900637",
//                     "name": "शम्‍भुआ",
//                     "nameEn": "Shmbhuaa"
//                 },
//                 {
//                     "value": "150406",
//                     "name": "शम्भुआ 1",
//                     "nameEn": "Shmbhuaa 1"
//                 },
//                 {
//                     "value": "220376",
//                     "name": "शम्भुआ 2",
//                     "nameEn": "Shmbhuaa 2"
//                 },
//                 {
//                     "value": "900854",
//                     "name": "शारदा नगर 117 चक",
//                     "nameEn": "Sharada Nagara 117 Chak"
//                 },
//                 {
//                     "value": "900481",
//                     "name": "शाहपुर",
//                     "nameEn": "Shahpur"
//                 },
//                 {
//                     "value": "900413",
//                     "name": "शिव नगर",
//                     "nameEn": "Shiva Nagara"
//                 },
//                 {
//                     "value": "900661",
//                     "name": "शिवरामपुर",
//                     "nameEn": "Shivaramapura"
//                 },
//                 {
//                     "value": "150418",
//                     "name": "शिवरामपुर",
//                     "nameEn": "Shivaramapura"
//                 },
//                 {
//                     "value": "900316",
//                     "name": "शिवली रोड कल्‍यानपुर",
//                     "nameEn": "Shivalee Roda Klyanapura"
//                 },
//                 {
//                     "value": "900438",
//                     "name": "शिवाजी नगर 120 चक",
//                     "nameEn": "Shivajee Nagara 120 Chak"
//                 },
//                 {
//                     "value": "900460",
//                     "name": "श्रम निदेशालय कालोनी",
//                     "nameEn": "Shrama Nideshalaya Kalonee"
//                 },
//                 {
//                     "value": "900638",
//                     "name": "सपई",
//                     "nameEn": "Sapaee"
//                 },
//                 {
//                     "value": "150379",
//                     "name": "सपई",
//                     "nameEn": "Sapaee"
//                 },
//                 {
//                     "value": "150426",
//                     "name": "सरनैतपुर",
//                     "nameEn": "Saranaitapura"
//                 },
//                 {
//                     "value": "900666",
//                     "name": "सरनैतपुर सरनैकपुर",
//                     "nameEn": "Saranaitapura Saranaikapura"
//                 },
//                 {
//                     "value": "900493",
//                     "name": "सरायमीता",
//                     "nameEn": "Sarayameeta"
//                 },
//                 {
//                     "value": "900399",
//                     "name": "सरेश बाग 123 चक",
//                     "nameEn": "Saresha Baga 123 Chak"
//                 },
//                 {
//                     "value": "900472",
//                     "name": "सरोजनी नगर 122 चक",
//                     "nameEn": "Sarojanee Nagara 122 Chak"
//                 },
//                 {
//                     "value": "900454",
//                     "name": "सर्वोदय नगर एच ब्‍लाक 117 चक",
//                     "nameEn": "Srvodaya Nagara Echa Blaka 117 Chak"
//                 },
//                 {
//                     "value": "900452",
//                     "name": "सर्वोदय नगर सी ब्‍लाक 117 चक",
//                     "nameEn": "Srvodaya Nagara See Blaka 117 Chak"
//                 },
//                 {
//                     "value": "900415",
//                     "name": "सहकार नगर",
//                     "nameEn": "Sahakara Nagara"
//                 },
//                 {
//                     "value": "900526",
//                     "name": "सिन्‍धी कालोनी",
//                     "nameEn": "Sindhee Kalonee"
//                 },
//                 {
//                     "value": "150359",
//                     "name": "सिंहपुर कठार",
//                     "nameEn": "Sinhapura Kathara"
//                 },
//                 {
//                     "value": "900590",
//                     "name": "सिंहपुर कठार",
//                     "nameEn": "Sinhapura Kathara"
//                 },
//                 {
//                     "value": "150389",
//                     "name": "सीढी",
//                     "nameEn": "Seedhee"
//                 },
//                 {
//                     "value": "900584",
//                     "name": "सीढ़ी",
//                     "nameEn": "Seerhee"
//                 },
//                 {
//                     "value": "900480",
//                     "name": "सुजानपुर",
//                     "nameEn": "Sujanapura"
//                 },
//                 {
//                     "value": "900432",
//                     "name": "सुरेन्‍द्र नगर",
//                     "nameEn": "Surendra Nagara"
//                 },
//                 {
//                     "value": "900586",
//                     "name": "सुरौली",
//                     "nameEn": "Suraulee"
//                 },
//                 {
//                     "value": "150416",
//                     "name": "सुरौली",
//                     "nameEn": "Suraulee"
//                 },
//                 {
//                     "value": "900640",
//                     "name": "सुल्‍तानपुर",
//                     "nameEn": "Sultanapura"
//                 },
//                 {
//                     "value": "150414",
//                     "name": "सुल्तानपुर",
//                     "nameEn": "Sultanapura"
//                 },
//                 {
//                     "value": "900663",
//                     "name": "सेंगरापुर",
//                     "nameEn": "Sengarapura"
//                 },
//                 {
//                     "value": "150461",
//                     "name": "सेंगरापुर",
//                     "nameEn": "Sengarapura"
//                 },
//                 {
//                     "value": "150386",
//                     "name": "सेन पश्चिम पारा",
//                     "nameEn": "Sena Pshchima Para"
//                 },
//                 {
//                     "value": "900583",
//                     "name": "सेन पश्चिमपारा",
//                     "nameEn": "Sena Pshchimapara"
//                 },
//                 {
//                     "value": "150388",
//                     "name": "सेन पूरब पारा",
//                     "nameEn": "Sena Pooraba Para"
//                 },
//                 {
//                     "value": "900582",
//                     "name": "सेन पूरबपारा",
//                     "nameEn": "Sena Poorabapara"
//                 },
//                 {
//                     "value": "900352",
//                     "name": "सेवाग्राम कालोनी व लोहिया नगर कॉलोनी 124 चक",
//                     "nameEn": "Sevagrama Kalonee Va Lohiya Nagara Kaolonee 124 Chak"
//                 },
//                 {
//                     "value": "900428",
//                     "name": "सैययद नगर",
//                     "nameEn": "Saiyayada Nagara"
//                 },
//                 {
//                     "value": "900662",
//                     "name": "सैंया गोझा",
//                     "nameEn": "Sainya Gojha"
//                 },
//                 {
//                     "value": "150392",
//                     "name": "सैंया गौझा",
//                     "nameEn": "Sainya Gaujha"
//                 },
//                 {
//                     "value": "900587",
//                     "name": "सोना",
//                     "nameEn": "Sona"
//                 },
//                 {
//                     "value": "150363",
//                     "name": "सोना",
//                     "nameEn": "Sona"
//                 },
//                 {
//                     "value": "900478",
//                     "name": "स्‍वराज नगर",
//                     "nameEn": "Svaraja Nagara"
//                 },
//                 {
//                     "value": "150412",
//                     "name": "हड़हा",
//                     "nameEn": "Harha"
//                 },
//                 {
//                     "value": "900641",
//                     "name": "हड़हा",
//                     "nameEn": "Harha"
//                 },
//                 {
//                     "value": "150420",
//                     "name": "हरबंशपुर",
//                     "nameEn": "Harabnshapura"
//                 },
//                 {
//                     "value": "900592",
//                     "name": "हरवशपुर",
//                     "nameEn": "Haravashapura"
//                 },
//                 {
//                     "value": "900517",
//                     "name": "हरिहरनाथ शास्‍त्री नगर 121व 122 चक",
//                     "nameEn": "Hariharanatha Shastree Nagara 121va 122 Chak"
//                 },
//                 {
//                     "value": "900419",
//                     "name": "हसनपुर",
//                     "nameEn": "Hasanapura"
//                 },
//                 {
//                     "value": "220396",
//                     "name": "हसनपूर",
//                     "nameEn": "Hasanapoora"
//                 }
//             ],
//             "212": [
//                 {
//                     "value": "149972",
//                     "name": "अकबरपुर सेंग",
//                     "nameEn": "Akbarpur Senga"
//                 },
//                 {
//                     "value": "150105",
//                     "name": "अजौली",
//                     "nameEn": "Ajauli"
//                 },
//                 {
//                     "value": "150213",
//                     "name": "अटवा",
//                     "nameEn": "Atwa"
//                 },
//                 {
//                     "value": "149953",
//                     "name": "अनेई",
//                     "nameEn": "Anei"
//                 },
//                 {
//                     "value": "900910",
//                     "name": "अब्दुल कलाम आजाद नगर",
//                     "nameEn": "Abdula Kalama Azad Nagara"
//                 },
//                 {
//                     "value": "150239",
//                     "name": "अमिलिहा",
//                     "nameEn": "Amiliha"
//                 },
//                 {
//                     "value": "900919",
//                     "name": "अम्बेडकर नगर",
//                     "nameEn": "Ambedakara Nagara"
//                 },
//                 {
//                     "value": "900913",
//                     "name": "अम्बेडकर नगर",
//                     "nameEn": "Ambedakara Nagara"
//                 },
//                 {
//                     "value": "149914",
//                     "name": "अरौल",
//                     "nameEn": "Araula"
//                 },
//                 {
//                     "value": "149991",
//                     "name": "अर्जुनपुर",
//                     "nameEn": "Arjunapura"
//                 },
//                 {
//                     "value": "150084",
//                     "name": "अल्लापुर भसेनी",
//                     "nameEn": "Allapura Bhasenee"
//                 },
//                 {
//                     "value": "150026",
//                     "name": "अल्लीपुर",
//                     "nameEn": "Alleepura"
//                 },
//                 {
//                     "value": "150206",
//                     "name": "अवावकपुर",
//                     "nameEn": "Avavakapura"
//                 },
//                 {
//                     "value": "900908",
//                     "name": "अशफाक उल्ला नगर",
//                     "nameEn": "Ashaphaka Ulla Nagara"
//                 },
//                 {
//                     "value": "150040",
//                     "name": "अहमदपुर नदिहा",
//                     "nameEn": "Ahamadapura Nadiha"
//                 },
//                 {
//                     "value": "149910",
//                     "name": "आंकिन",
//                     "nameEn": "Aankina"
//                 },
//                 {
//                     "value": "900904",
//                     "name": "आजाद नगर",
//                     "nameEn": "Azad Nagara"
//                 },
//                 {
//                     "value": "150145",
//                     "name": "आँटी",
//                     "nameEn": "Aantee"
//                 },
//                 {
//                     "value": "150032",
//                     "name": "आराजी ईशेपुर",
//                     "nameEn": "Aarajee Eeshepura"
//                 },
//                 {
//                     "value": "150234",
//                     "name": "आलमपुर",
//                     "nameEn": "Aalamapura"
//                 },
//                 {
//                     "value": "150275",
//                     "name": "इटरा",
//                     "nameEn": "Itara"
//                 },
//                 {
//                     "value": "150268",
//                     "name": "इन्दलपुर जुगराज",
//                     "nameEn": "Indalapura Jugaraja"
//                 },
//                 {
//                     "value": "150187",
//                     "name": "इन्दलपुर शिवराजपुर",
//                     "nameEn": "Indalapura Shivarajapura"
//                 },
//                 {
//                     "value": "900918",
//                     "name": "इन्द्रा नगर",
//                     "nameEn": "Indra Nagara"
//                 },
//                 {
//                     "value": "150011",
//                     "name": "इब्राहीमपुर रौंस",
//                     "nameEn": "Ibraheemapura Raunsa"
//                 },
//                 {
//                     "value": "149889",
//                     "name": "इलियासपुर",
//                     "nameEn": "Iliyasapura"
//                 },
//                 {
//                     "value": "149948",
//                     "name": "ईशेपुर बिल्हौर",
//                     "nameEn": "Eeshepura Bilhaura"
//                 },
//                 {
//                     "value": "150107",
//                     "name": "ईशेपुर शिवराजपुर",
//                     "nameEn": "Eeshepura Shivarajapura"
//                 },
//                 {
//                     "value": "150021",
//                     "name": "उट्ठा",
//                     "nameEn": "Uttha"
//                 },
//                 {
//                     "value": "150028",
//                     "name": "उत्तमपुर",
//                     "nameEn": "Uttamapura"
//                 },
//                 {
//                     "value": "150042",
//                     "name": "उत्तरी",
//                     "nameEn": "Uttaree"
//                 },
//                 {
//                     "value": "150016",
//                     "name": "उदयभानपुर",
//                     "nameEn": "Udayabhanapura"
//                 },
//                 {
//                     "value": "150222",
//                     "name": "उदेतपुर बिठूर",
//                     "nameEn": "Udetapura Bithoora"
//                 },
//                 {
//                     "value": "150109",
//                     "name": "उदेतपुर शिवराजपुर",
//                     "nameEn": "Udetapura Shivarajapura"
//                 },
//                 {
//                     "value": "150261",
//                     "name": "उमरी",
//                     "nameEn": "Umaree"
//                 },
//                 {
//                     "value": "149950",
//                     "name": "औरंगपुर साँभी",
//                     "nameEn": "Aurngapura Sanbhee"
//                 },
//                 {
//                     "value": "220817",
//                     "name": "औरावरी",
//                     "nameEn": "Auravaree"
//                 },
//                 {
//                     "value": "150022",
//                     "name": "औरोंताहरपुर",
//                     "nameEn": "Aurontaharapura"
//                 },
//                 {
//                     "value": "150036",
//                     "name": "ककवन",
//                     "nameEn": "Kakavana"
//                 },
//                 {
//                     "value": "150149",
//                     "name": "कंजती",
//                     "nameEn": "Knjatee"
//                 },
//                 {
//                     "value": "149971",
//                     "name": "कटरी अकबरपुर सेग",
//                     "nameEn": "Kataree Akbarpur Sega"
//                 },
//                 {
//                     "value": "150212",
//                     "name": "कटरी अटवा",
//                     "nameEn": "Kataree Atwa"
//                 },
//                 {
//                     "value": "150085",
//                     "name": "कटरी अल्लापुर भसेनी",
//                     "nameEn": "Kataree Allapura Bhasenee"
//                 },
//                 {
//                     "value": "149911",
//                     "name": "कटरी आंकिन",
//                     "nameEn": "Kataree Aankina"
//                 },
//                 {
//                     "value": "150173",
//                     "name": "कटरी केवना",
//                     "nameEn": "Kataree Kevana"
//                 },
//                 {
//                     "value": "220818",
//                     "name": "कटरी ख्वाजगीपुर",
//                     "nameEn": "Kataree Khvajageepura"
//                 },
//                 {
//                     "value": "149970",
//                     "name": "कटरी गदनपुर अहार",
//                     "nameEn": "Kataree Gadanapura Ahara"
//                 },
//                 {
//                     "value": "149918",
//                     "name": "कटरी गिलवट अमीनाबाद",
//                     "nameEn": "Kataree Gilavata Ameenabada"
//                 },
//                 {
//                     "value": "149960",
//                     "name": "कटरी गौरी",
//                     "nameEn": "Kataree Gauree"
//                 },
//                 {
//                     "value": "149985",
//                     "name": "कटरी जैसरमऊ",
//                     "nameEn": "Kataree Jaisaramaoo"
//                 },
//                 {
//                     "value": "150169",
//                     "name": "कटरी तरीपाठकपुर",
//                     "nameEn": "Kataree Tareepathakapura"
//                 },
//                 {
//                     "value": "150174",
//                     "name": "कटरी दुगर्ापुर",
//                     "nameEn": "Kataree Dugrapura"
//                 },
//                 {
//                     "value": "149937",
//                     "name": "कटरी नानामऊ",
//                     "nameEn": "Kataree Nanamaoo"
//                 },
//                 {
//                     "value": "150070",
//                     "name": "कटरी पनका",
//                     "nameEn": "Kataree Panaka"
//                 },
//                 {
//                     "value": "150230",
//                     "name": "कटरी पाठकपुरबिठूर",
//                     "nameEn": "Kataree Pathakapurabithoora"
//                 },
//                 {
//                     "value": "150069",
//                     "name": "कटरी प्यारेपुर",
//                     "nameEn": "Kataree Pyarepura"
//                 },
//                 {
//                     "value": "150170",
//                     "name": "कटरी बरूवा कलाँ",
//                     "nameEn": "Kataree Baroova Kalan"
//                 },
//                 {
//                     "value": "150211",
//                     "name": "कटरी बरूवा खुर्द",
//                     "nameEn": "Kataree Baroova Khurd"
//                 },
//                 {
//                     "value": "149912",
//                     "name": "कटरी बहरामपुर",
//                     "nameEn": "Kataree Baharamapura"
//                 },
//                 {
//                     "value": "150215",
//                     "name": "कटरी बाल्हीपुर",
//                     "nameEn": "Kataree Balheepura"
//                 },
//                 {
//                     "value": "150168",
//                     "name": "कटरी बेहटा",
//                     "nameEn": "Kataree Behata"
//                 },
//                 {
//                     "value": "149935",
//                     "name": "कटरी बोहनार",
//                     "nameEn": "Kataree Bohanara"
//                 },
//                 {
//                     "value": "149982",
//                     "name": "कटरी मतलबपुर जुलहा",
//                     "nameEn": "Kataree Matalabapura Julaha"
//                 },
//                 {
//                     "value": "149940",
//                     "name": "कटरी महिगवाँ",
//                     "nameEn": "Kataree Mahigavan"
//                 },
//                 {
//                     "value": "149961",
//                     "name": "कटरी मुहीउद्दीनपुर",
//                     "nameEn": "Kataree Muheeuddeenapura"
//                 },
//                 {
//                     "value": "150086",
//                     "name": "कटरी राजेपुर शादीपुर",
//                     "nameEn": "Kataree Rajepura Shadeepura"
//                 },
//                 {
//                     "value": "149986",
//                     "name": "कटरी राधन",
//                     "nameEn": "Kataree Radhana"
//                 },
//                 {
//                     "value": "150219",
//                     "name": "कटरी वाजीदपुर",
//                     "nameEn": "Kataree Vajeedapura"
//                 },
//                 {
//                     "value": "149932",
//                     "name": "कटरी संजतीबादशाहपुर",
//                     "nameEn": "Kataree SnjateebadaShahpur"
//                 },
//                 {
//                     "value": "149933",
//                     "name": "कटरी सम्भियापुर",
//                     "nameEn": "Kataree Smbhiyapura"
//                 },
//                 {
//                     "value": "150083",
//                     "name": "कटरी सरांयगंग",
//                     "nameEn": "Kataree Saranyagnga"
//                 },
//                 {
//                     "value": "150218",
//                     "name": "कटरी सलेमपुर बिठूर",
//                     "nameEn": "Kataree Salemapura Bithoora"
//                 },
//                 {
//                     "value": "150214",
//                     "name": "कटरी सुनौढ़ा",
//                     "nameEn": "Kataree Sunaurha"
//                 },
//                 {
//                     "value": "149909",
//                     "name": "कटरी हसौलीकाजीगंज",
//                     "nameEn": "Kataree Hasauleekajeegnja"
//                 },
//                 {
//                     "value": "149917",
//                     "name": "कटरी हासिमपुर",
//                     "nameEn": "Kataree Hasimapura"
//                 },
//                 {
//                     "value": "150061",
//                     "name": "कपूरपुर भवन",
//                     "nameEn": "Kapoorapura Bhavana"
//                 },
//                 {
//                     "value": "149949",
//                     "name": "कमसान",
//                     "nameEn": "Kamasana"
//                 },
//                 {
//                     "value": "150050",
//                     "name": "कमालपुर",
//                     "nameEn": "Kamalapura"
//                 },
//                 {
//                     "value": "150166",
//                     "name": "करतरिया",
//                     "nameEn": "Karatariya"
//                 },
//                 {
//                     "value": "149930",
//                     "name": "क.शाहमपुरपदुर्मन",
//                     "nameEn": "Ka.shahamapurapadurmana"
//                 },
//                 {
//                     "value": "150033",
//                     "name": "कसिगवां",
//                     "nameEn": "Kasigavan"
//                 },
//                 {
//                     "value": "150076",
//                     "name": "काकूपुर निहाल",
//                     "nameEn": "Kakoopura Nihala"
//                 },
//                 {
//                     "value": "150077",
//                     "name": "काकूपुर रब्बन",
//                     "nameEn": "Kakoopura Rbbana"
//                 },
//                 {
//                     "value": "150080",
//                     "name": "काकूपुर सीताराम",
//                     "nameEn": "Kakoopura Seetarama"
//                 },
//                 {
//                     "value": "150073",
//                     "name": "काकूपुर हलबल",
//                     "nameEn": "Kakoopura Halabala"
//                 },
//                 {
//                     "value": "149915",
//                     "name": "कांटी कुंर्इं",
//                     "nameEn": "Kantee Kunrin"
//                 },
//                 {
//                     "value": "150128",
//                     "name": "कासामऊ",
//                     "nameEn": "Kasamaoo"
//                 },
//                 {
//                     "value": "900916",
//                     "name": "किदवई नगर",
//                     "nameEn": "Kidavaee Nagara"
//                 },
//                 {
//                     "value": "150223",
//                     "name": "किशुनपुर",
//                     "nameEn": "Kishunapura"
//                 },
//                 {
//                     "value": "150153",
//                     "name": "कीरतपुर",
//                     "nameEn": "Keeratapura"
//                 },
//                 {
//                     "value": "150282",
//                     "name": "कुकरादेव",
//                     "nameEn": "Kukaradeva"
//                 },
//                 {
//                     "value": "149946",
//                     "name": "कुदौरा",
//                     "nameEn": "Kudaura"
//                 },
//                 {
//                     "value": "150020",
//                     "name": "कुरेह",
//                     "nameEn": "Kureha"
//                 },
//                 {
//                     "value": "150035",
//                     "name": "कुरौली",
//                     "nameEn": "Kuraulee"
//                 },
//                 {
//                     "value": "150250",
//                     "name": "कुर्मीखेड़ा कलाँ",
//                     "nameEn": "Kurmikhera Kalan"
//                 },
//                 {
//                     "value": "150135",
//                     "name": "कुर्मीखेड़ा खुर्द",
//                     "nameEn": "Kurmikhera Khurd"
//                 },
//                 {
//                     "value": "150058",
//                     "name": "कुंवरपुर",
//                     "nameEn": "Kunvarapura"
//                 },
//                 {
//                     "value": "150142",
//                     "name": "कुंवरपुर कुकरी",
//                     "nameEn": "Kunvarapura Kukaree"
//                 },
//                 {
//                     "value": "900900",
//                     "name": "कृष्णा नगर",
//                     "nameEn": "Krishna Nagara"
//                 },
//                 {
//                     "value": "150178",
//                     "name": "केवना",
//                     "nameEn": "Kevana"
//                 },
//                 {
//                     "value": "149903",
//                     "name": "केशवापुर",
//                     "nameEn": "Keshavapura"
//                 },
//                 {
//                     "value": "149945",
//                     "name": "खजुरी",
//                     "nameEn": "Khajuree"
//                 },
//                 {
//                     "value": "150192",
//                     "name": "खरगपुर",
//                     "nameEn": "Kharagapura"
//                 },
//                 {
//                     "value": "150010",
//                     "name": "खरपतपुर",
//                     "nameEn": "Kharapatapura"
//                 },
//                 {
//                     "value": "149897",
//                     "name": "खाड़ामऊ",
//                     "nameEn": "Kharamaoo"
//                 },
//                 {
//                     "value": "149926",
//                     "name": "खासपुर",
//                     "nameEn": "Khasapura"
//                 },
//                 {
//                     "value": "150025",
//                     "name": "खुर्द खोजनपुर",
//                     "nameEn": "Khurd Khojanapura"
//                 },
//                 {
//                     "value": "150008",
//                     "name": "खेरवा",
//                     "nameEn": "Kherava"
//                 },
//                 {
//                     "value": "150140",
//                     "name": "खोंधन",
//                     "nameEn": "Khondhana"
//                 },
//                 {
//                     "value": "220819",
//                     "name": "ख्वाजगीपुर",
//                     "nameEn": "Khvajageepura"
//                 },
//                 {
//                     "value": "149905",
//                     "name": "गजना",
//                     "nameEn": "Gajana"
//                 },
//                 {
//                     "value": "150251",
//                     "name": "गजेनपुर",
//                     "nameEn": "Gajenapura"
//                 },
//                 {
//                     "value": "149974",
//                     "name": "गढ़",
//                     "nameEn": "Garh"
//                 },
//                 {
//                     "value": "150014",
//                     "name": "गढ़ी",
//                     "nameEn": "Garhee"
//                 },
//                 {
//                     "value": "150039",
//                     "name": "गढ़ेवा",
//                     "nameEn": "Garheva"
//                 },
//                 {
//                     "value": "149969",
//                     "name": "गदनपुर आहर",
//                     "nameEn": "Gadanapura Aahara"
//                 },
//                 {
//                     "value": "149952",
//                     "name": "गदनपुर चोरसा",
//                     "nameEn": "Gadanapura Chorasa"
//                 },
//                 {
//                     "value": "150208",
//                     "name": "गबड़हा",
//                     "nameEn": "Gabarha"
//                 },
//                 {
//                     "value": "150279",
//                     "name": "गम्भीरपुर",
//                     "nameEn": "Gmbheerapura"
//                 },
//                 {
//                     "value": "900896",
//                     "name": "गया प्रसाद नगर",
//                     "nameEn": "Gaya Prasada Nagara"
//                 },
//                 {
//                     "value": "149907",
//                     "name": "गांगूपुर",
//                     "nameEn": "Gangoopura"
//                 },
//                 {
//                     "value": "149919",
//                     "name": "गिलवट अमीनाबाद",
//                     "nameEn": "Gilavata Ameenabada"
//                 },
//                 {
//                     "value": "150134",
//                     "name": "गुरैनी",
//                     "nameEn": "Gurainee"
//                 },
//                 {
//                     "value": "150204",
//                     "name": "गुरैया",
//                     "nameEn": "Guraiya"
//                 },
//                 {
//                     "value": "149904",
//                     "name": "गूजेपुर",
//                     "nameEn": "Goojepura"
//                 },
//                 {
//                     "value": "150253",
//                     "name": "गोगूमऊ",
//                     "nameEn": "Gogoomaoo"
//                 },
//                 {
//                     "value": "150054",
//                     "name": "गोड़रा",
//                     "nameEn": "Gorra"
//                 },
//                 {
//                     "value": "150067",
//                     "name": "गोपालपुर शिवराजपुर",
//                     "nameEn": "Gopalapura Shivarajapura"
//                 },
//                 {
//                     "value": "150286",
//                     "name": "गोविन्दपुर",
//                     "nameEn": "Govindapura"
//                 },
//                 {
//                     "value": "150114",
//                     "name": "गोविन्देपुर",
//                     "nameEn": "Govindepura"
//                 },
//                 {
//                     "value": "149959",
//                     "name": "गौरी",
//                     "nameEn": "Gauree"
//                 },
//                 {
//                     "value": "150120",
//                     "name": "गौरी अभयपुर",
//                     "nameEn": "Gauree Abhayapura"
//                 },
//                 {
//                     "value": "150125",
//                     "name": "गौरी चौबे",
//                     "nameEn": "Gauree Chaube"
//                 },
//                 {
//                     "value": "150258",
//                     "name": "गौरीलक्खा",
//                     "nameEn": "Gaureelkkha"
//                 },
//                 {
//                     "value": "150181",
//                     "name": "घनश्यामपुर",
//                     "nameEn": "Ghanshyamapura"
//                 },
//                 {
//                     "value": "150207",
//                     "name": "घाघपुर",
//                     "nameEn": "Ghaghapura"
//                 },
//                 {
//                     "value": "150165",
//                     "name": "घेमऊ",
//                     "nameEn": "Ghemaoo"
//                 },
//                 {
//                     "value": "150227",
//                     "name": "चक काजी अलिहा",
//                     "nameEn": "Chak Kajee Aliha"
//                 },
//                 {
//                     "value": "149925",
//                     "name": "चक खासपुर",
//                     "nameEn": "Chak Khasapura"
//                 },
//                 {
//                     "value": "150285",
//                     "name": "चक गोविन्देपुर",
//                     "nameEn": "Chak Govindepura"
//                 },
//                 {
//                     "value": "150272",
//                     "name": "चक बहरमपुर",
//                     "nameEn": "Chak Baharamapura"
//                 },
//                 {
//                     "value": "150078",
//                     "name": "चक बाँका",
//                     "nameEn": "Chak Banka"
//                 },
//                 {
//                     "value": "150226",
//                     "name": "चक बेचा",
//                     "nameEn": "Chak Becha"
//                 },
//                 {
//                     "value": "150133",
//                     "name": "चक सम्भलपुर",
//                     "nameEn": "Chak Smbhalapura"
//                 },
//                 {
//                     "value": "150199",
//                     "name": "चक हजरतपुर",
//                     "nameEn": "Chak Hajaratapura"
//                 },
//                 {
//                     "value": "150031",
//                     "name": "चन्दपुरा",
//                     "nameEn": "Chndapura"
//                 },
//                 {
//                     "value": "150288",
//                     "name": "चन्दुला",
//                     "nameEn": "Chndula"
//                 },
//                 {
//                     "value": "900902",
//                     "name": "चन्द्र शेखर आजाद नगर",
//                     "nameEn": "Chndra Shekhara Azad Nagara"
//                 },
//                 {
//                     "value": "900921",
//                     "name": "चन्द्रशेखर आजाद नगर",
//                     "nameEn": "Chndrashekhara Azad Nagara"
//                 },
//                 {
//                     "value": "150248",
//                     "name": "चम्पतपुर",
//                     "nameEn": "Chmpatapura"
//                 },
//                 {
//                     "value": "149906",
//                     "name": "चीतामऊ",
//                     "nameEn": "Cheetamaoo"
//                 },
//                 {
//                     "value": "149943",
//                     "name": "चौखंडी",
//                     "nameEn": "Chaukhndee"
//                 },
//                 {
//                     "value": "150235",
//                     "name": "चौधरीपुर",
//                     "nameEn": "Chaudhareepura"
//                 },
//                 {
//                     "value": "149963",
//                     "name": "चौबिगही शिकोहाबाद",
//                     "nameEn": "Chaubigahee Shikohabada"
//                 },
//                 {
//                     "value": "150291",
//                     "name": "चौबेपुर कलाँ",
//                     "nameEn": "Chaubepura Kalan"
//                 },
//                 {
//                     "value": "150195",
//                     "name": "चौबेपुर पक्खन",
//                     "nameEn": "Chaubepura Pkkhana"
//                 },
//                 {
//                     "value": "150079",
//                     "name": "छतरपुर",
//                     "nameEn": "Chhatarapura"
//                 },
//                 {
//                     "value": "150136",
//                     "name": "जगतपुर",
//                     "nameEn": "Jagatapura"
//                 },
//                 {
//                     "value": "150131",
//                     "name": "जगदीशपुर",
//                     "nameEn": "Jagadeeshapura"
//                 },
//                 {
//                     "value": "150027",
//                     "name": "जमालपुर",
//                     "nameEn": "Jamalapura"
//                 },
//                 {
//                     "value": "900899",
//                     "name": "जय प्रकाश नगर",
//                     "nameEn": "Jaya Prakasha Nagara"
//                 },
//                 {
//                     "value": "150191",
//                     "name": "जरारी",
//                     "nameEn": "Jararee"
//                 },
//                 {
//                     "value": "150019",
//                     "name": "जरिहा",
//                     "nameEn": "Jariha"
//                 },
//                 {
//                     "value": "149891",
//                     "name": "जलालपुर",
//                     "nameEn": "Jalalapura"
//                 },
//                 {
//                     "value": "150186",
//                     "name": "जवाँसी",
//                     "nameEn": "Javansee"
//                 },
//                 {
//                     "value": "900926",
//                     "name": "जवाहर नगर",
//                     "nameEn": "Javahara Nagara"
//                 },
//                 {
//                     "value": "900906",
//                     "name": "जवाहर नगर",
//                     "nameEn": "Javahara Nagara"
//                 },
//                 {
//                     "value": "150167",
//                     "name": "जादेपुर घस्सा",
//                     "nameEn": "Jadepura Ghssa"
//                 },
//                 {
//                     "value": "150066",
//                     "name": "जानपुर उर्फ रानीनेवा",
//                     "nameEn": "Janapura Urpha Raneeneva"
//                 },
//                 {
//                     "value": "150081",
//                     "name": "जाफराबाद",
//                     "nameEn": "Japharabada"
//                 },
//                 {
//                     "value": "150118",
//                     "name": "जैतपुर शिवराजपुर",
//                     "nameEn": "Jaitapura Shivarajapura"
//                 },
//                 {
//                     "value": "149984",
//                     "name": "जैसरमऊ",
//                     "nameEn": "Jaisaramaoo"
//                 },
//                 {
//                     "value": "150119",
//                     "name": "जोराबरपुर",
//                     "nameEn": "Jorabarapura"
//                 },
//                 {
//                     "value": "150144",
//                     "name": "टकटौली",
//                     "nameEn": "Takataulee"
//                 },
//                 {
//                     "value": "150164",
//                     "name": "टोड़कापुर",
//                     "nameEn": "Torkapura"
//                 },
//                 {
//                     "value": "150221",
//                     "name": "डिगरापुर",
//                     "nameEn": "Digarapura"
//                 },
//                 {
//                     "value": "150043",
//                     "name": "डोडवा जमौली",
//                     "nameEn": "Dodava Jamaulee"
//                 },
//                 {
//                     "value": "150001",
//                     "name": "ढूकापुर",
//                     "nameEn": "Dhookapura"
//                 },
//                 {
//                     "value": "150150",
//                     "name": "तकीपुर",
//                     "nameEn": "Takeepura"
//                 },
//                 {
//                     "value": "150273",
//                     "name": "ततारपुर",
//                     "nameEn": "Tatarapura"
//                 },
//                 {
//                     "value": "150177",
//                     "name": "तरीपाठकपुर",
//                     "nameEn": "Tareepathakapura"
//                 },
//                 {
//                     "value": "150267",
//                     "name": "ताजपुर",
//                     "nameEn": "Tajapura"
//                 },
//                 {
//                     "value": "150237",
//                     "name": "तिघरा",
//                     "nameEn": "Tighara"
//                 },
//                 {
//                     "value": "150203",
//                     "name": "त्रिलोकपुर",
//                     "nameEn": "Trilokapura"
//                 },
//                 {
//                     "value": "149939",
//                     "name": "ददिखा",
//                     "nameEn": "Dadikha"
//                 },
//                 {
//                     "value": "150233",
//                     "name": "दरियापुर बिठूर",
//                     "nameEn": "Dariyapura Bithoora"
//                 },
//                 {
//                     "value": "149975",
//                     "name": "दरियापुर बिल्हौर",
//                     "nameEn": "Dariyapura Bilhaura"
//                 },
//                 {
//                     "value": "150108",
//                     "name": "दरियापुर शिवराजपुर",
//                     "nameEn": "Dariyapura Shivarajapura"
//                 },
//                 {
//                     "value": "150162",
//                     "name": "दलीपनगर",
//                     "nameEn": "Daleepanagara"
//                 },
//                 {
//                     "value": "150015",
//                     "name": "दलेलपुर",
//                     "nameEn": "Dalelapura"
//                 },
//                 {
//                     "value": "150121",
//                     "name": "दहारूद्रपुर",
//                     "nameEn": "Daharoodrapura"
//                 },
//                 {
//                     "value": "150065",
//                     "name": "दहेलिया",
//                     "nameEn": "Daheliya"
//                 },
//                 {
//                     "value": "150012",
//                     "name": "दाउदपुर",
//                     "nameEn": "Daudapura"
//                 },
//                 {
//                     "value": "149973",
//                     "name": "दादारपुर कटहा",
//                     "nameEn": "Dadarapura Kataha"
//                 },
//                 {
//                     "value": "150060",
//                     "name": "दिनकरपुर",
//                     "nameEn": "Dinakarapura"
//                 },
//                 {
//                     "value": "150276",
//                     "name": "दिलावरपुर टोसवा",
//                     "nameEn": "Dilavarapura Tosava"
//                 },
//                 {
//                     "value": "150151",
//                     "name": "दीनदारपुर",
//                     "nameEn": "Deenadarapura"
//                 },
//                 {
//                     "value": "150176",
//                     "name": "दुगर्ापुर",
//                     "nameEn": "Dugrapura"
//                 },
//                 {
//                     "value": "150101",
//                     "name": "दुबियाना",
//                     "nameEn": "Dubiyana"
//                 },
//                 {
//                     "value": "150190",
//                     "name": "देदूपुर",
//                     "nameEn": "Dedoopura"
//                 },
//                 {
//                     "value": "149890",
//                     "name": "देवकली बिल्हौर",
//                     "nameEn": "Devakalee Bilhaura"
//                 },
//                 {
//                     "value": "150148",
//                     "name": "देवकली शिवराजपुर",
//                     "nameEn": "Devakalee Shivarajapura"
//                 },
//                 {
//                     "value": "150240",
//                     "name": "देवपालपुर",
//                     "nameEn": "Devapalapura"
//                 },
//                 {
//                     "value": "150023",
//                     "name": "देवहा",
//                     "nameEn": "Devaha"
//                 },
//                 {
//                     "value": "149989",
//                     "name": "देवीपुर सरांय",
//                     "nameEn": "Deveepura Saranya"
//                 },
//                 {
//                     "value": "150183",
//                     "name": "दोदेपुर",
//                     "nameEn": "Dodepura"
//                 },
//                 {
//                     "value": "149900",
//                     "name": "धौरहरा",
//                     "nameEn": "Dhaurahara"
//                 },
//                 {
//                     "value": "150047",
//                     "name": "नदिहा खुर्द",
//                     "nameEn": "Nadiha Khurd"
//                 },
//                 {
//                     "value": "150046",
//                     "name": "नदिहा घामू",
//                     "nameEn": "Nadiha Ghamoo"
//                 },
//                 {
//                     "value": "150051",
//                     "name": "नदीहा बुर्जुग",
//                     "nameEn": "Nadeeha Burjuga"
//                 },
//                 {
//                     "value": "149928",
//                     "name": "नसिरापुर",
//                     "nameEn": "Nasirapura"
//                 },
//                 {
//                     "value": "150260",
//                     "name": "नाढ़ूपुर",
//                     "nameEn": "Narhoopura"
//                 },
//                 {
//                     "value": "150198",
//                     "name": "नाथूपुर",
//                     "nameEn": "Nathoopura"
//                 },
//                 {
//                     "value": "149938",
//                     "name": "नानामऊ",
//                     "nameEn": "Nanamaoo"
//                 },
//                 {
//                     "value": "150269",
//                     "name": "निगोह",
//                     "nameEn": "Nigoha"
//                 },
//                 {
//                     "value": "150117",
//                     "name": "निसोन",
//                     "nameEn": "Nisona"
//                 },
//                 {
//                     "value": "150088",
//                     "name": "नेवादा अजीतराय",
//                     "nameEn": "Nevada Ajeetaraya"
//                 },
//                 {
//                     "value": "150000",
//                     "name": "नेवादा ऊधौ",
//                     "nameEn": "Nevada Oodhau"
//                 },
//                 {
//                     "value": "150092",
//                     "name": "नेवादा कंठी",
//                     "nameEn": "Nevada Knthee"
//                 },
//                 {
//                     "value": "150089",
//                     "name": "नेवादा तारापत",
//                     "nameEn": "Nevada Tarapata"
//                 },
//                 {
//                     "value": "150094",
//                     "name": "नेवादा थाती",
//                     "nameEn": "Nevada Thatee"
//                 },
//                 {
//                     "value": "150075",
//                     "name": "नेवादा दरिया",
//                     "nameEn": "Nevada Dariya"
//                 },
//                 {
//                     "value": "149992",
//                     "name": "नेवादा दासा",
//                     "nameEn": "Nevada Dasa"
//                 },
//                 {
//                     "value": "149996",
//                     "name": "नेवादा धमनू",
//                     "nameEn": "Nevada Dhamanoo"
//                 },
//                 {
//                     "value": "150100",
//                     "name": "नेवादा भग्गी",
//                     "nameEn": "Nevada Bhggee"
//                 },
//                 {
//                     "value": "150098",
//                     "name": "नेवादा मधई",
//                     "nameEn": "Nevada Madhaee"
//                 },
//                 {
//                     "value": "149980",
//                     "name": "नेवादा मन्जू",
//                     "nameEn": "Nevada Mnjoo"
//                 },
//                 {
//                     "value": "150106",
//                     "name": "नेवादा महासरन",
//                     "nameEn": "Nevada Mahasarana"
//                 },
//                 {
//                     "value": "150059",
//                     "name": "नेवादा वंशी",
//                     "nameEn": "Nevada Vnshee"
//                 },
//                 {
//                     "value": "150003",
//                     "name": "नेवादा शाह",
//                     "nameEn": "Nevada Shaha"
//                 },
//                 {
//                     "value": "150155",
//                     "name": "नेवादा सुक्खा",
//                     "nameEn": "Nevada Sukkha"
//                 },
//                 {
//                     "value": "150124",
//                     "name": "नेवादा सुजान",
//                     "nameEn": "Nevada Sujana"
//                 },
//                 {
//                     "value": "150002",
//                     "name": "नेवादा सैना",
//                     "nameEn": "Nevada Saina"
//                 },
//                 {
//                     "value": "150056",
//                     "name": "नेवादा हरीराय",
//                     "nameEn": "Nevada Hareeraya"
//                 },
//                 {
//                     "value": "150123",
//                     "name": "नेवादा हंसी",
//                     "nameEn": "Nevada Hnsee"
//                 },
//                 {
//                     "value": "150197",
//                     "name": "नोनहा कलाँ",
//                     "nameEn": "Nonaha Kalan"
//                 },
//                 {
//                     "value": "150196",
//                     "name": "नोनहा नरसिंह",
//                     "nameEn": "Nonaha Narasinha"
//                 },
//                 {
//                     "value": "150018",
//                     "name": "न्योराखेड़ा",
//                     "nameEn": "Nyorakhera"
//                 },
//                 {
//                     "value": "150280",
//                     "name": "पचोर",
//                     "nameEn": "Pachora"
//                 },
//                 {
//                     "value": "900927",
//                     "name": "पटेल नगर",
//                     "nameEn": "Patela Nagara"
//                 },
//                 {
//                     "value": "150071",
//                     "name": "पनका",
//                     "nameEn": "Panaka"
//                 },
//                 {
//                     "value": "900905",
//                     "name": "पन्त नगर",
//                     "nameEn": "Pnta Nagara"
//                 },
//                 {
//                     "value": "149886",
//                     "name": "पलिया बुर्जुग",
//                     "nameEn": "Paliya Burjuga"
//                 },
//                 {
//                     "value": "150229",
//                     "name": "पाठकपुर बिठूर",
//                     "nameEn": "Pathakapura Bithoora"
//                 },
//                 {
//                     "value": "150102",
//                     "name": "पाठकपुर शिवराजपुर",
//                     "nameEn": "Pathakapura Shivarajapura"
//                 },
//                 {
//                     "value": "150289",
//                     "name": "पारापरतापपुर",
//                     "nameEn": "Paraparatapapura"
//                 },
//                 {
//                     "value": "149896",
//                     "name": "पिहानीमजबूतनगर",
//                     "nameEn": "Pihaneemajabootanagara"
//                 },
//                 {
//                     "value": "150225",
//                     "name": "पीरकपुर",
//                     "nameEn": "Peerakapura"
//                 },
//                 {
//                     "value": "149998",
//                     "name": "पूरा",
//                     "nameEn": "Poora"
//                 },
//                 {
//                     "value": "150200",
//                     "name": "पूरा गनू",
//                     "nameEn": "Poora Ganoo"
//                 },
//                 {
//                     "value": "150265",
//                     "name": "पूरा जसू",
//                     "nameEn": "Poora Jasoo"
//                 },
//                 {
//                     "value": "150160",
//                     "name": "पूरा बुर्जुग",
//                     "nameEn": "Poora Burjuga"
//                 },
//                 {
//                     "value": "150287",
//                     "name": "पूरा सुवंस",
//                     "nameEn": "Poora Suvnsa"
//                 },
//                 {
//                     "value": "150112",
//                     "name": "पूरेबला",
//                     "nameEn": "Poorebala"
//                 },
//                 {
//                     "value": "150290",
//                     "name": "पेम",
//                     "nameEn": "Pema"
//                 },
//                 {
//                     "value": "150068",
//                     "name": "प्यारेपुर",
//                     "nameEn": "Pyarepura"
//                 },
//                 {
//                     "value": "150185",
//                     "name": "प्रधानपुर",
//                     "nameEn": "Pradhanapura"
//                 },
//                 {
//                     "value": "150202",
//                     "name": "प्रेमपुर",
//                     "nameEn": "Premapura"
//                 },
//                 {
//                     "value": "150038",
//                     "name": "फत्तेपुर",
//                     "nameEn": "Phttepura"
//                 },
//                 {
//                     "value": "220820",
//                     "name": "फत्तेपुर मजरा दलीपनगर",
//                     "nameEn": "Phttepura Majara Daleepanagara"
//                 },
//                 {
//                     "value": "149927",
//                     "name": "बकोठी",
//                     "nameEn": "Bakothee"
//                 },
//                 {
//                     "value": "150030",
//                     "name": "बछना",
//                     "nameEn": "Bachhana"
//                 },
//                 {
//                     "value": "150278",
//                     "name": "बनी",
//                     "nameEn": "Banee"
//                 },
//                 {
//                     "value": "149894",
//                     "name": "बम्भियापुर",
//                     "nameEn": "Bmbhiyapura"
//                 },
//                 {
//                     "value": "149898",
//                     "name": "बरण्डा",
//                     "nameEn": "Barnda"
//                 },
//                 {
//                     "value": "150171",
//                     "name": "बरूवाकलाँ",
//                     "nameEn": "Baroovakalan"
//                 },
//                 {
//                     "value": "150210",
//                     "name": "बरूवाखुर्द",
//                     "nameEn": "BaroovaKhurd"
//                 },
//                 {
//                     "value": "149944",
//                     "name": "बरौली",
//                     "nameEn": "Baraulee"
//                 },
//                 {
//                     "value": "150161",
//                     "name": "बसेन",
//                     "nameEn": "Basena"
//                 },
//                 {
//                     "value": "150264",
//                     "name": "बहरमपुर",
//                     "nameEn": "Baharamapura"
//                 },
//                 {
//                     "value": "150104",
//                     "name": "बहरमापुर",
//                     "nameEn": "Baharamapura"
//                 },
//                 {
//                     "value": "149913",
//                     "name": "बहरामपुर",
//                     "nameEn": "Baharamapura"
//                 },
//                 {
//                     "value": "150283",
//                     "name": "बहलोलपुर",
//                     "nameEn": "Bahalolapura"
//                 },
//                 {
//                     "value": "900901",
//                     "name": "बहादुर शाह जफर नगर",
//                     "nameEn": "Bahadura Shaha Japhara Nagara"
//                 },
//                 {
//                     "value": "149947",
//                     "name": "बारामऊ",
//                     "nameEn": "Baramaoo"
//                 },
//                 {
//                     "value": "900897",
//                     "name": "बाल्मीक नगर",
//                     "nameEn": "Balmeeka Nagara"
//                 },
//                 {
//                     "value": "150216",
//                     "name": "बाल्हीपुर",
//                     "nameEn": "Balheepura"
//                 },
//                 {
//                     "value": "149922",
//                     "name": "बावनझाला मुजफ्फरपुर",
//                     "nameEn": "Bavanajhala Mujphpharapura"
//                 },
//                 {
//                     "value": "150284",
//                     "name": "बिरतियान बिठूर",
//                     "nameEn": "Biratiyana Bithoora"
//                 },
//                 {
//                     "value": "150184",
//                     "name": "बिरैचामऊ",
//                     "nameEn": "Biraichamaoo"
//                 },
//                 {
//                     "value": "150091",
//                     "name": "बिलहन",
//                     "nameEn": "Bilahana"
//                 },
//                 {
//                     "value": "149954",
//                     "name": "बिल्हौर देहात",
//                     "nameEn": "Bilhaura Dehata"
//                 },
//                 {
//                     "value": "220821",
//                     "name": "बिल्हौर नगरपालिका",
//                     "nameEn": "Bilhaura Nagarapalika"
//                 },
//                 {
//                     "value": "220822",
//                     "name": "बिहारीपुर",
//                     "nameEn": "Bihareepura"
//                 },
//                 {
//                     "value": "149964",
//                     "name": "बीबीपुर",
//                     "nameEn": "Beebeepura"
//                 },
//                 {
//                     "value": "150055",
//                     "name": "बीरामऊ",
//                     "nameEn": "Beeramaoo"
//                 },
//                 {
//                     "value": "150236",
//                     "name": "बूढ़नपुर",
//                     "nameEn": "Boorhnapura"
//                 },
//                 {
//                     "value": "149968",
//                     "name": "बेदीपुर",
//                     "nameEn": "Bedeepura"
//                 },
//                 {
//                     "value": "149924",
//                     "name": "बेरर्ा खानपुर",
//                     "nameEn": "Berra Khanapura"
//                 },
//                 {
//                     "value": "150175",
//                     "name": "बेहटा",
//                     "nameEn": "Behata"
//                 },
//                 {
//                     "value": "149951",
//                     "name": "बैडी अलीपुर",
//                     "nameEn": "Baidee Aleepura"
//                 },
//                 {
//                     "value": "150244",
//                     "name": "बैदानी",
//                     "nameEn": "Baidanee"
//                 },
//                 {
//                     "value": "150096",
//                     "name": "बैरी",
//                     "nameEn": "Bairee"
//                 },
//                 {
//                     "value": "150271",
//                     "name": "बैसठी",
//                     "nameEn": "Baisathee"
//                 },
//                 {
//                     "value": "150157",
//                     "name": "बोझा",
//                     "nameEn": "Bojha"
//                 },
//                 {
//                     "value": "149936",
//                     "name": "बोहनार",
//                     "nameEn": "Bohanara"
//                 },
//                 {
//                     "value": "900903",
//                     "name": "भगत सिंह नगर",
//                     "nameEn": "Bhagata Sinha Nagara"
//                 },
//                 {
//                     "value": "150247",
//                     "name": "भगवन्तपुर",
//                     "nameEn": "Bhagavntapura"
//                 },
//                 {
//                     "value": "150103",
//                     "name": "भटपुरा शिवरापुर",
//                     "nameEn": "Bhatapura Shivarapura"
//                 },
//                 {
//                     "value": "150143",
//                     "name": "भटपुरा शिवली",
//                     "nameEn": "Bhatapura Shivalee"
//                 },
//                 {
//                     "value": "150243",
//                     "name": "भवानीपुर",
//                     "nameEn": "Bhavaneepura"
//                 },
//                 {
//                     "value": "150224",
//                     "name": "भाउपुर माधो सिंह",
//                     "nameEn": "Bhaupura Madho Sinha"
//                 },
//                 {
//                     "value": "150238",
//                     "name": "भिखारीपुर",
//                     "nameEn": "Bhikhareepura"
//                 },
//                 {
//                     "value": "150194",
//                     "name": "भिण्डुरी",
//                     "nameEn": "Bhinduree"
//                 },
//                 {
//                     "value": "150159",
//                     "name": "भीटी",
//                     "nameEn": "Bheetee"
//                 },
//                 {
//                     "value": "149920",
//                     "name": "भींटी हवेली",
//                     "nameEn": "Bheentee Havelee"
//                 },
//                 {
//                     "value": "150126",
//                     "name": "भैसऊ",
//                     "nameEn": "Bhaisaoo"
//                 },
//                 {
//                     "value": "150110",
//                     "name": "भौनतपुर",
//                     "nameEn": "Bhaunatapura"
//                 },
//                 {
//                     "value": "150154",
//                     "name": "भौसाना",
//                     "nameEn": "Bhausana"
//                 },
//                 {
//                     "value": "149887",
//                     "name": "मकनपुर",
//                     "nameEn": "Makanapura"
//                 },
//                 {
//                     "value": "150231",
//                     "name": "मकरन्दपुर शिवराजपुर",
//                     "nameEn": "Makarndapura Shivarajapura"
//                 },
//                 {
//                     "value": "900922",
//                     "name": "मक्खन सिंह नगर",
//                     "nameEn": "Mkkhana Sinha Nagara"
//                 },
//                 {
//                     "value": "149981",
//                     "name": "मतलबपुर जुलहा",
//                     "nameEn": "Matalabapura Julaha"
//                 },
//                 {
//                     "value": "150099",
//                     "name": "मदनेपुर",
//                     "nameEn": "Madanepura"
//                 },
//                 {
//                     "value": "149892",
//                     "name": "मदारपुर",
//                     "nameEn": "Madarapura"
//                 },
//                 {
//                     "value": "149997",
//                     "name": "मदाराराय गुमान",
//                     "nameEn": "Madararaya Gumana"
//                 },
//                 {
//                     "value": "150049",
//                     "name": "मद्दूपुर",
//                     "nameEn": "Mddoopura"
//                 },
//                 {
//                     "value": "150034",
//                     "name": "मनावाँ बिल्हौर",
//                     "nameEn": "Manavan Bilhaura"
//                 },
//                 {
//                     "value": "150156",
//                     "name": "मनोह",
//                     "nameEn": "Manoha"
//                 },
//                 {
//                     "value": "150201",
//                     "name": "मरखरा",
//                     "nameEn": "Marakhara"
//                 },
//                 {
//                     "value": "150152",
//                     "name": "मरहमतनगर",
//                     "nameEn": "Marahamatanagara"
//                 },
//                 {
//                     "value": "150193",
//                     "name": "मरियानी",
//                     "nameEn": "Mariyanee"
//                 },
//                 {
//                     "value": "149899",
//                     "name": "महदेवा",
//                     "nameEn": "Mahadeva"
//                 },
//                 {
//                     "value": "150137",
//                     "name": "महराजनगर",
//                     "nameEn": "Maharajanagara"
//                 },
//                 {
//                     "value": "150241",
//                     "name": "महराजपुर",
//                     "nameEn": "Maharajapura"
//                 },
//                 {
//                     "value": "900895",
//                     "name": "महात्मा गॉधी नगर",
//                     "nameEn": "Mahatma Gaodhee Nagara"
//                 },
//                 {
//                     "value": "900911",
//                     "name": "महाराणा प्रताप नगर",
//                     "nameEn": "Maharana Pratapa Nagara"
//                 },
//                 {
//                     "value": "149941",
//                     "name": "महिगवाँ",
//                     "nameEn": "Mahigavan"
//                 },
//                 {
//                     "value": "150095",
//                     "name": "महिपालपुर",
//                     "nameEn": "Mahipalapura"
//                 },
//                 {
//                     "value": "150113",
//                     "name": "मानपुर",
//                     "nameEn": "Manapura"
//                 },
//                 {
//                     "value": "150252",
//                     "name": "मालौं",
//                     "nameEn": "Malaun"
//                 },
//                 {
//                     "value": "150256",
//                     "name": "मितनपुर",
//                     "nameEn": "Mitanapura"
//                 },
//                 {
//                     "value": "150090",
//                     "name": "मीरपुर बिलहन",
//                     "nameEn": "Meerapura Bilahana"
//                 },
//                 {
//                     "value": "900928",
//                     "name": "मुख्तार अनीस नगर",
//                     "nameEn": "Mukhtara Aneesa Nagara"
//                 },
//                 {
//                     "value": "150093",
//                     "name": "मुड़ेरी",
//                     "nameEn": "Mureree"
//                 },
//                 {
//                     "value": "900894",
//                     "name": "मुनीश्वर अवस्थी नगर",
//                     "nameEn": "Muneeshvara Avsthee Nagara"
//                 },
//                 {
//                     "value": "150007",
//                     "name": "मुनौवरपुर बिल्हौर",
//                     "nameEn": "Munauvarapura Bilhaura"
//                 },
//                 {
//                     "value": "150132",
//                     "name": "मुश्ता",
//                     "nameEn": "Mushta"
//                 },
//                 {
//                     "value": "149958",
//                     "name": "मुसाहेबपुर",
//                     "nameEn": "Musahebapura"
//                 },
//                 {
//                     "value": "150072",
//                     "name": "मुंह पोछा",
//                     "nameEn": "Munha Pochha"
//                 },
//                 {
//                     "value": "149965",
//                     "name": "मुहम्मदनगर चन्डारी",
//                     "nameEn": "Muhmmadanagara Chndaree"
//                 },
//                 {
//                     "value": "150024",
//                     "name": "मुहम्मदपुर",
//                     "nameEn": "Muhmmadapura"
//                 },
//                 {
//                     "value": "149966",
//                     "name": "मुहम्मदपुर उर्फ शिवदत्तपुर",
//                     "nameEn": "Muhmmadapura Urpha Shivadttapura"
//                 },
//                 {
//                     "value": "149962",
//                     "name": "मुहीउद्दीनपुर",
//                     "nameEn": "Muheeuddeenapura"
//                 },
//                 {
//                     "value": "149921",
//                     "name": "मेडुंवा",
//                     "nameEn": "Medunva"
//                 },
//                 {
//                     "value": "150005",
//                     "name": "मैदौं",
//                     "nameEn": "Maidaun"
//                 },
//                 {
//                     "value": "150163",
//                     "name": "मोड़हर",
//                     "nameEn": "Morhara"
//                 },
//                 {
//                     "value": "150009",
//                     "name": "मौजमपुर",
//                     "nameEn": "Maujamapura"
//                 },
//                 {
//                     "value": "150115",
//                     "name": "रतनपुर",
//                     "nameEn": "Ratanapura"
//                 },
//                 {
//                     "value": "220823",
//                     "name": "रवाँलालपुर",
//                     "nameEn": "Ravanlalapura"
//                 },
//                 {
//                     "value": "149976",
//                     "name": "रसूलपुर बिल्हौर",
//                     "nameEn": "Rasoolapura Bilhaura"
//                 },
//                 {
//                     "value": "149955",
//                     "name": "रहमतपुर",
//                     "nameEn": "Rahamatapura"
//                 },
//                 {
//                     "value": "149942",
//                     "name": "रहीमपुर करीमपुर",
//                     "nameEn": "Raheemapura Kareemapura"
//                 },
//                 {
//                     "value": "150006",
//                     "name": "रहीमपुर विषधन",
//                     "nameEn": "Raheemapura Vishadhana"
//                 },
//                 {
//                     "value": "220824",
//                     "name": "राजपुर",
//                     "nameEn": "Rajapura"
//                 },
//                 {
//                     "value": "150182",
//                     "name": "राजारामपुर",
//                     "nameEn": "Rajaramapura"
//                 },
//                 {
//                     "value": "900914",
//                     "name": "राजीव नगर",
//                     "nameEn": "Rajeeva Nagara"
//                 },
//                 {
//                     "value": "149967",
//                     "name": "राजेपुर बिल्हौर",
//                     "nameEn": "Rajepura Bilhaura"
//                 },
//                 {
//                     "value": "150087",
//                     "name": "राजेपुर शादीपुर",
//                     "nameEn": "Rajepura Shadeepura"
//                 },
//                 {
//                     "value": "149983",
//                     "name": "राढ़ा",
//                     "nameEn": "Rarha"
//                 },
//                 {
//                     "value": "149987",
//                     "name": "राधन",
//                     "nameEn": "Radhana"
//                 },
//                 {
//                     "value": "150044",
//                     "name": "रानेपुर",
//                     "nameEn": "Ranepura"
//                 },
//                 {
//                     "value": "900924",
//                     "name": "राम कृष्‍ण नगर",
//                     "nameEn": "Rama Krishna Nagara"
//                 },
//                 {
//                     "value": "150130",
//                     "name": "रामनगर",
//                     "nameEn": "Ramanagara"
//                 },
//                 {
//                     "value": "150228",
//                     "name": "रामपुर किशोरसिंह",
//                     "nameEn": "Ramapura Kishorasinha"
//                 },
//                 {
//                     "value": "150048",
//                     "name": "रामपुर नरूवा",
//                     "nameEn": "Ramapura Naroova"
//                 },
//                 {
//                     "value": "149988",
//                     "name": "रामपुर शिवराजपुर",
//                     "nameEn": "Ramapura Shivarajapura"
//                 },
//                 {
//                     "value": "150141",
//                     "name": "रामपुर सखरेज",
//                     "nameEn": "Ramapura Sakhareja"
//                 },
//                 {
//                     "value": "150274",
//                     "name": "रायगोपालपुर",
//                     "nameEn": "Rayagopalapura"
//                 },
//                 {
//                     "value": "149979",
//                     "name": "रायपुर",
//                     "nameEn": "Rayapura"
//                 },
//                 {
//                     "value": "150052",
//                     "name": "रायपुर नदिहा",
//                     "nameEn": "Rayapura Nadiha"
//                 },
//                 {
//                     "value": "150179",
//                     "name": "रूद्रपुर बैल",
//                     "nameEn": "Roodrapura Baila"
//                 },
//                 {
//                     "value": "150277",
//                     "name": "रूद्रापुर",
//                     "nameEn": "Roodrapura"
//                 },
//                 {
//                     "value": "149888",
//                     "name": "रौगाँव",
//                     "nameEn": "RauGanw"
//                 },
//                 {
//                     "value": "150259",
//                     "name": "रौतापुर कलां",
//                     "nameEn": "Rautapura Kalan"
//                 },
//                 {
//                     "value": "150129",
//                     "name": "रौतापुर खुर्द",
//                     "nameEn": "Rautapura Khurd"
//                 },
//                 {
//                     "value": "150127",
//                     "name": "र्इंधना",
//                     "nameEn": "Rindhana"
//                 },
//                 {
//                     "value": "900909",
//                     "name": "लक्ष्मी बाई नगर",
//                     "nameEn": "Laksh्mee Baee Nagara"
//                 },
//                 {
//                     "value": "150246",
//                     "name": "लछिमनपुर तिवारियान",
//                     "nameEn": "Lachhimanapura Tivariyana"
//                 },
//                 {
//                     "value": "149994",
//                     "name": "लछिमनपुर मिश्रान",
//                     "nameEn": "Lachhimanapura Mishrana"
//                 },
//                 {
//                     "value": "149977",
//                     "name": "लालपुर",
//                     "nameEn": "Lalapura"
//                 },
//                 {
//                     "value": "900915",
//                     "name": "लाल बहादुर शास्त्री नगर",
//                     "nameEn": "Lala Bahadura Shastree Nagara"
//                 },
//                 {
//                     "value": "900912",
//                     "name": "लोहिया नगर",
//                     "nameEn": "Lohiya Nagara"
//                 },
//                 {
//                     "value": "150205",
//                     "name": "वदनपुर",
//                     "nameEn": "Vadanapura"
//                 },
//                 {
//                     "value": "220825",
//                     "name": "वरर्ाजपुर",
//                     "nameEn": "Varrajapura"
//                 },
//                 {
//                     "value": "150147",
//                     "name": "वाचीपुर",
//                     "nameEn": "Vacheepura"
//                 },
//                 {
//                     "value": "150220",
//                     "name": "वाजीदपुर",
//                     "nameEn": "Vajeedapura"
//                 },
//                 {
//                     "value": "150158",
//                     "name": "विकरू",
//                     "nameEn": "Vikaroo"
//                 },
//                 {
//                     "value": "900929",
//                     "name": "विकास नगर",
//                     "nameEn": "Vikasa Nagara"
//                 },
//                 {
//                     "value": "150255",
//                     "name": "विरोह",
//                     "nameEn": "Viroha"
//                 },
//                 {
//                     "value": "150232",
//                     "name": "विशुनपुर",
//                     "nameEn": "Vishunapura"
//                 },
//                 {
//                     "value": "900925",
//                     "name": "शहीद राजा सतीप्रसाद नगर",
//                     "nameEn": "Shaheeda Raja Sateeprasada Nagara"
//                 },
//                 {
//                     "value": "150281",
//                     "name": "शादीपुर",
//                     "nameEn": "Shadeepura"
//                 },
//                 {
//                     "value": "150111",
//                     "name": "शाहपुर कामा",
//                     "nameEn": "Shahpur Kama"
//                 },
//                 {
//                     "value": "150004",
//                     "name": "शाहपुर दूलू",
//                     "nameEn": "Shahpur Dooloo"
//                 },
//                 {
//                     "value": "150188",
//                     "name": "शाहपुर माल्हा",
//                     "nameEn": "Shahpur Malha"
//                 },
//                 {
//                     "value": "149957",
//                     "name": "शाहमपुर कोट",
//                     "nameEn": "Shahamapura Kota"
//                 },
//                 {
//                     "value": "220826",
//                     "name": "शाहमपुर पदुर्मन उर्फ गढ़ी",
//                     "nameEn": "Shahamapura Padurmana Urpha Garhee"
//                 },
//                 {
//                     "value": "149990",
//                     "name": "शिवपुरी",
//                     "nameEn": "Shivapuree"
//                 },
//                 {
//                     "value": "220827",
//                     "name": "शिवराजपुर",
//                     "nameEn": "Shivarajapura"
//                 },
//                 {
//                     "value": "150057",
//                     "name": "शुक्लापुर",
//                     "nameEn": "Shuklapura"
//                 },
//                 {
//                     "value": "150270",
//                     "name": "शेरपुर बैरा",
//                     "nameEn": "Sherapura Baira"
//                 },
//                 {
//                     "value": "149902",
//                     "name": "शेषपुर धर्मशाला",
//                     "nameEn": "Sheshapura Dhrmashala"
//                 },
//                 {
//                     "value": "150138",
//                     "name": "सकरवाँ",
//                     "nameEn": "Sakaravan"
//                 },
//                 {
//                     "value": "150146",
//                     "name": "सखरेज",
//                     "nameEn": "Sakhareja"
//                 },
//                 {
//                     "value": "149929",
//                     "name": "संजतीबादशाहपुर",
//                     "nameEn": "SnjateebadaShahpur"
//                 },
//                 {
//                     "value": "900920",
//                     "name": "सत्य प्रकाश मालवीय नगर",
//                     "nameEn": "Stya Prakasha Malaveeya Nagara"
//                 },
//                 {
//                     "value": "150074",
//                     "name": "सदिकामऊ",
//                     "nameEn": "Sadikamaoo"
//                 },
//                 {
//                     "value": "150245",
//                     "name": "सन्डीला",
//                     "nameEn": "Sndeela"
//                 },
//                 {
//                     "value": "150097",
//                     "name": "सबलपुर शिवराजपुर",
//                     "nameEn": "Sabalapura Shivarajapura"
//                 },
//                 {
//                     "value": "150189",
//                     "name": "सम्भरपुर मिश्रान",
//                     "nameEn": "Smbharapura Mishrana"
//                 },
//                 {
//                     "value": "149934",
//                     "name": "सम्भियापुर",
//                     "nameEn": "Smbhiyapura"
//                 },
//                 {
//                     "value": "900898",
//                     "name": "सरदार पटेल नगर",
//                     "nameEn": "Saradara Patela Nagara"
//                 },
//                 {
//                     "value": "150263",
//                     "name": "सरदारपुर",
//                     "nameEn": "Saradarapura"
//                 },
//                 {
//                     "value": "150082",
//                     "name": "सरांय गंग",
//                     "nameEn": "Saranya Gnga"
//                 },
//                 {
//                     "value": "150254",
//                     "name": "सरायछीतम",
//                     "nameEn": "Sarayachheetama"
//                 },
//                 {
//                     "value": "150045",
//                     "name": "सरिगवां",
//                     "nameEn": "Sarigavan"
//                 },
//                 {
//                     "value": "149923",
//                     "name": "सरैयाभूड़",
//                     "nameEn": "Saraiyabhoor"
//                 },
//                 {
//                     "value": "900907",
//                     "name": "सरोजनी नायडू नगर",
//                     "nameEn": "Sarojanee Nayadoo Nagara"
//                 },
//                 {
//                     "value": "150217",
//                     "name": "सलेमपुर बिठूर",
//                     "nameEn": "Salemapura Bithoora"
//                 },
//                 {
//                     "value": "150037",
//                     "name": "सलेमपुर बिल्हौर",
//                     "nameEn": "Salemapura Bilhaura"
//                 },
//                 {
//                     "value": "150262",
//                     "name": "सहज्योरा",
//                     "nameEn": "Sahjyora"
//                 },
//                 {
//                     "value": "150122",
//                     "name": "सिकन्दरपुरशिवराजपुर",
//                     "nameEn": "Sikndarapurashivarajapura"
//                 },
//                 {
//                     "value": "149893",
//                     "name": "सिघौंली",
//                     "nameEn": "Sighaunlee"
//                 },
//                 {
//                     "value": "150029",
//                     "name": "सिहुरादाराशिकोह",
//                     "nameEn": "Sihuradarashikoha"
//                 },
//                 {
//                     "value": "150257",
//                     "name": "सिहुरापुर",
//                     "nameEn": "Sihurapura"
//                 },
//                 {
//                     "value": "149993",
//                     "name": "सिहुरामऊ",
//                     "nameEn": "Sihuramaoo"
//                 },
//                 {
//                     "value": "150064",
//                     "name": "सुघरदेवा",
//                     "nameEn": "Sugharadeva"
//                 },
//                 {
//                     "value": "149999",
//                     "name": "सुजावलपुर",
//                     "nameEn": "Sujavalapura"
//                 },
//                 {
//                     "value": "150139",
//                     "name": "सुज्जापुर",
//                     "nameEn": "Sujjapura"
//                 },
//                 {
//                     "value": "150209",
//                     "name": "सुनौढ़ा",
//                     "nameEn": "Sunaurha"
//                 },
//                 {
//                     "value": "149956",
//                     "name": "सुभानपुर मुरादनगर",
//                     "nameEn": "Subhanapura Muradanagara"
//                 },
//                 {
//                     "value": "900923",
//                     "name": "सुभाष नगर",
//                     "nameEn": "Subhasha Nagara"
//                 },
//                 {
//                     "value": "900917",
//                     "name": "सुभाष नगर",
//                     "nameEn": "Subhasha Nagara"
//                 },
//                 {
//                     "value": "149978",
//                     "name": "सैबसू",
//                     "nameEn": "Saibasoo"
//                 },
//                 {
//                     "value": "150063",
//                     "name": "सैलहा",
//                     "nameEn": "Sailaha"
//                 },
//                 {
//                     "value": "150242",
//                     "name": "हरदासपुर",
//                     "nameEn": "Haradasapura"
//                 },
//                 {
//                     "value": "150053",
//                     "name": "हरनू",
//                     "nameEn": "Haranoo"
//                 },
//                 {
//                     "value": "149901",
//                     "name": "हलपुरा",
//                     "nameEn": "Halapura"
//                 },
//                 {
//                     "value": "150266",
//                     "name": "हंसपुर",
//                     "nameEn": "Hnsapura"
//                 },
//                 {
//                     "value": "149908",
//                     "name": "हसौलीकाजीगंज",
//                     "nameEn": "Hasauleekajeegnja"
//                 },
//                 {
//                     "value": "150017",
//                     "name": "हालामऊ",
//                     "nameEn": "Halamaoo"
//                 },
//                 {
//                     "value": "149916",
//                     "name": "हासिमपुर",
//                     "nameEn": "Hasimapura"
//                 },
//                 {
//                     "value": "150116",
//                     "name": "हिन्दूपुर",
//                     "nameEn": "Hindoopura"
//                 },
//                 {
//                     "value": "149895",
//                     "name": "हिलालपुर",
//                     "nameEn": "Hilalapura"
//                 },
//                 {
//                     "value": "150249",
//                     "name": "हृदयपुर मजरा गोगूमऊ",
//                     "nameEn": "Hridayapura Majara Gogoomaoo"
//                 }
//             ],
//             "213": [
//                 {
//                     "value": "150577",
//                     "name": "अकबरपुर झवैया",
//                     "nameEn": "Akbarpur Jhavaiya"
//                 },
//                 {
//                     "value": "150854",
//                     "name": "अकबरपुर बीरबल कछार",
//                     "nameEn": "Akbarpur Beerabala Kachhara"
//                 },
//                 {
//                     "value": "150855",
//                     "name": "अकबरपुर बीरबल बॉगर",
//                     "nameEn": "Akbarpur Beerabala Baogara"
//                 },
//                 {
//                     "value": "150859",
//                     "name": "अज्योरी",
//                     "nameEn": "Ajyoree"
//                 },
//                 {
//                     "value": "150875",
//                     "name": "अनोइया",
//                     "nameEn": "Anoiya"
//                 },
//                 {
//                     "value": "150789",
//                     "name": "अमिरतेपुर",
//                     "nameEn": "Amiratepura"
//                 },
//                 {
//                     "value": "150847",
//                     "name": "अमौली",
//                     "nameEn": "Amaulee"
//                 },
//                 {
//                     "value": "150589",
//                     "name": "अरखरी",
//                     "nameEn": "Arakharee"
//                 },
//                 {
//                     "value": "150825",
//                     "name": "अलादाद पुर",
//                     "nameEn": "Aladada Pur"
//                 },
//                 {
//                     "value": "150866",
//                     "name": "अलियापुर",
//                     "nameEn": "Aliyapura"
//                 },
//                 {
//                     "value": "900867",
//                     "name": "अशोक नगर उत्तरी",
//                     "nameEn": "Ashoka Nagara Uttaree"
//                 },
//                 {
//                     "value": "900863",
//                     "name": "अशोक नगर दक्षिणी",
//                     "nameEn": "Ashoka Nagara Dakshinee"
//                 },
//                 {
//                     "value": "150881",
//                     "name": "असगहा",
//                     "nameEn": "Asagaha"
//                 },
//                 {
//                     "value": "150763",
//                     "name": "असधना",
//                     "nameEn": "Asadhana"
//                 },
//                 {
//                     "value": "150586",
//                     "name": "असवाकपुर",
//                     "nameEn": "Asavakapura"
//                 },
//                 {
//                     "value": "150893",
//                     "name": "असवार मऊ",
//                     "nameEn": "Asavara Maoo"
//                 },
//                 {
//                     "value": "900866",
//                     "name": "अाछीमोहाल पूर्वी",
//                     "nameEn": "Aachheemohala Poorvee"
//                 },
//                 {
//                     "value": "150585",
//                     "name": "आगापुर",
//                     "nameEn": "Aagapura"
//                 },
//                 {
//                     "value": "900865",
//                     "name": "आछी मोहाल उत्तरी",
//                     "nameEn": "Aachhee Mohala Uttaree"
//                 },
//                 {
//                     "value": "900873",
//                     "name": "आछी मोहाल पश्चिमी",
//                     "nameEn": "Aachhee Mohala Pshchimee"
//                 },
//                 {
//                     "value": "150861",
//                     "name": "आनूपुर",
//                     "nameEn": "Aanoopura"
//                 },
//                 {
//                     "value": "900881",
//                     "name": "आशा नगर",
//                     "nameEn": "Aasha Nagara"
//                 },
//                 {
//                     "value": "150770",
//                     "name": "इछौली",
//                     "nameEn": "Ichhaulee"
//                 },
//                 {
//                     "value": "150837",
//                     "name": "इटौरा",
//                     "nameEn": "Itaura"
//                 },
//                 {
//                     "value": "150645",
//                     "name": "इतर्रा",
//                     "nameEn": "Itrra"
//                 },
//                 {
//                     "value": "150773",
//                     "name": "इस्माइलपुर कदीम",
//                     "nameEn": "Ismailapura Kadeema"
//                 },
//                 {
//                     "value": "150824",
//                     "name": "इस्माइलपुर जदीद",
//                     "nameEn": "Ismailapura Jadeeda"
//                 },
//                 {
//                     "value": "150732",
//                     "name": "उमरा",
//                     "nameEn": "Umara"
//                 },
//                 {
//                     "value": "150750",
//                     "name": "ऐमनपुर",
//                     "nameEn": "Aimanapura"
//                 },
//                 {
//                     "value": "150637",
//                     "name": "ऐमा रामसारी",
//                     "nameEn": "Aima Ramasaree"
//                 },
//                 {
//                     "value": "150642",
//                     "name": "ओरिया",
//                     "nameEn": "Oriya"
//                 },
//                 {
//                     "value": "150618",
//                     "name": "ककरहिया",
//                     "nameEn": "Kakarahiya"
//                 },
//                 {
//                     "value": "900882",
//                     "name": "कजियाना",
//                     "nameEn": "Kajiyana"
//                 },
//                 {
//                     "value": "900880",
//                     "name": "कटरा",
//                     "nameEn": "Katara"
//                 },
//                 {
//                     "value": "150820",
//                     "name": "कटरा",
//                     "nameEn": "Katara"
//                 },
//                 {
//                     "value": "150791",
//                     "name": "कटरी",
//                     "nameEn": "Kataree"
//                 },
//                 {
//                     "value": "150599",
//                     "name": "कठेठा",
//                     "nameEn": "Kathetha"
//                 },
//                 {
//                     "value": "150884",
//                     "name": "कंधौली",
//                     "nameEn": "Kndhaulee"
//                 },
//                 {
//                     "value": "150646",
//                     "name": "कन्ठीपुर",
//                     "nameEn": "Kntheepura"
//                 },
//                 {
//                     "value": "150751",
//                     "name": "कमालपुर",
//                     "nameEn": "Kamalapura"
//                 },
//                 {
//                     "value": "150790",
//                     "name": "काटर",
//                     "nameEn": "Katara"
//                 },
//                 {
//                     "value": "900884",
//                     "name": "काेटद्वार",
//                     "nameEn": "Kaetdvara"
//                 },
//                 {
//                     "value": "150849",
//                     "name": "किरार",
//                     "nameEn": "Kirara"
//                 },
//                 {
//                     "value": "150794",
//                     "name": "किरॉव",
//                     "nameEn": "Kiraova"
//                 },
//                 {
//                     "value": "220807",
//                     "name": "कुतुबुद्दीनपुर",
//                     "nameEn": "Kutubuddeenapura"
//                 },
//                 {
//                     "value": "150762",
//                     "name": "कुमखरा",
//                     "nameEn": "Kumakhara"
//                 },
//                 {
//                     "value": "150640",
//                     "name": "कुम्हेडि़या",
//                     "nameEn": "Kumhediya"
//                 },
//                 {
//                     "value": "150838",
//                     "name": "कुरसेड़ा",
//                     "nameEn": "Kurasera"
//                 },
//                 {
//                     "value": "150612",
//                     "name": "कुँवरपुर",
//                     "nameEn": "Kunvarapura"
//                 },
//                 {
//                     "value": "150752",
//                     "name": "कुवा खेडा",
//                     "nameEn": "Kuva Kheda"
//                 },
//                 {
//                     "value": "900870",
//                     "name": "कुष्माण्डा नगर",
//                     "nameEn": "Kushmanda Nagara"
//                 },
//                 {
//                     "value": "900879",
//                     "name": "कृष्णा नगर",
//                     "nameEn": "Krishna Nagara"
//                 },
//                 {
//                     "value": "150625",
//                     "name": "केवडि़या",
//                     "nameEn": "Kevadiya"
//                 },
//                 {
//                     "value": "150747",
//                     "name": "कैथा",
//                     "nameEn": "Kaitha"
//                 },
//                 {
//                     "value": "221517",
//                     "name": "कोटरा",
//                     "nameEn": "Kotara"
//                 },
//                 {
//                     "value": "220411",
//                     "name": "कोरिया पश्चिमी",
//                     "nameEn": "Koriya Pshchimee"
//                 },
//                 {
//                     "value": "220410",
//                     "name": "कोरिया पूर्वी",
//                     "nameEn": "Koriya Poorvee"
//                 },
//                 {
//                     "value": "150788",
//                     "name": "कोरौ",
//                     "nameEn": "Korau"
//                 },
//                 {
//                     "value": "150851",
//                     "name": "कोहरा",
//                     "nameEn": "Kohara"
//                 },
//                 {
//                     "value": "150784",
//                     "name": "खीरियाँ",
//                     "nameEn": "Kheeriyan"
//                 },
//                 {
//                     "value": "150592",
//                     "name": "खेमपुर",
//                     "nameEn": "Khemapura"
//                 },
//                 {
//                     "value": "150604",
//                     "name": "गढ.वा",
//                     "nameEn": "Gadha.va"
//                 },
//                 {
//                     "value": "150785",
//                     "name": "गढोलामऊ",
//                     "nameEn": "Gadholamaoo"
//                 },
//                 {
//                     "value": "150792",
//                     "name": "गराथा",
//                     "nameEn": "Garatha"
//                 },
//                 {
//                     "value": "900860",
//                     "name": "गांधीनगर",
//                     "nameEn": "Gandheenagara"
//                 },
//                 {
//                     "value": "150576",
//                     "name": "गिरसी",
//                     "nameEn": "Girasee"
//                 },
//                 {
//                     "value": "150823",
//                     "name": "गुच्चूपुर",
//                     "nameEn": "Guchchoopura"
//                 },
//                 {
//                     "value": "150841",
//                     "name": "गुजेला",
//                     "nameEn": "Gujela"
//                 },
//                 {
//                     "value": "900885",
//                     "name": "गूच्चूपुर",
//                     "nameEn": "Goochchoopura"
//                 },
//                 {
//                     "value": "150748",
//                     "name": "गूजा",
//                     "nameEn": "Gooja"
//                 },
//                 {
//                     "value": "150830",
//                     "name": "गोपालपुर घाटमपुर",
//                     "nameEn": "Gopalapura Ghatamapura"
//                 },
//                 {
//                     "value": "150583",
//                     "name": "गौरा",
//                     "nameEn": "Gaura"
//                 },
//                 {
//                     "value": "150857",
//                     "name": "गौरा छजमल",
//                     "nameEn": "Gaura Chhajamala"
//                 },
//                 {
//                     "value": "150877",
//                     "name": "गौरीघाटमपुर",
//                     "nameEn": "Gaureeghatamapura"
//                 },
//                 {
//                     "value": "220405",
//                     "name": "घाटमपुर देहात",
//                     "nameEn": "Ghatamapura Dehata"
//                 },
//                 {
//                     "value": "220406",
//                     "name": "घाटमपुर शहरी क्षेत्र",
//                     "nameEn": "Ghatamapura Shaharee Kshetr"
//                 },
//                 {
//                     "value": "150783",
//                     "name": "घुघुवा",
//                     "nameEn": "Ghughuva"
//                 },
//                 {
//                     "value": "150843",
//                     "name": "चक आदम",
//                     "nameEn": "Chak Aadama"
//                 },
//                 {
//                     "value": "150754",
//                     "name": "चक कासिमपुर",
//                     "nameEn": "Chak Kasimapura"
//                 },
//                 {
//                     "value": "150620",
//                     "name": "चकदरगाही",
//                     "nameEn": "Chakdaragahee"
//                 },
//                 {
//                     "value": "150821",
//                     "name": "चकबीरपुर",
//                     "nameEn": "Chakbeerapura"
//                 },
//                 {
//                     "value": "150742",
//                     "name": "चक सीहूपुर",
//                     "nameEn": "Chak Seehoopura"
//                 },
//                 {
//                     "value": "150623",
//                     "name": "चतुरीपुर",
//                     "nameEn": "Chatureepura"
//                 },
//                 {
//                     "value": "150766",
//                     "name": "चतुरीपुरवा",
//                     "nameEn": "Chatureepurava"
//                 },
//                 {
//                     "value": "150760",
//                     "name": "चपरेहटा",
//                     "nameEn": "Chaparehata"
//                 },
//                 {
//                     "value": "150605",
//                     "name": "चंवर",
//                     "nameEn": "Chnvara"
//                 },
//                 {
//                     "value": "150874",
//                     "name": "चितौली",
//                     "nameEn": "Chitaulee"
//                 },
//                 {
//                     "value": "150806",
//                     "name": "चिल्ली",
//                     "nameEn": "Chillee"
//                 },
//                 {
//                     "value": "150804",
//                     "name": "चौबेपुर",
//                     "nameEn": "Chaubepura"
//                 },
//                 {
//                     "value": "150619",
//                     "name": "छापा",
//                     "nameEn": "Chhapa"
//                 },
//                 {
//                     "value": "150636",
//                     "name": "छॉजा",
//                     "nameEn": "Chhaoja"
//                 },
//                 {
//                     "value": "150818",
//                     "name": "जलाला",
//                     "nameEn": "Jalala"
//                 },
//                 {
//                     "value": "150868",
//                     "name": "जल्ला",
//                     "nameEn": "Jlla"
//                 },
//                 {
//                     "value": "900878",
//                     "name": "जवाहर नगर उत्तरी",
//                     "nameEn": "Javahara Nagara Uttaree"
//                 },
//                 {
//                     "value": "900864",
//                     "name": "जवाहर नगर पश्चिमी",
//                     "nameEn": "Javahara Nagara Pshchimee"
//                 },
//                 {
//                     "value": "900861",
//                     "name": "जवाहरनगर पूर्वी द्वतीय",
//                     "nameEn": "Javaharanagara Poorvee Dvateeya"
//                 },
//                 {
//                     "value": "900871",
//                     "name": "जवाहर नगर पूर्वी प्रथम",
//                     "nameEn": "Javahara Nagara Poorvee Prathama"
//                 },
//                 {
//                     "value": "150627",
//                     "name": "जहाँगीराबाद",
//                     "nameEn": "Jahangeerabada"
//                 },
//                 {
//                     "value": "150826",
//                     "name": "जाजपुर",
//                     "nameEn": "Jajapura"
//                 },
//                 {
//                     "value": "150803",
//                     "name": "जुरैंया",
//                     "nameEn": "Jurainya"
//                 },
//                 {
//                     "value": "150828",
//                     "name": "जैतीपुर",
//                     "nameEn": "Jaiteepura"
//                 },
//                 {
//                     "value": "150800",
//                     "name": "टिकरी गौरवा कछार",
//                     "nameEn": "Tikaree Gaurava Kachhara"
//                 },
//                 {
//                     "value": "150801",
//                     "name": "टिकरी गौरवा बॉगर",
//                     "nameEn": "Tikaree Gaurava Baogara"
//                 },
//                 {
//                     "value": "150869",
//                     "name": "टिकवॉपुर",
//                     "nameEn": "Tikavaopura"
//                 },
//                 {
//                     "value": "150769",
//                     "name": "डोभा",
//                     "nameEn": "Dobha"
//                 },
//                 {
//                     "value": "150848",
//                     "name": "डोहरू",
//                     "nameEn": "Doharoo"
//                 },
//                 {
//                     "value": "150777",
//                     "name": "तहरापुर",
//                     "nameEn": "Taharapura"
//                 },
//                 {
//                     "value": "150609",
//                     "name": "तारगांव घाटमपुर",
//                     "nameEn": "TaraGanw Ghatamapura"
//                 },
//                 {
//                     "value": "150611",
//                     "name": "तिलसड़ा",
//                     "nameEn": "Tilasara"
//                 },
//                 {
//                     "value": "150816",
//                     "name": "तिलहली",
//                     "nameEn": "Tilahalee"
//                 },
//                 {
//                     "value": "150613",
//                     "name": "तेजपुर",
//                     "nameEn": "Tejapura"
//                 },
//                 {
//                     "value": "150596",
//                     "name": "दतारी",
//                     "nameEn": "Dataree"
//                 },
//                 {
//                     "value": "150582",
//                     "name": "दलई का पुरवा",
//                     "nameEn": "Dalaee Ka Purava"
//                 },
//                 {
//                     "value": "150865",
//                     "name": "दहिलर अव्वल",
//                     "nameEn": "Dahilara Avvala"
//                 },
//                 {
//                     "value": "150864",
//                     "name": "दहिलर सानी",
//                     "nameEn": "Dahilara Sanee"
//                 },
//                 {
//                     "value": "150580",
//                     "name": "दहेली",
//                     "nameEn": "Dahelee"
//                 },
//                 {
//                     "value": "150597",
//                     "name": "दिवली",
//                     "nameEn": "Divalee"
//                 },
//                 {
//                     "value": "150578",
//                     "name": "दुरौली",
//                     "nameEn": "Duraulee"
//                 },
//                 {
//                     "value": "150641",
//                     "name": "देवरा",
//                     "nameEn": "Devara"
//                 },
//                 {
//                     "value": "150797",
//                     "name": "दौलतपुर घाटमपुर",
//                     "nameEn": "Daulatapura Ghatamapura"
//                 },
//                 {
//                     "value": "150764",
//                     "name": "धमना बुजुर्ग",
//                     "nameEn": "Dhamana Bujurga"
//                 },
//                 {
//                     "value": "150885",
//                     "name": "धरछुआ",
//                     "nameEn": "Dharachhuaa"
//                 },
//                 {
//                     "value": "150867",
//                     "name": "धरमंगदपुर",
//                     "nameEn": "Dharamngadapura"
//                 },
//                 {
//                     "value": "150630",
//                     "name": "धरमपुर घाटमपुर",
//                     "nameEn": "Dharamapura Ghatamapura"
//                 },
//                 {
//                     "value": "150871",
//                     "name": "धीरपुर",
//                     "nameEn": "Dheerapura"
//                 },
//                 {
//                     "value": "220808",
//                     "name": "धुरऊपुर",
//                     "nameEn": "Dhuraoopura"
//                 },
//                 {
//                     "value": "150608",
//                     "name": "नन्दना",
//                     "nameEn": "Nndana"
//                 },
//                 {
//                     "value": "150622",
//                     "name": "नरसिंहपुर",
//                     "nameEn": "Narasinhapura"
//                 },
//                 {
//                     "value": "150839",
//                     "name": "नरायनपुर घाटमपुर",
//                     "nameEn": "Narayanapura Ghatamapura"
//                 },
//                 {
//                     "value": "150755",
//                     "name": "नवही",
//                     "nameEn": "Navahee"
//                 },
//                 {
//                     "value": "220809",
//                     "name": "नवेड़ी",
//                     "nameEn": "Naveree"
//                 },
//                 {
//                     "value": "150815",
//                     "name": "निमधा",
//                     "nameEn": "Nimadha"
//                 },
//                 {
//                     "value": "150796",
//                     "name": "निहुरा",
//                     "nameEn": "Nihura"
//                 },
//                 {
//                     "value": "900859",
//                     "name": "नौबस्ता पश्‍चिमी",
//                     "nameEn": "Naubsta Pshchimee"
//                 },
//                 {
//                     "value": "900876",
//                     "name": "नौबस्ता पूर्वी",
//                     "nameEn": "Naubsta Poorvee"
//                 },
//                 {
//                     "value": "150745",
//                     "name": "नौरंगा",
//                     "nameEn": "Naurnga"
//                 },
//                 {
//                     "value": "900869",
//                     "name": "पचखुरा",
//                     "nameEn": "Pachakhura"
//                 },
//                 {
//                     "value": "150761",
//                     "name": "पचखुरा",
//                     "nameEn": "Pachakhura"
//                 },
//                 {
//                     "value": "150882",
//                     "name": "पड़री गंगादीन",
//                     "nameEn": "Parree Gngadeena"
//                 },
//                 {
//                     "value": "150631",
//                     "name": "पडरी लालपुर",
//                     "nameEn": "Padaree Lalapura"
//                 },
//                 {
//                     "value": "150598",
//                     "name": "पतरसा",
//                     "nameEn": "Patarasa"
//                 },
//                 {
//                     "value": "150624",
//                     "name": "पतारा",
//                     "nameEn": "Patara"
//                 },
//                 {
//                     "value": "150735",
//                     "name": "पतारी",
//                     "nameEn": "Pataree"
//                 },
//                 {
//                     "value": "220413",
//                     "name": "परास द्वितीय खंड",
//                     "nameEn": "Parasa Dviteeya Khnda"
//                 },
//                 {
//                     "value": "220412",
//                     "name": "परास प्रथम खंड",
//                     "nameEn": "Parasa Prathama Khnda"
//                 },
//                 {
//                     "value": "150829",
//                     "name": "पल्टूपुर",
//                     "nameEn": "Pltoopura"
//                 },
//                 {
//                     "value": "150727",
//                     "name": "पसेमा",
//                     "nameEn": "Pasema"
//                 },
//                 {
//                     "value": "150647",
//                     "name": "पहेवा",
//                     "nameEn": "Paheva"
//                 },
//                 {
//                     "value": "150811",
//                     "name": "पाराचांद",
//                     "nameEn": "Parachanda"
//                 },
//                 {
//                     "value": "150591",
//                     "name": "पाराराइब",
//                     "nameEn": "Pararaiba"
//                 },
//                 {
//                     "value": "150728",
//                     "name": "पासीखेडा",
//                     "nameEn": "Paseekheda"
//                 },
//                 {
//                     "value": "150832",
//                     "name": "फत्तेपुर",
//                     "nameEn": "Phttepura"
//                 },
//                 {
//                     "value": "150786",
//                     "name": "बक्सरा",
//                     "nameEn": "Bksara"
//                 },
//                 {
//                     "value": "150890",
//                     "name": "बगरिया",
//                     "nameEn": "Bagariya"
//                 },
//                 {
//                     "value": "150787",
//                     "name": "बदलेसिमनापुर",
//                     "nameEn": "Badalesimanapura"
//                 },
//                 {
//                     "value": "150607",
//                     "name": "बम्बुराहा",
//                     "nameEn": "Bmburaha"
//                 },
//                 {
//                     "value": "150853",
//                     "name": "बम्हनटिकरी",
//                     "nameEn": "Bmhanatikaree"
//                 },
//                 {
//                     "value": "150644",
//                     "name": "बम्हौरा",
//                     "nameEn": "Bmhaura"
//                 },
//                 {
//                     "value": "150872",
//                     "name": "बम्हौरी",
//                     "nameEn": "Bmhauree"
//                 },
//                 {
//                     "value": "150610",
//                     "name": "बरनॉव",
//                     "nameEn": "Baranaova"
//                 },
//                 {
//                     "value": "150880",
//                     "name": "बरीपाल",
//                     "nameEn": "Bareepala"
//                 },
//                 {
//                     "value": "150756",
//                     "name": "बरी महतैन",
//                     "nameEn": "Baree Mahataina"
//                 },
//                 {
//                     "value": "150600",
//                     "name": "बरौली",
//                     "nameEn": "Baraulee"
//                 },
//                 {
//                     "value": "150617",
//                     "name": "बलरामपुर",
//                     "nameEn": "Balaramapura"
//                 },
//                 {
//                     "value": "150614",
//                     "name": "बलहापाराकलाँ",
//                     "nameEn": "Balahaparakalan"
//                 },
//                 {
//                     "value": "150615",
//                     "name": "बलहापारा खुर्द",
//                     "nameEn": "Balahapara Khurd"
//                 },
//                 {
//                     "value": "900868",
//                     "name": "बसन्त विहार",
//                     "nameEn": "Basnta Vihara"
//                 },
//                 {
//                     "value": "150768",
//                     "name": "बसौरा",
//                     "nameEn": "Basaura"
//                 },
//                 {
//                     "value": "150850",
//                     "name": "बहरौली",
//                     "nameEn": "Baharaulee"
//                 },
//                 {
//                     "value": "150887",
//                     "name": "बांध",
//                     "nameEn": "Bandha"
//                 },
//                 {
//                     "value": "150584",
//                     "name": "बारा दौलतपुर",
//                     "nameEn": "Bara Daulatapura"
//                 },
//                 {
//                     "value": "150876",
//                     "name": "बावन",
//                     "nameEn": "Bavana"
//                 },
//                 {
//                     "value": "150878",
//                     "name": "बिरिया",
//                     "nameEn": "Biriya"
//                 },
//                 {
//                     "value": "150873",
//                     "name": "बिलगवाँ",
//                     "nameEn": "Bilagavan"
//                 },
//                 {
//                     "value": "150775",
//                     "name": "बीछीपुर",
//                     "nameEn": "Beechheepura"
//                 },
//                 {
//                     "value": "150862",
//                     "name": "बीबीपुर",
//                     "nameEn": "Beebeepura"
//                 },
//                 {
//                     "value": "150822",
//                     "name": "बीरपुर",
//                     "nameEn": "Beerapura"
//                 },
//                 {
//                     "value": "150739",
//                     "name": "बीहूपुर",
//                     "nameEn": "Beehoopura"
//                 },
//                 {
//                     "value": "220810",
//                     "name": "बुढ़ानपुर",
//                     "nameEn": "Burhanapura"
//                 },
//                 {
//                     "value": "150808",
//                     "name": "बेंन्दा",
//                     "nameEn": "Bennda"
//                 },
//                 {
//                     "value": "150603",
//                     "name": "बेहुँटा",
//                     "nameEn": "Behunta"
//                 },
//                 {
//                     "value": "150753",
//                     "name": "बैरीपुर",
//                     "nameEn": "Baireepura"
//                 },
//                 {
//                     "value": "150835",
//                     "name": "भटपुरवा",
//                     "nameEn": "Bhatapurava"
//                 },
//                 {
//                     "value": "150819",
//                     "name": "भदरस",
//                     "nameEn": "Bhadarasa"
//                 },
//                 {
//                     "value": "150746",
//                     "name": "भदवारा",
//                     "nameEn": "Bhadavara"
//                 },
//                 {
//                     "value": "150635",
//                     "name": "भदेवना",
//                     "nameEn": "Bhadevana"
//                 },
//                 {
//                     "value": "150858",
//                     "name": "मऊनखत",
//                     "nameEn": "Maoonakhata"
//                 },
//                 {
//                     "value": "150798",
//                     "name": "मकरंदपुर बांगर",
//                     "nameEn": "Makarndapura Bangara"
//                 },
//                 {
//                     "value": "150799",
//                     "name": "मकरन्दपुर कछार",
//                     "nameEn": "Makarndapura Kachhara"
//                 },
//                 {
//                     "value": "150771",
//                     "name": "मखौली",
//                     "nameEn": "Makhaulee"
//                 },
//                 {
//                     "value": "150581",
//                     "name": "मछैला",
//                     "nameEn": "Machhaila"
//                 },
//                 {
//                     "value": "150802",
//                     "name": "मढ.ा",
//                     "nameEn": "Madha.a"
//                 },
//                 {
//                     "value": "150776",
//                     "name": "मदनपुर",
//                     "nameEn": "Madanapura"
//                 },
//                 {
//                     "value": "150879",
//                     "name": "मदुरी",
//                     "nameEn": "Maduree"
//                 },
//                 {
//                     "value": "150767",
//                     "name": "मनिहारपुर",
//                     "nameEn": "Maniharapura"
//                 },
//                 {
//                     "value": "150852",
//                     "name": "मया का पुरवा",
//                     "nameEn": "Maya Ka Purava"
//                 },
//                 {
//                     "value": "150827",
//                     "name": "मवई भच्छन",
//                     "nameEn": "Mavaee Bhchchhana"
//                 },
//                 {
//                     "value": "150774",
//                     "name": "मवई माधौ",
//                     "nameEn": "Mavaee Madhau"
//                 },
//                 {
//                     "value": "150639",
//                     "name": "मिजर्ापुर",
//                     "nameEn": "Mijrapura"
//                 },
//                 {
//                     "value": "150606",
//                     "name": "मिरानपुर",
//                     "nameEn": "Miranapura"
//                 },
//                 {
//                     "value": "150741",
//                     "name": "मिलकिनपुर",
//                     "nameEn": "Milakinapura"
//                 },
//                 {
//                     "value": "150795",
//                     "name": "मुइय्या",
//                     "nameEn": "Muiyya"
//                 },
//                 {
//                     "value": "150810",
//                     "name": "मुस्तफाबाद",
//                     "nameEn": "Mustaphabada"
//                 },
//                 {
//                     "value": "150757",
//                     "name": "मुहम्मदपुर घाटमपुर",
//                     "nameEn": "Muhmmadapura Ghatamapura"
//                 },
//                 {
//                     "value": "150587",
//                     "name": "मूसेपुर",
//                     "nameEn": "Moosepura"
//                 },
//                 {
//                     "value": "150833",
//                     "name": "मेहरअलीपुर",
//                     "nameEn": "Meharaaleepura"
//                 },
//                 {
//                     "value": "150886",
//                     "name": "मैधरी",
//                     "nameEn": "Maidharee"
//                 },
//                 {
//                     "value": "150602",
//                     "name": "मोतीपुर",
//                     "nameEn": "Moteepura"
//                 },
//                 {
//                     "value": "150889",
//                     "name": "मोहटा",
//                     "nameEn": "Mohata"
//                 },
//                 {
//                     "value": "150738",
//                     "name": "रक्शा",
//                     "nameEn": "Rksha"
//                 },
//                 {
//                     "value": "220811",
//                     "name": "रठिगाँव",
//                     "nameEn": "RathiGanw"
//                 },
//                 {
//                     "value": "150842",
//                     "name": "रडौली",
//                     "nameEn": "Radaulee"
//                 },
//                 {
//                     "value": "150616",
//                     "name": "रतनपुर",
//                     "nameEn": "Ratanapura"
//                 },
//                 {
//                     "value": "150781",
//                     "name": "रहती एमा",
//                     "nameEn": "Rahatee Ema"
//                 },
//                 {
//                     "value": "150779",
//                     "name": "रहती खालसा",
//                     "nameEn": "Rahatee Khalasa"
//                 },
//                 {
//                     "value": "150888",
//                     "name": "रामपुर",
//                     "nameEn": "Ramapura"
//                 },
//                 {
//                     "value": "150812",
//                     "name": "रामपुर निहुरा",
//                     "nameEn": "Ramapura Nihura"
//                 },
//                 {
//                     "value": "150638",
//                     "name": "रामसारी",
//                     "nameEn": "Ramasaree"
//                 },
//                 {
//                     "value": "150629",
//                     "name": "रायपुर",
//                     "nameEn": "Rayapura"
//                 },
//                 {
//                     "value": "150737",
//                     "name": "रार",
//                     "nameEn": "Rara"
//                 },
//                 {
//                     "value": "150807",
//                     "name": "राहा",
//                     "nameEn": "Raha"
//                 },
//                 {
//                     "value": "150772",
//                     "name": "रेवना",
//                     "nameEn": "Revana"
//                 },
//                 {
//                     "value": "150844",
//                     "name": "रैपुरा",
//                     "nameEn": "Raipura"
//                 },
//                 {
//                     "value": "220813",
//                     "name": "लहुरीमऊ कासिमपुर",
//                     "nameEn": "Lahureemaoo Kasimapura"
//                 },
//                 {
//                     "value": "150817",
//                     "name": "लौकहा",
//                     "nameEn": "Laukaha"
//                 },
//                 {
//                     "value": "150758",
//                     "name": "लौली",
//                     "nameEn": "Laulee"
//                 },
//                 {
//                     "value": "220814",
//                     "name": "वनहरी",
//                     "nameEn": "Vanaharee"
//                 },
//                 {
//                     "value": "900862",
//                     "name": "शास्त्री नगर",
//                     "nameEn": "Shastree Nagara"
//                 },
//                 {
//                     "value": "900877",
//                     "name": "शिवपुरी पश्चिमी",
//                     "nameEn": "Shivapuree Pshchimee"
//                 },
//                 {
//                     "value": "900874",
//                     "name": "शिवपुरी पूर्वी",
//                     "nameEn": "Shivapuree Poorvee"
//                 },
//                 {
//                     "value": "150834",
//                     "name": "शेखपुर",
//                     "nameEn": "Shekhapura"
//                 },
//                 {
//                     "value": "900872",
//                     "name": "शेखवाडा",
//                     "nameEn": "Shekhavada"
//                 },
//                 {
//                     "value": "150782",
//                     "name": "श्रीनगर",
//                     "nameEn": "Shreenagara"
//                 },
//                 {
//                     "value": "150621",
//                     "name": "संचितपुर",
//                     "nameEn": "Snchitapura"
//                 },
//                 {
//                     "value": "150870",
//                     "name": "सजेती",
//                     "nameEn": "Sajetee"
//                 },
//                 {
//                     "value": "150736",
//                     "name": "सण्डौली",
//                     "nameEn": "Sndaulee"
//                 },
//                 {
//                     "value": "150632",
//                     "name": "सतरहुली",
//                     "nameEn": "Satarahulee"
//                 },
//                 {
//                     "value": "150894",
//                     "name": "समुही",
//                     "nameEn": "Samuhee"
//                 },
//                 {
//                     "value": "150595",
//                     "name": "सरखेलपुर",
//                     "nameEn": "Sarakhelapura"
//                 },
//                 {
//                     "value": "150590",
//                     "name": "सरगवाँ",
//                     "nameEn": "Saragavan"
//                 },
//                 {
//                     "value": "150845",
//                     "name": "सरगाँव",
//                     "nameEn": "SaraGanw"
//                 },
//                 {
//                     "value": "150633",
//                     "name": "सरांय",
//                     "nameEn": "Saranya"
//                 },
//                 {
//                     "value": "150780",
//                     "name": "सरैंया",
//                     "nameEn": "Sarainya"
//                 },
//                 {
//                     "value": "150778",
//                     "name": "साखा जनवारा",
//                     "nameEn": "Sakha Janavara"
//                 },
//                 {
//                     "value": "150759",
//                     "name": "साखाहारी",
//                     "nameEn": "Sakhaharee"
//                 },
//                 {
//                     "value": "150720",
//                     "name": "सिकहुला",
//                     "nameEn": "Sikahula"
//                 },
//                 {
//                     "value": "150891",
//                     "name": "सिधौल",
//                     "nameEn": "Sidhaula"
//                 },
//                 {
//                     "value": "150594",
//                     "name": "सिमौर",
//                     "nameEn": "Simaura"
//                 },
//                 {
//                     "value": "150883",
//                     "name": "सिरसा",
//                     "nameEn": "Sirasa"
//                 },
//                 {
//                     "value": "150626",
//                     "name": "सिरोमनपुर",
//                     "nameEn": "Siromanapura"
//                 },
//                 {
//                     "value": "150634",
//                     "name": "सिरोह",
//                     "nameEn": "Siroha"
//                 },
//                 {
//                     "value": "150593",
//                     "name": "सिल्हौली",
//                     "nameEn": "Silhaulee"
//                 },
//                 {
//                     "value": "900886",
//                     "name": "सिहारी",
//                     "nameEn": "Siharee"
//                 },
//                 {
//                     "value": "220407",
//                     "name": "सिहारी देहात क्षेत्र",
//                     "nameEn": "Siharee Dehata Kshetr"
//                 },
//                 {
//                     "value": "220408",
//                     "name": "सिहारी नगर क्षे",
//                     "nameEn": "Siharee Nagara Kshe"
//                 },
//                 {
//                     "value": "150743",
//                     "name": "सीहूपुर",
//                     "nameEn": "Seehoopura"
//                 },
//                 {
//                     "value": "150814",
//                     "name": "सूखापुर",
//                     "nameEn": "Sookhapura"
//                 },
//                 {
//                     "value": "150601",
//                     "name": "स्योढ़ारी",
//                     "nameEn": "Syorharee"
//                 },
//                 {
//                     "value": "150840",
//                     "name": "स्योदी ललईपुर",
//                     "nameEn": "Syodee Lalaeepura"
//                 },
//                 {
//                     "value": "150813",
//                     "name": "हथेरुवा",
//                     "nameEn": "Hatheruva"
//                 },
//                 {
//                     "value": "150588",
//                     "name": "हथेही",
//                     "nameEn": "Hathehee"
//                 },
//                 {
//                     "value": "150860",
//                     "name": "हमिरामऊ",
//                     "nameEn": "Hamiramaoo"
//                 },
//                 {
//                     "value": "150863",
//                     "name": "हरदौली",
//                     "nameEn": "Haradaulee"
//                 },
//                 {
//                     "value": "150765",
//                     "name": "हरवसपुर",
//                     "nameEn": "Haravasapura"
//                 },
//                 {
//                     "value": "900883",
//                     "name": "हाफिजपुर",
//                     "nameEn": "Haphijapura"
//                 },
//                 {
//                     "value": "150628",
//                     "name": "हिरनी",
//                     "nameEn": "Hiranee"
//                 },
//                 {
//                     "value": "150740",
//                     "name": "हुसेना",
//                     "nameEn": "Husena"
//                 }
//             ],
//             "370": [
//                 {
//                     "value": "150707",
//                     "name": "अकबरपुर बरुई",
//                     "nameEn": "Akbarpur Baruee"
//                 },
//                 {
//                     "value": "150564",
//                     "name": "अखरी",
//                     "nameEn": "Akharee"
//                 },
//                 {
//                     "value": "150500",
//                     "name": "अमौली",
//                     "nameEn": "Amaulee"
//                 },
//                 {
//                     "value": "150699",
//                     "name": "अरंज बनकट",
//                     "nameEn": "Arnja Banakata"
//                 },
//                 {
//                     "value": "150704",
//                     "name": "अरंजराम",
//                     "nameEn": "Arnjarama"
//                 },
//                 {
//                     "value": "150703",
//                     "name": "अरंजराय",
//                     "nameEn": "Arnjaraya"
//                 },
//                 {
//                     "value": "150700",
//                     "name": "अरंजहामी",
//                     "nameEn": "Arnjahamee"
//                 },
//                 {
//                     "value": "150716",
//                     "name": "असेनियाँ",
//                     "nameEn": "Aseniyan"
//                 },
//                 {
//                     "value": "150680",
//                     "name": "ईटारोरा",
//                     "nameEn": "Eetarora"
//                 },
//                 {
//                     "value": "150469",
//                     "name": "ईश्वरी खेडा",
//                     "nameEn": "Eeshvaree Kheda"
//                 },
//                 {
//                     "value": "220302",
//                     "name": "उचटी",
//                     "nameEn": "Uchatee"
//                 },
//                 {
//                     "value": "150730",
//                     "name": "उदईपुर",
//                     "nameEn": "Udaeepura"
//                 },
//                 {
//                     "value": "150514",
//                     "name": "उमरना",
//                     "nameEn": "Umarana"
//                 },
//                 {
//                     "value": "150734",
//                     "name": "उमरी",
//                     "nameEn": "Umaree"
//                 },
//                 {
//                     "value": "150494",
//                     "name": "ऐमा",
//                     "nameEn": "Aima"
//                 },
//                 {
//                     "value": "150472",
//                     "name": "ककराली",
//                     "nameEn": "Kakaralee"
//                 },
//                 {
//                     "value": "150516",
//                     "name": "कटरी उमरना",
//                     "nameEn": "Kataree Umarana"
//                 },
//                 {
//                     "value": "150509",
//                     "name": "कटरी जमदा",
//                     "nameEn": "Kataree Jamada"
//                 },
//                 {
//                     "value": "150533",
//                     "name": "कटरी डोमनपुर",
//                     "nameEn": "Kataree Domanapura"
//                 },
//                 {
//                     "value": "150495",
//                     "name": "कटरी ढोढीं",
//                     "nameEn": "Kataree Dhodheen"
//                 },
//                 {
//                     "value": "150519",
//                     "name": "कटरी नरायनपुर",
//                     "nameEn": "Kataree Narayanapura"
//                 },
//                 {
//                     "value": "150530",
//                     "name": "कटरी नागापुर",
//                     "nameEn": "Kataree Nagapura"
//                 },
//                 {
//                     "value": "150522",
//                     "name": "कटरी बगहा",
//                     "nameEn": "Kataree Bagaha"
//                 },
//                 {
//                     "value": "150508",
//                     "name": "कटरी भिटारा",
//                     "nameEn": "Kataree Bhitara"
//                 },
//                 {
//                     "value": "150515",
//                     "name": "कटरी राजापुर",
//                     "nameEn": "Kataree Rajapura"
//                 },
//                 {
//                     "value": "150523",
//                     "name": "कटरी विपौसी",
//                     "nameEn": "Kataree Vipausee"
//                 },
//                 {
//                     "value": "150518",
//                     "name": "कटरी सफीपुर नर्वल",
//                     "nameEn": "Kataree Sapheepura Nrvala"
//                 },
//                 {
//                     "value": "150510",
//                     "name": "कटरी सैदलीपुर",
//                     "nameEn": "Kataree Saidaleepura"
//                 },
//                 {
//                     "value": "150441",
//                     "name": "कठोंगर",
//                     "nameEn": "Kathongara"
//                 },
//                 {
//                     "value": "220806",
//                     "name": "कन्हरा",
//                     "nameEn": "Knhara"
//                 },
//                 {
//                     "value": "150525",
//                     "name": "कमालपुर नर्वल",
//                     "nameEn": "Kamalapura Nrvala"
//                 },
//                 {
//                     "value": "150682",
//                     "name": "करचुलीपुर",
//                     "nameEn": "Karachuleepura"
//                 },
//                 {
//                     "value": "150493",
//                     "name": "करबी गाँव सलेमपुर",
//                     "nameEn": "Karabee Ganw Salemapura"
//                 },
//                 {
//                     "value": "150570",
//                     "name": "करविगवाँ साढ़",
//                     "nameEn": "Karavigavan Sarh"
//                 },
//                 {
//                     "value": "150660",
//                     "name": "कलेका पुरवा",
//                     "nameEn": "Kaleka Purava"
//                 },
//                 {
//                     "value": "150443",
//                     "name": "कसिगवाँ",
//                     "nameEn": "Kasigavan"
//                 },
//                 {
//                     "value": "150664",
//                     "name": "काजीखेड़ा",
//                     "nameEn": "Kajeekhera"
//                 },
//                 {
//                     "value": "150697",
//                     "name": "कीसाखेडा",
//                     "nameEn": "Keesakheda"
//                 },
//                 {
//                     "value": "150665",
//                     "name": "कुटिया रामपुर",
//                     "nameEn": "Kutiya Ramapura"
//                 },
//                 {
//                     "value": "150701",
//                     "name": "कुड़नी",
//                     "nameEn": "Kurnee"
//                 },
//                 {
//                     "value": "150450",
//                     "name": "कुढ़गांव",
//                     "nameEn": "KurhGanw"
//                 },
//                 {
//                     "value": "150452",
//                     "name": "कुढ़वा",
//                     "nameEn": "Kurhva"
//                 },
//                 {
//                     "value": "150668",
//                     "name": "कुन्दौली",
//                     "nameEn": "Kundaulee"
//                 },
//                 {
//                     "value": "150722",
//                     "name": "कुम्हऊपुर",
//                     "nameEn": "Kumhaoopura"
//                 },
//                 {
//                     "value": "150444",
//                     "name": "कुम्हऊपुर",
//                     "nameEn": "Kumhaoopura"
//                 },
//                 {
//                     "value": "150793",
//                     "name": "कुरथा",
//                     "nameEn": "Kuratha"
//                 },
//                 {
//                     "value": "150559",
//                     "name": "कुरियानी",
//                     "nameEn": "Kuriyanee"
//                 },
//                 {
//                     "value": "150537",
//                     "name": "कुशमरा",
//                     "nameEn": "Kushamara"
//                 },
//                 {
//                     "value": "150447",
//                     "name": "कोरियां",
//                     "nameEn": "Koriyan"
//                 },
//                 {
//                     "value": "150528",
//                     "name": "खरौटी",
//                     "nameEn": "Kharautee"
//                 },
//                 {
//                     "value": "150492",
//                     "name": "खुजऊपुर",
//                     "nameEn": "Khujaoopura"
//                 },
//                 {
//                     "value": "150470",
//                     "name": "खुजौली",
//                     "nameEn": "Khujaulee"
//                 },
//                 {
//                     "value": "150483",
//                     "name": "ख्वाजगीपुर",
//                     "nameEn": "Khvajageepura"
//                 },
//                 {
//                     "value": "150484",
//                     "name": "गंगभेव",
//                     "nameEn": "Gngabheva"
//                 },
//                 {
//                     "value": "150473",
//                     "name": "गढ़ी नर्वल",
//                     "nameEn": "Garhee Nrvala"
//                 },
//                 {
//                     "value": "150698",
//                     "name": "गाजीपुर",
//                     "nameEn": "Gajeepura"
//                 },
//                 {
//                     "value": "150729",
//                     "name": "गुगुरा",
//                     "nameEn": "Gugura"
//                 },
//                 {
//                     "value": "150681",
//                     "name": "गोपालपुर नर्वल",
//                     "nameEn": "Gopalapura Nrvala"
//                 },
//                 {
//                     "value": "220327",
//                     "name": "गौरिया",
//                     "nameEn": "Gauriya"
//                 },
//                 {
//                     "value": "150666",
//                     "name": "गौरी ककरा",
//                     "nameEn": "Gauree Kakara"
//                 },
//                 {
//                     "value": "150708",
//                     "name": "गौरी नर्वल",
//                     "nameEn": "Gauree Nrvala"
//                 },
//                 {
//                     "value": "150694",
//                     "name": "चतुरीखेड़ा",
//                     "nameEn": "Chatureekhera"
//                 },
//                 {
//                     "value": "150554",
//                     "name": "चन्दनपुर",
//                     "nameEn": "Chndanapura"
//                 },
//                 {
//                     "value": "150507",
//                     "name": "चाँदनपुर",
//                     "nameEn": "Chandanapura"
//                 },
//                 {
//                     "value": "150693",
//                     "name": "चिरला",
//                     "nameEn": "Chirala"
//                 },
//                 {
//                     "value": "150671",
//                     "name": "चिरली",
//                     "nameEn": "Chiralee"
//                 },
//                 {
//                     "value": "220333",
//                     "name": "छतमरा",
//                     "nameEn": "Chhatamara"
//                 },
//                 {
//                     "value": "150657",
//                     "name": "छतरापुर",
//                     "nameEn": "Chhatarapura"
//                 },
//                 {
//                     "value": "150688",
//                     "name": "छतेरुवा",
//                     "nameEn": "Chhateruva"
//                 },
//                 {
//                     "value": "150505",
//                     "name": "जमदा",
//                     "nameEn": "Jamada"
//                 },
//                 {
//                     "value": "150451",
//                     "name": "जरकला",
//                     "nameEn": "Jarakala"
//                 },
//                 {
//                     "value": "150705",
//                     "name": "जरसरा",
//                     "nameEn": "Jarasara"
//                 },
//                 {
//                     "value": "150556",
//                     "name": "टिकरा चौहान",
//                     "nameEn": "Tikara Chauhana"
//                 },
//                 {
//                     "value": "220381",
//                     "name": "टिकरा पैगम्बरपुर",
//                     "nameEn": "Tikara Paigmbarapura"
//                 },
//                 {
//                     "value": "220382",
//                     "name": "टिकरिया",
//                     "nameEn": "Tikariya"
//                 },
//                 {
//                     "value": "150543",
//                     "name": "टीकर कान्ह",
//                     "nameEn": "Teekara Kanha"
//                 },
//                 {
//                     "value": "150553",
//                     "name": "टीकरभाऊ",
//                     "nameEn": "Teekarabhaoo"
//                 },
//                 {
//                     "value": "150486",
//                     "name": "टौस",
//                     "nameEn": "Tausa"
//                 },
//                 {
//                     "value": "150534",
//                     "name": "डोमनपुर",
//                     "nameEn": "Domanapura"
//                 },
//                 {
//                     "value": "150687",
//                     "name": "ढूहरपुर",
//                     "nameEn": "Dhooharapura"
//                 },
//                 {
//                     "value": "150496",
//                     "name": "ढ़ोढ़ी",
//                     "nameEn": "Rhorhee"
//                 },
//                 {
//                     "value": "150670",
//                     "name": "तरगाँव नर्बल",
//                     "nameEn": "TaraGanw Nrbala"
//                 },
//                 {
//                     "value": "150475",
//                     "name": "ताजपुर",
//                     "nameEn": "Tajapura"
//                 },
//                 {
//                     "value": "150719",
//                     "name": "ताजपुर",
//                     "nameEn": "Tajapura"
//                 },
//                 {
//                     "value": "150550",
//                     "name": "ताहरपुर",
//                     "nameEn": "Taharapura"
//                 },
//                 {
//                     "value": "150466",
//                     "name": "तिरमा",
//                     "nameEn": "Tirama"
//                 },
//                 {
//                     "value": "150474",
//                     "name": "तिलसहरी खुर्द",
//                     "nameEn": "Tilasaharee Khurd"
//                 },
//                 {
//                     "value": "150498",
//                     "name": "तिलसहरी बुजुर्ग",
//                     "nameEn": "Tilasaharee Bujurga"
//                 },
//                 {
//                     "value": "150546",
//                     "name": "तिवारीपुर सलेमपुर",
//                     "nameEn": "Tivareepura Salemapura"
//                 },
//                 {
//                     "value": "150655",
//                     "name": "तिवारीपुर साढ.",
//                     "nameEn": "Tivareepura Sadha."
//                 },
//                 {
//                     "value": "150476",
//                     "name": "तुसौरा",
//                     "nameEn": "Tusaura"
//                 },
//                 {
//                     "value": "150672",
//                     "name": "तेलियावर",
//                     "nameEn": "Teliyavara"
//                 },
//                 {
//                     "value": "150542",
//                     "name": "थरेपाह",
//                     "nameEn": "Tharepaha"
//                 },
//                 {
//                     "value": "150541",
//                     "name": "दीपापुर",
//                     "nameEn": "Deepapura"
//                 },
//                 {
//                     "value": "150709",
//                     "name": "देवपुरा",
//                     "nameEn": "Devapura"
//                 },
//                 {
//                     "value": "150658",
//                     "name": "देवसढ.",
//                     "nameEn": "Devasadha."
//                 },
//                 {
//                     "value": "150677",
//                     "name": "दौलतपुर नर्बल",
//                     "nameEn": "Daulatapura Nrbala"
//                 },
//                 {
//                     "value": "150551",
//                     "name": "धरमंगदपुर नर्वल",
//                     "nameEn": "Dharamngadapura Nrvala"
//                 },
//                 {
//                     "value": "150663",
//                     "name": "धरमपुर नर्बल",
//                     "nameEn": "Dharamapura Nrbala"
//                 },
//                 {
//                     "value": "150446",
//                     "name": "धुरूवा खेड़ा",
//                     "nameEn": "Dhuroova Khera"
//                 },
//                 {
//                     "value": "150440",
//                     "name": "नंगवा",
//                     "nameEn": "Nngava"
//                 },
//                 {
//                     "value": "150520",
//                     "name": "नरायनपुर सलेमपुर",
//                     "nameEn": "Narayanapura Salemapura"
//                 },
//                 {
//                     "value": "150702",
//                     "name": "नरायनपुर साढ़",
//                     "nameEn": "Narayanapura Sarh"
//                 },
//                 {
//                     "value": "150548",
//                     "name": "नरौरा",
//                     "nameEn": "Naraura"
//                 },
//                 {
//                     "value": "150561",
//                     "name": "नर्वल",
//                     "nameEn": "Nrvala"
//                 },
//                 {
//                     "value": "150552",
//                     "name": "नसड़ा",
//                     "nameEn": "Nasara"
//                 },
//                 {
//                     "value": "150529",
//                     "name": "नागापुर",
//                     "nameEn": "Nagapura"
//                 },
//                 {
//                     "value": "150685",
//                     "name": "निवादा उजागर",
//                     "nameEn": "Nivada Ujagara"
//                 },
//                 {
//                     "value": "150724",
//                     "name": "निविया",
//                     "nameEn": "Niviya"
//                 },
//                 {
//                     "value": "150540",
//                     "name": "नेबादा वौसर",
//                     "nameEn": "Nebada Vausara"
//                 },
//                 {
//                     "value": "150714",
//                     "name": "नेवादाभरथुबा",
//                     "nameEn": "Nevadabharathuba"
//                 },
//                 {
//                     "value": "150539",
//                     "name": "नौगवाँ गौतम",
//                     "nameEn": "Naugavan Gautama"
//                 },
//                 {
//                     "value": "150557",
//                     "name": "पनौरी",
//                     "nameEn": "Panauree"
//                 },
//                 {
//                     "value": "150648",
//                     "name": "परौरी",
//                     "nameEn": "Parauree"
//                 },
//                 {
//                     "value": "150549",
//                     "name": "पारा",
//                     "nameEn": "Para"
//                 },
//                 {
//                     "value": "150679",
//                     "name": "पालपुर",
//                     "nameEn": "Palapura"
//                 },
//                 {
//                     "value": "150477",
//                     "name": "पालीखुर्द",
//                     "nameEn": "PaleeKhurd"
//                 },
//                 {
//                     "value": "150478",
//                     "name": "पालीभोगीपुर",
//                     "nameEn": "Paleebhogeepura"
//                 },
//                 {
//                     "value": "150547",
//                     "name": "पाल्हेपुर",
//                     "nameEn": "Palhepura"
//                 },
//                 {
//                     "value": "150448",
//                     "name": "पिपरगवां",
//                     "nameEn": "Piparagavan"
//                 },
//                 {
//                     "value": "150538",
//                     "name": "पुरवामीर",
//                     "nameEn": "Puravameera"
//                 },
//                 {
//                     "value": "150544",
//                     "name": "पूरनपुर",
//                     "nameEn": "Pooranapura"
//                 },
//                 {
//                     "value": "150568",
//                     "name": "पौहार",
//                     "nameEn": "Pauhara"
//                 },
//                 {
//                     "value": "150563",
//                     "name": "प्रतापपुर नर्वल",
//                     "nameEn": "Pratapapura Nrvala"
//                 },
//                 {
//                     "value": "150488",
//                     "name": "फुफवार राजथोक",
//                     "nameEn": "Phuphavara Rajathoka"
//                 },
//                 {
//                     "value": "150489",
//                     "name": "फुफुवार सुईथोक",
//                     "nameEn": "Phuphuvara Sueethoka"
//                 },
//                 {
//                     "value": "150733",
//                     "name": "फैजुल्लापुर",
//                     "nameEn": "Phaijullapura"
//                 },
//                 {
//                     "value": "150521",
//                     "name": "बगहा",
//                     "nameEn": "Bagaha"
//                 },
//                 {
//                     "value": "150445",
//                     "name": "बघारा",
//                     "nameEn": "Baghara"
//                 },
//                 {
//                     "value": "150659",
//                     "name": "बंजारी",
//                     "nameEn": "Bnjaree"
//                 },
//                 {
//                     "value": "150545",
//                     "name": "बड़ा गाँव",
//                     "nameEn": "Bara Ganw"
//                 },
//                 {
//                     "value": "150684",
//                     "name": "बरईगढ.",
//                     "nameEn": "Baraeegadha."
//                 },
//                 {
//                     "value": "150481",
//                     "name": "बाँबी चिनगी",
//                     "nameEn": "Banbee Chinagee"
//                 },
//                 {
//                     "value": "150482",
//                     "name": "बांबी भितरी",
//                     "nameEn": "Banbee Bhitaree"
//                 },
//                 {
//                     "value": "150485",
//                     "name": "बाराधरी",
//                     "nameEn": "Baradharee"
//                 },
//                 {
//                     "value": "150652",
//                     "name": "बारीगॉव",
//                     "nameEn": "Bareegaova"
//                 },
//                 {
//                     "value": "150650",
//                     "name": "बिरसिंहपुर",
//                     "nameEn": "Birasinhapura"
//                 },
//                 {
//                     "value": "150712",
//                     "name": "बिरहर",
//                     "nameEn": "Birahara"
//                 },
//                 {
//                     "value": "220362",
//                     "name": "बुघेड़ा",
//                     "nameEn": "Bughera"
//                 },
//                 {
//                     "value": "150711",
//                     "name": "बेरीखेड़ा",
//                     "nameEn": "Bereekhera"
//                 },
//                 {
//                     "value": "150662",
//                     "name": "बेहटा गम्भीरपुर",
//                     "nameEn": "Behata Gmbheerapura"
//                 },
//                 {
//                     "value": "150723",
//                     "name": "बेहटा बुजुर्ग",
//                     "nameEn": "Behata Bujurga"
//                 },
//                 {
//                     "value": "150479",
//                     "name": "बेहटा सकत",
//                     "nameEn": "Behata Sakata"
//                 },
//                 {
//                     "value": "150487",
//                     "name": "बौसर",
//                     "nameEn": "Bausara"
//                 },
//                 {
//                     "value": "150717",
//                     "name": "बौहार",
//                     "nameEn": "Bauhara"
//                 },
//                 {
//                     "value": "150560",
//                     "name": "भगुवाखेड़ा",
//                     "nameEn": "Bhaguvakhera"
//                 },
//                 {
//                     "value": "150503",
//                     "name": "भदासा",
//                     "nameEn": "Bhadasa"
//                 },
//                 {
//                     "value": "150506",
//                     "name": "भिटारा",
//                     "nameEn": "Bhitara"
//                 },
//                 {
//                     "value": "150654",
//                     "name": "भीतरगॉव",
//                     "nameEn": "Bheetaragaova"
//                 },
//                 {
//                     "value": "150467",
//                     "name": "भुकनाई",
//                     "nameEn": "Bhukanaee"
//                 },
//                 {
//                     "value": "150721",
//                     "name": "भेलसा",
//                     "nameEn": "Bhelasa"
//                 },
//                 {
//                     "value": "150558",
//                     "name": "मडिलवा",
//                     "nameEn": "Madilava"
//                 },
//                 {
//                     "value": "150744",
//                     "name": "मडेपुर",
//                     "nameEn": "Madepura"
//                 },
//                 {
//                     "value": "150513",
//                     "name": "मथुरा खेड़ा",
//                     "nameEn": "Mathura Khera"
//                 },
//                 {
//                     "value": "150480",
//                     "name": "मन्धना",
//                     "nameEn": "Mndhana"
//                 },
//                 {
//                     "value": "150656",
//                     "name": "मलखानपुर",
//                     "nameEn": "Malakhanapura"
//                 },
//                 {
//                     "value": "150501",
//                     "name": "महाराजपुर",
//                     "nameEn": "Maharajapura"
//                 },
//                 {
//                     "value": "150532",
//                     "name": "महुवागाँव",
//                     "nameEn": "MahuvaGanw"
//                 },
//                 {
//                     "value": "150715",
//                     "name": "महोलिया",
//                     "nameEn": "Maholiya"
//                 },
//                 {
//                     "value": "150535",
//                     "name": "महोली",
//                     "nameEn": "Maholee"
//                 },
//                 {
//                     "value": "150686",
//                     "name": "मेहरौली",
//                     "nameEn": "Meharaulee"
//                 },
//                 {
//                     "value": "150690",
//                     "name": "मोहम्मदपुर नर्वल",
//                     "nameEn": "Mohmmadapura Nrvala"
//                 },
//                 {
//                     "value": "150678",
//                     "name": "मोहीपुर",
//                     "nameEn": "Moheepura"
//                 },
//                 {
//                     "value": "150706",
//                     "name": "मौहसिनपुर",
//                     "nameEn": "Mauhasinapura"
//                 },
//                 {
//                     "value": "150683",
//                     "name": "रसूलपुर उमरा",
//                     "nameEn": "Rasoolapura Umara"
//                 },
//                 {
//                     "value": "220812",
//                     "name": "रसूलपुर जाजमऊ",
//                     "nameEn": "Rasoolapura Jajamaoo"
//                 },
//                 {
//                     "value": "150526",
//                     "name": "रहनस",
//                     "nameEn": "Rahanasa"
//                 },
//                 {
//                     "value": "150512",
//                     "name": "राजापुर",
//                     "nameEn": "Rajapura"
//                 },
//                 {
//                     "value": "150669",
//                     "name": "राजेपुर",
//                     "nameEn": "Rajepura"
//                 },
//                 {
//                     "value": "150689",
//                     "name": "रातेपुर",
//                     "nameEn": "Ratepura"
//                 },
//                 {
//                     "value": "150566",
//                     "name": "रायपुर नर्बल",
//                     "nameEn": "Rayapura Nrbala"
//                 },
//                 {
//                     "value": "150649",
//                     "name": "रावतपुर",
//                     "nameEn": "Ravatapura"
//                 },
//                 {
//                     "value": "150667",
//                     "name": "लक्षिमनखेड.ा",
//                     "nameEn": "Lakshimanakheda.a"
//                 },
//                 {
//                     "value": "150725",
//                     "name": "लाखनखेड़ा",
//                     "nameEn": "Lakhanakhera"
//                 },
//                 {
//                     "value": "150504",
//                     "name": "लाहौरपुर",
//                     "nameEn": "Lahaurapura"
//                 },
//                 {
//                     "value": "220392",
//                     "name": "विपौसी",
//                     "nameEn": "Vipausee"
//                 },
//                 {
//                     "value": "150695",
//                     "name": "वीरनखेड़ा",
//                     "nameEn": "Veeranakhera"
//                 },
//                 {
//                     "value": "220815",
//                     "name": "वैजूपुर",
//                     "nameEn": "Vaijoopura"
//                 },
//                 {
//                     "value": "150696",
//                     "name": "शाह",
//                     "nameEn": "Shaha"
//                 },
//                 {
//                     "value": "150731",
//                     "name": "शाहपुर",
//                     "nameEn": "Shahpur"
//                 },
//                 {
//                     "value": "150569",
//                     "name": "शीशूपुर",
//                     "nameEn": "Sheeshoopura"
//                 },
//                 {
//                     "value": "150565",
//                     "name": "सगुनपुर",
//                     "nameEn": "Sagunapura"
//                 },
//                 {
//                     "value": "150674",
//                     "name": "सचौली",
//                     "nameEn": "Sachaulee"
//                 },
//                 {
//                     "value": "150517",
//                     "name": "सफीपुर नर्वल",
//                     "nameEn": "Sapheepura Nrvala"
//                 },
//                 {
//                     "value": "150726",
//                     "name": "सरवांगपुर",
//                     "nameEn": "Saravangapura"
//                 },
//                 {
//                     "value": "220401",
//                     "name": "सरसौल 1",
//                     "nameEn": "Sarasaula 1"
//                 },
//                 {
//                     "value": "220402",
//                     "name": "सरसौल II",
//                     "nameEn": "Sarasaula II"
//                 },
//                 {
//                     "value": "150497",
//                     "name": "सलेमपुर",
//                     "nameEn": "Salemapura"
//                 },
//                 {
//                     "value": "150468",
//                     "name": "सवाइजपुर",
//                     "nameEn": "Savaijapura"
//                 },
//                 {
//                     "value": "150676",
//                     "name": "साढ.",
//                     "nameEn": "Sadha."
//                 },
//                 {
//                     "value": "150536",
//                     "name": "सिकठिया",
//                     "nameEn": "Sikathiya"
//                 },
//                 {
//                     "value": "150710",
//                     "name": "सुन्दरपुर",
//                     "nameEn": "Sundarapura"
//                 },
//                 {
//                     "value": "150531",
//                     "name": "सुन्धैला",
//                     "nameEn": "Sundhaila"
//                 },
//                 {
//                     "value": "150491",
//                     "name": "सुभौली",
//                     "nameEn": "Subhaulee"
//                 },
//                 {
//                     "value": "150749",
//                     "name": "सूलपुर",
//                     "nameEn": "Soolapura"
//                 },
//                 {
//                     "value": "150555",
//                     "name": "सेमरझाल",
//                     "nameEn": "Semarajhala"
//                 },
//                 {
//                     "value": "220816",
//                     "name": "सेमरा",
//                     "nameEn": "Semara"
//                 },
//                 {
//                     "value": "150471",
//                     "name": "सेमरुवा",
//                     "nameEn": "Semaruva"
//                 },
//                 {
//                     "value": "150511",
//                     "name": "सैदलीपुर",
//                     "nameEn": "Saidaleepura"
//                 },
//                 {
//                     "value": "150502",
//                     "name": "सैबसी",
//                     "nameEn": "Saibasee"
//                 },
//                 {
//                     "value": "150562",
//                     "name": "हजरतपुर",
//                     "nameEn": "Hajaratapura"
//                 },
//                 {
//                     "value": "150567",
//                     "name": "हरचन्द्र खेड़ा",
//                     "nameEn": "Harachndra Khera"
//                 },
//                 {
//                     "value": "150718",
//                     "name": "हसकर",
//                     "nameEn": "Hasakara"
//                 },
//                 {
//                     "value": "150691",
//                     "name": "हाजीपुर कदीम",
//                     "nameEn": "Hajeepura Kadeema"
//                 },
//                 {
//                     "value": "150713",
//                     "name": "हाजीपुर पकरा",
//                     "nameEn": "Hajeepura Pakara"
//                 },
//                 {
//                     "value": "150490",
//                     "name": "हाथीगॉव",
//                     "nameEn": "Hatheegaova"
//                 },
//                 {
//                     "value": "150499",
//                     "name": "हाथीपुर",
//                     "nameEn": "Hatheepura"
//                 }
//             ]
//         };

//         return villageData[tehsilCode] || [];
//     };

//     // Handle tehsil selection
//     const handleTehsilSelect = (tehsil) => {
//         setSelectedTehsil(tehsil);
//         const villages = getVillagesByTehsil(tehsil.code);
//         setFilteredVillages(villages);
//         setSearchTerm('');
//     };

//     // Handle search input change
//     const handleSearchChange = (e) => {
//         const term = e.target.value;
//         setSearchTerm(term);

//         if (selectedTehsil) {
//             const allVillages = getVillagesByTehsil(selectedTehsil.code);
//             const filtered = term
//                 ? allVillages.filter(village =>
//                     language === 'english'
//                         ? village.nameEn.toLowerCase().includes(term.toLowerCase())
//                         : village.name.toLowerCase().includes(term.toLowerCase()))
//                 : allVillages;

//             setFilteredVillages(filtered);
//         }
//     };

//     // Get displayed name based on current language
//     const getDisplayName = (item) => {
//         return language === 'english' ? item.nameEn : item.name;
//     };

//     return (
//         <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
//             <header className="text-center mb-8 relative">
//                 {/* Language toggle button */}
//                 <button
//                     onClick={toggleLanguage}
//                     className="absolute right-0 top-0 px-3 py-2 bg-white rounded-full shadow-md flex items-center space-x-2 hover:bg-gray-100 transition-colors"
//                 >
//                     <Globe className="h-5 w-5 text-blue-600" />
//                     <span className="text-sm font-medium">{language === 'english' ? 'हिंदी' : 'English'}</span>
//                 </button>

//                 <h1 className="text-3xl font-bold text-gray-800 mb-2">{text.title}</h1>
//                 <p className="text-gray-600">{text.subtitle}</p>
//             </header>

//             {/* Tehsil selection */}
//             <section className="mb-8">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4">{text.selectTehsil}</h2>
//                 <div className="flex flex-wrap gap-3">
//                     {tehsils.map((tehsil) => (
//                         <button
//                             key={tehsil.code}
//                             onClick={() => handleTehsilSelect(tehsil)}
//                             className={`px-4 py-2 rounded-full transition-all ${selectedTehsil?.code === tehsil.code
//                                     ? 'bg-blue-600 text-white shadow-lg'
//                                     : 'bg-white text-gray-700 shadow hover:shadow-md hover:bg-blue-50'
//                                 }`}
//                         >
//                             {getDisplayName(tehsil)} ({tehsil.code})
//                         </button>
//                     ))}
//                 </div>
//             </section>

//             {/* Village selection */}
//             {selectedTehsil && (
//                 <section>
//                     <div className="bg-white p-5 rounded-xl shadow-md">
//                         <div className="flex items-center justify-between mb-6">
//                             <h2 className="text-xl font-semibold text-gray-700">
//                                 {getDisplayName(selectedTehsil)} {text.mohallasOf} - {filteredVillages.length}
//                             </h2>

//                             {/* Search box */}
//                             <div className="relative w-72">
//                                 <input
//                                     type="text"
//                                     placeholder={text.searchPlaceholder}
//                                     value={searchTerm}
//                                     onChange={handleSearchChange}
//                                     className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 />
//                                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                             </div>
//                         </div>

//                         {/* Village grid */}
//                         <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                             {filteredVillages.map((village) => (
//                                 <div
//                                     key={village.value}
//                                     className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
//                                 >
//                                     <div className="font-medium">{getDisplayName(village)}</div>
//                                     <div className="text-sm text-gray-500">{text.code}: {village.value}</div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Empty state */}
//                         {filteredVillages.length === 0 && (
//                             <div className="text-center py-10 text-gray-500">
//                                 {searchTerm ? text.noResultsSearch : text.noResults}
//                             </div>
//                         )}
//                     </div>
//                 </section>
//             )}
//         </div>
//     );
// };

// export default TehsilMohallaDashboard;

import React, { useState, useEffect } from 'react';
import { Search, Globe, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Language translations
const translations = {
    english: {
        title: "Tehsil and Mohalla Dashboard",
        subtitle: "Select a Tehsil/SRO and view related mohallas",
        selectTehsil: "Select Tehsil/SRO:",
        mohallasOf: "Mohallas of",
        searchPlaceholder: "Search mohalla...",
        fetchData: "Fetch Property Data",
        code: "Code",
        noResultsSearch: "No mohallas found for your search.",
        noResults: "No mohallas found for this tehsil.",
        fetchingData: "Fetching property data...",
        fetchSuccess: "Property data fetched successfully!",
        fetchError: "Error fetching property data.",
        viewSavedRecords: "View Saved Records"
    },
    hindi: {
        title: "तहसील और मोहल्ला डैशबोर्ड",
        subtitle: "तहसील/एसआरओ का चयन करें और संबंधित मोहल्ला देखें",
        selectTehsil: "तहसील/एसआरओ का चयन करें:",
        mohallasOf: "के मोहल्ले",
        searchPlaceholder: "मोहल्ला खोजें...",
        fetchData: "सम्पत्ति डेटा प्राप्त करें",
        code: "कोड",
        noResultsSearch: "खोज के अनुसार कोई मोहल्ला नहीं मिला।",
        noResults: "इस तहसील के लिए कोई मोहल्ला नहीं मिला।",
        fetchingData: "सम्पत्ति डेटा प्राप्त किया जा रहा है...",
        fetchSuccess: "सम्पत्ति डेटा सफलतापूर्वक प्राप्त किया गया!",
        fetchError: "सम्पत्ति डेटा प्राप्त करने में त्रुटि।",
        viewSavedRecords: "सहेजे गए रिकॉर्ड देखें"
    }
};

const TehsilMohallaDashboard = () => {
    const navigate = useNavigate();
    // State for storing tehsils and their villages
    const [tehsils, setTehsils] = useState([]);
    const [selectedTehsil, setSelectedTehsil] = useState(null);
    const [selectedVillage, setSelectedVillage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVillages, setFilteredVillages] = useState([]);
    const [language, setLanguage] = useState('english'); // Default to English
    const [fetchStatus, setFetchStatus] = useState(null); // null, 'loading', 'success', 'error'

    // Toggle language function
    const toggleLanguage = () => {
        setLanguage(language === 'english' ? 'hindi' : 'english');
    };

    // Get current language text
    const text = translations[language];

    // Dummy data for demonstration - in actual implementation, this would come from your data files
    useEffect(() => {
        // Collecting tehsil information from the files
        const tehsilData = [
            { code: "208", name: "सदर प्रथम", nameEn: "Sadar First" },
            { code: "209", name: "सदर द्वितीय", nameEn: "Sadar Second" },
            { code: "210", name: "सदर तृतीय", nameEn: "Sadar Third" },
            { code: "211", name: "सदर चतुर्थ", nameEn: "Sadar Fourth" },
            { code: "212", name: "बिल्हौर", nameEn: "Bilhaur" },
            { code: "213", name: "घाटमपुर", nameEn: "Ghatampur" },
            { code: "370", name: "नरवल", nameEn: "Narwal" },
        ];

        // Villages/mohallas would be loaded from the files when a tehsil is selected
        setTehsils(tehsilData);
    }, []);

    // Demo data for villages by tehsil
    const getVillagesByTehsil = (tehsilCode) => {
        // This would be replaced with actual data loading logic
        const villageData = {
            "208": [
                            {
                                "value": "900040",
                                "name": "अटहा",
                                "nameEn": "Ataha"
                            },
                            {
                                "value": "900041",
                                "name": "अल्‍लापुरवा",
                                "nameEn": "Allapurava"
                            },
                            {
                                "value": "900085",
                                "name": "अशरफाबाद",
                                "nameEn": "Asharaphabada"
                            },
                            {
                                "value": "900100",
                                "name": "आदर्श नगर",
                                "nameEn": "Aadrsha Nagara"
                            },
                            {
                                "value": "900030",
                                "name": "आनन्‍द बाग चक सं०-१०६",
                                "nameEn": "Aannda Baga Chak Sn0-106"
                            },
                            {
                                "value": "900042",
                                "name": "इकधरा",
                                "nameEn": "Ikadhara"
                            },
                            {
                                "value": "900034",
                                "name": "इटावा बाजार चक सं०-२१",
                                "nameEn": "Itava Bajara Chak Sn0-21"
                            },
                            {
                                "value": "900002",
                                "name": "ओमपुरवा",
                                "nameEn": "Omapurava"
                            },
                            {
                                "value": "900113",
                                "name": "कछियाना मोहाल 66",
                                "nameEn": "Kachhiyana Mohala 66"
                            },
                            {
                                "value": "900197",
                                "name": "कटरी किशनपुर",
                                "nameEn": "Kataree Kishanapura"
                            },
                            {
                                "value": "220312",
                                "name": "कटरी किशुनपुर नर्वल",
                                "nameEn": "Kataree Kishunapura Nrvala"
                            },
                            {
                                "value": "220307",
                                "name": "कटरी जाना",
                                "nameEn": "Kataree Jana"
                            },
                            {
                                "value": "900200",
                                "name": "कटरी जाना",
                                "nameEn": "Kataree Jana"
                            },
                            {
                                "value": "900194",
                                "name": "कटरी पैबन्‍दी",
                                "nameEn": "Kataree Paibndee"
                            },
                            {
                                "value": "220308",
                                "name": "कटरी पैबन्दी",
                                "nameEn": "Kataree Paibndee"
                            },
                            {
                                "value": "220309",
                                "name": "कटरी मदारपुर",
                                "nameEn": "Kataree Madarapura"
                            },
                            {
                                "value": "900195",
                                "name": "कटरी मदारपुर",
                                "nameEn": "Kataree Madarapura"
                            },
                            {
                                "value": "900199",
                                "name": "कटरी वा‍जिदपुर",
                                "nameEn": "Kataree Vajidapura"
                            },
                            {
                                "value": "220310",
                                "name": "कटरी वाजिदपुर",
                                "nameEn": "Kataree Vajidapura"
                            },
                            {
                                "value": "900198",
                                "name": "कटरी शेखपुर",
                                "nameEn": "Kataree Shekhapura"
                            },
                            {
                                "value": "220311",
                                "name": "कटरी शेषपुर",
                                "nameEn": "Kataree Sheshapura"
                            },
                            {
                                "value": "220315",
                                "name": "कमालपुर कानपुर",
                                "nameEn": "Kamalapura Kanapura"
                            },
                            {
                                "value": "900035",
                                "name": "कराचीखाना चक सं०-२५",
                                "nameEn": "Karacheekhana Chak Sn0-25"
                            },
                            {
                                "value": "900248",
                                "name": "कर्वी गॉव (कर्वी गॉव सलेमपुर)",
                                "nameEn": "Krvee Gaova (krvee Gaova Salemapura)"
                            },
                            {
                                "value": "900007",
                                "name": "कलक्‍टरगंज चक सं०-७३",
                                "nameEn": "Kalktaragnja Chak Sn0-73"
                            },
                            {
                                "value": "900043",
                                "name": "कल्‍यानपुर",
                                "nameEn": "Klyanapura"
                            },
                            {
                                "value": "220318",
                                "name": "कल्यानपुर नर्बल",
                                "nameEn": "Klyanapura Nrbala"
                            },
                            {
                                "value": "900202",
                                "name": "कल्‍यानपुर नर्वल",
                                "nameEn": "Klyanapura Nrvala"
                            },
                            {
                                "value": "900183",
                                "name": "काजीखेडा",
                                "nameEn": "Kajeekheda"
                            },
                            {
                                "value": "900075",
                                "name": "काहूकोठी 49",
                                "nameEn": "Kahookothee 49"
                            },
                            {
                                "value": "900204",
                                "name": "किशनपुर नर्वल",
                                "nameEn": "Kishanapura Nrvala"
                            },
                            {
                                "value": "900044",
                                "name": "किशुनपुर",
                                "nameEn": "Kishunapura"
                            },
                            {
                                "value": "220380",
                                "name": "किशुनपुर नर्वल",
                                "nameEn": "Kishunapura Nrvala"
                            },
                            {
                                "value": "900124",
                                "name": "कुरसवां 17 18",
                                "nameEn": "Kurasavan 17 18"
                            },
                            {
                                "value": "220305",
                                "name": "कुलगाँव",
                                "nameEn": "KulaGanw"
                            },
                            {
                                "value": "900045",
                                "name": "कुलगॉंव",
                                "nameEn": "Kulagaonva"
                            },
                            {
                                "value": "900015",
                                "name": "कुली बाजार चक सं०-७७",
                                "nameEn": "Kulee Bajara Chak Sn0-77"
                            },
                            {
                                "value": "900086",
                                "name": "के0डी0ए0 कालोनी जाजमऊ योजना ३९ ब्लाक a से f",
                                "nameEn": "Ke0dee0e0 Kalonee Jajamaoo Yojana 39 Blaka A Se F"
                            },
                            {
                                "value": "900161",
                                "name": "कैनाल पटरी 58 59 चक",
                                "nameEn": "Kainala Pataree 58 59 Chak"
                            },
                            {
                                "value": "900101",
                                "name": "कैलाश विहार ग्रेटर कैलाश",
                                "nameEn": "Kailasha Vihara Gretara Kailasha"
                            },
                            {
                                "value": "900018",
                                "name": "कोपरगंज चक सं०-८०",
                                "nameEn": "Koparagnja Chak Sn0-80"
                            },
                            {
                                "value": "900047",
                                "name": "खजुरिया",
                                "nameEn": "Khajuriya"
                            },
                            {
                                "value": "900021",
                                "name": "खपरा मोहाल",
                                "nameEn": "Khapara Mohala"
                            },
                            {
                                "value": "900046",
                                "name": "खलार",
                                "nameEn": "Khalara"
                            },
                            {
                                "value": "900087",
                                "name": "गज्‍जूपुरवा",
                                "nameEn": "Gjjoopurava"
                            },
                            {
                                "value": "220324",
                                "name": "गज्जू पुरवा",
                                "nameEn": "Gjjoo Purava"
                            },
                            {
                                "value": "900178",
                                "name": "गडरिया मोहाल 64 चक",
                                "nameEn": "Gadariya Mohala 64 Chak"
                            },
                            {
                                "value": "900048",
                                "name": "गदनपुर",
                                "nameEn": "Gadanapura"
                            },
                            {
                                "value": "900031",
                                "name": "गॉंधी नगर चक सं०-१०६",
                                "nameEn": "Gaondhee Nagara Chak Sn0-106"
                            },
                            {
                                "value": "900088",
                                "name": "गोवर्धनपुरवा",
                                "nameEn": "Govrdhanapurava"
                            },
                            {
                                "value": "900102",
                                "name": "गौशाला",
                                "nameEn": "Gaushala"
                            },
                            {
                                "value": "900171",
                                "name": "घाऊखेडा",
                                "nameEn": "Ghaookheda"
                            },
                            {
                                "value": "220328",
                                "name": "घाघू खेड़ा",
                                "nameEn": "Ghaghoo Khera"
                            },
                            {
                                "value": "150571",
                                "name": "चकेरी",
                                "nameEn": "Chakeree"
                            },
                            {
                                "value": "900049",
                                "name": "चकेरी",
                                "nameEn": "Chakeree"
                            },
                            {
                                "value": "901103",
                                "name": "चटाई मोहाल चक सं०-20",
                                "nameEn": "Chataee Mohala Chak Sn0-20"
                            },
                            {
                                "value": "900036",
                                "name": "चटाई मोहाल चक सं०-२१",
                                "nameEn": "Chataee Mohala Chak Sn0-21"
                            },
                            {
                                "value": "900063",
                                "name": "चंदारी",
                                "nameEn": "Chndaree"
                            },
                            {
                                "value": "220332",
                                "name": "़चन्दारी",
                                "nameEn": "Chndaree"
                            },
                            {
                                "value": "900003",
                                "name": "चन्‍द्र नगर",
                                "nameEn": "Chndra Nagara"
                            },
                            {
                                "value": "900004",
                                "name": "चरारी",
                                "nameEn": "Chararee"
                            },
                            {
                                "value": "900064",
                                "name": "चौक सर्राफा चक सं०- 43",
                                "nameEn": "Chauka Srrapha Chak Sn0- 43"
                            },
                            {
                                "value": "900076",
                                "name": "छप्‍पर मोहाल‚मूलगंज चक सं0 45‚ 46",
                                "nameEn": "Chhppara Mohala‚moolagnja Chak Sn0 45‚ 46"
                            },
                            {
                                "value": "900089",
                                "name": "छबीलेपुरवा",
                                "nameEn": "Chhabeelepurava"
                            },
                            {
                                "value": "900022",
                                "name": "छावनी",
                                "nameEn": "Chhavanee"
                            },
                            {
                                "value": "900005",
                                "name": "जगईपुरवा",
                                "nameEn": "Jagaeepurava"
                            },
                            {
                                "value": "220335",
                                "name": "जगतापुर",
                                "nameEn": "Jagatapura"
                            },
                            {
                                "value": "900077",
                                "name": "जनरलगंज 48 49",
                                "nameEn": "Janaralagnja 48 49"
                            },
                            {
                                "value": "900090",
                                "name": "जाजमऊ वाजिदपुर",
                                "nameEn": "Jajamaoo Vajidapura"
                            },
                            {
                                "value": "220340",
                                "name": "जाना",
                                "nameEn": "Jana"
                            },
                            {
                                "value": "900050",
                                "name": "जाना",
                                "nameEn": "Jana"
                            },
                            {
                                "value": "900103",
                                "name": "जे0 के0 कालोनी",
                                "nameEn": "Je0 Ke0 Kalonee"
                            },
                            {
                                "value": "900104",
                                "name": "डिफेन्‍स कालोनी जाजमऊ ब्लाक a से f",
                                "nameEn": "Diphensa Kalonee Jajamaoo Blaka A Se F"
                            },
                            {
                                "value": "900065",
                                "name": "तलाक महल चक सं०-४४",
                                "nameEn": "Talaka Mahala Chak Sn0-44"
                            },
                            {
                                "value": "900128",
                                "name": "तलाक महल चक सं0 95",
                                "nameEn": "Talaka Mahala Chak Sn0 95"
                            },
                            {
                                "value": "900099",
                                "name": "तलाक महल चक सं0 95‚ 97",
                                "nameEn": "Talaka Mahala Chak Sn0 95‚ 97"
                            },
                            {
                                "value": "900261",
                                "name": "तिलसहरी बुजुर्ग",
                                "nameEn": "Tilasaharee Bujurga"
                            },
                            {
                                "value": "900105",
                                "name": "तिवारीपुर जाजमऊ",
                                "nameEn": "Tivareepura Jajamaoo"
                            },
                            {
                                "value": "900051",
                                "name": "त्रिलोकपुर",
                                "nameEn": "Trilokapura"
                            },
                            {
                                "value": "900116",
                                "name": "दानाखोरी 69",
                                "nameEn": "Danakhoree 69"
                            },
                            {
                                "value": "900162",
                                "name": "दाल मण्‍डी 60 चक",
                                "nameEn": "Dala Mndee 60 Chak"
                            },
                            {
                                "value": "900106",
                                "name": "दुर्गा विहार",
                                "nameEn": "Durga Vihara"
                            },
                            {
                                "value": "900173",
                                "name": "देवीगंज",
                                "nameEn": "Deveegnja"
                            },
                            {
                                "value": "900115",
                                "name": "दौलतगंज 67",
                                "nameEn": "Daulatagnja 67"
                            },
                            {
                                "value": "900009",
                                "name": "धनकुटटी चक सं०-७४",
                                "nameEn": "Dhanakutatee Chak Sn0-74"
                            },
                            {
                                "value": "900066",
                                "name": "धोबी मोहाल चक सं०-४३",
                                "nameEn": "Dhobee Mohala Chak Sn0-43"
                            },
                            {
                                "value": "900068",
                                "name": "नई सडक चक सं०-४४",
                                "nameEn": "Naee Sadaka Chak Sn0-44"
                            },
                            {
                                "value": "900079",
                                "name": "नयागंज 52 53 54 55",
                                "nameEn": "Nayagnja 52 53 54 55"
                            },
                            {
                                "value": "900130",
                                "name": "नया चौक परेड 40 चक",
                                "nameEn": "Naya Chauka Pareda 40 Chak"
                            },
                            {
                                "value": "900163",
                                "name": "नयांज 52 53 54 55 चक",
                                "nameEn": "Nayanja 52 53 54 55 Chak"
                            },
                            {
                                "value": "900067",
                                "name": "नारियल बाजार",
                                "nameEn": "Nariyala Bajara"
                            },
                            {
                                "value": "900120",
                                "name": "नेहरु नगर 109",
                                "nameEn": "Neharu Nagara 109"
                            },
                            {
                                "value": "900270",
                                "name": "नौगवां",
                                "nameEn": "Naugavan"
                            },
                            {
                                "value": "900078",
                                "name": "नौघडा 50",
                                "nameEn": "Naughada 50"
                            },
                            {
                                "value": "900125",
                                "name": "पटकापुर 19",
                                "nameEn": "Patakapura 19"
                            },
                            {
                                "value": "900037",
                                "name": "पटकापुर चक सं० 19",
                                "nameEn": "Patakapura Chak Sn0 19"
                            },
                            {
                                "value": "901104",
                                "name": "पटकापुर चक सं0 23",
                                "nameEn": "Patakapura Chak Sn0 23"
                            },
                            {
                                "value": "901105",
                                "name": "पटकापुर चक सं0 24",
                                "nameEn": "Patakapura Chak Sn0 24"
                            },
                            {
                                "value": "220354",
                                "name": "परदेवनपुर गौशाला",
                                "nameEn": "Paradevanapura Gaushala"
                            },
                            {
                                "value": "900185",
                                "name": "परदेवनपुरवा",
                                "nameEn": "Paradevanapurava"
                            },
                            {
                                "value": "900121",
                                "name": "परमट 13",
                                "nameEn": "Paramata 13"
                            },
                            {
                                "value": "900135",
                                "name": "परेड 95चक",
                                "nameEn": "Pareda 95Chak"
                            },
                            {
                                "value": "900133",
                                "name": "परेड बूचडखाना 93 चक",
                                "nameEn": "Pareda Boochadakhana 93 Chak"
                            },
                            {
                                "value": "900155",
                                "name": "परेड स्थित मालरोड 14 15 चक",
                                "nameEn": "Pareda Sthita Malaroda 14 15 Chak"
                            },
                            {
                                "value": "900032",
                                "name": "पी0 रोड चक सं०-१०८",
                                "nameEn": "Pee0 Roda Chak Sn0-108"
                            },
                            {
                                "value": "900143",
                                "name": "पुराना हाता सवाई सिंह 34 चक",
                                "nameEn": "Purana Hata Savaee Sinha 34 Chak"
                            },
                            {
                                "value": "900141",
                                "name": "पुरानी चावल मण्‍डी",
                                "nameEn": "Puranee Chavala Mndee"
                            },
                            {
                                "value": "900131",
                                "name": "पेंचबाग 93 चक",
                                "nameEn": "Penchabaga 93 Chak"
                            },
                            {
                                "value": "900053",
                                "name": "पैबन्‍दी",
                                "nameEn": "Paibndee"
                            },
                            {
                                "value": "220356",
                                "name": "पैबन्दी",
                                "nameEn": "Paibndee"
                            },
                            {
                                "value": "900006",
                                "name": "पोखरपुर",
                                "nameEn": "Pokharapura"
                            },
                            {
                                "value": "220357",
                                "name": "पोहकरपुर",
                                "nameEn": "Pohakarapura"
                            },
                            {
                                "value": "900136",
                                "name": "फर्राशखाना चक सं0 94",
                                "nameEn": "Phrrashakhana Chak Sn0 94"
                            },
                            {
                                "value": "901107",
                                "name": "फर्राशखाना चक सं0 94",
                                "nameEn": "Phrrashakhana Chak Sn0 94"
                            },
                            {
                                "value": "900069",
                                "name": "फर्राशखाना‚ चौबेगोला चक सं०-41",
                                "nameEn": "Phrrashakhana‚ Chaubegola Chak Sn0-41"
                            },
                            {
                                "value": "901115",
                                "name": "फीलखाना चक 22",
                                "nameEn": "Pheelakhana Chak 22"
                            },
                            {
                                "value": "901111",
                                "name": "फीलखाना चक सं०-22",
                                "nameEn": "Pheelakhana Chak Sn0-22"
                            },
                            {
                                "value": "901106",
                                "name": "फीलखाना चक सं०-26",
                                "nameEn": "Pheelakhana Chak Sn0-26"
                            },
                            {
                                "value": "901112",
                                "name": "फीलखाना चक सं०-26",
                                "nameEn": "Pheelakhana Chak Sn0-26"
                            },
                            {
                                "value": "900144",
                                "name": "फीलखाना सिरकी माेहाल चक सं० 28",
                                "nameEn": "Pheelakhana Sirakee Maehala Chak Sn0 28"
                            },
                            {
                                "value": "900038",
                                "name": "फीलखाना",
                                "nameEn": "Pheelakhana"
                            },
                            {
                                "value": "900023",
                                "name": "फेथफुलगंज",
                                "nameEn": "Phethaphulagnja"
                            },
                            {
                                "value": "900147",
                                "name": "बंगाली मोहाल राम मोहन हाता 34 35 36 चक",
                                "nameEn": "Bngalee Mohala Rama Mohana Hata 34 35 36 Chak"
                            },
                            {
                                "value": "900080",
                                "name": "बान बाजार चक सं0 46‚75",
                                "nameEn": "Bana Bajara Chak Sn0 46‚75"
                            },
                            {
                                "value": "900010",
                                "name": "बान बाजार व चक सं०-४६",
                                "nameEn": "Bana Bajara Va Chak Sn0-46"
                            },
                            {
                                "value": "900165",
                                "name": "बिरहाना रोड",
                                "nameEn": "Birahana Roda"
                            },
                            {
                                "value": "900070",
                                "name": "बिसाती बाजार चक सं०-४२",
                                "nameEn": "Bisatee Bajara Chak Sn0-42"
                            },
                            {
                                "value": "220367",
                                "name": "बीबीपुर",
                                "nameEn": "Beebeepura"
                            },
                            {
                                "value": "900174",
                                "name": "बीबीपुर",
                                "nameEn": "Beebeepura"
                            },
                            {
                                "value": "900091",
                                "name": "बुढिया घाट",
                                "nameEn": "Budhiya Ghata"
                            },
                            {
                                "value": "900019",
                                "name": "बूचडखाना चक सं०-८०",
                                "nameEn": "Boochadakhana Chak Sn0-80"
                            },
                            {
                                "value": "900146",
                                "name": "बेलदारी मोहाल 29 चक",
                                "nameEn": "Beladaree Mohala 29 Chak"
                            },
                            {
                                "value": "900093",
                                "name": "मकदूम नगर",
                                "nameEn": "Makadooma Nagara"
                            },
                            {
                                "value": "900092",
                                "name": "मक्‍कू शहीद का भटठा",
                                "nameEn": "Mkkoo Shaheeda Ka Bhatatha"
                            },
                            {
                                "value": "900117",
                                "name": "मथुरी मोहाल 70",
                                "nameEn": "Mathuree Mohala 70"
                            },
                            {
                                "value": "220368",
                                "name": "मदारपुर",
                                "nameEn": "Madarapura"
                            },
                            {
                                "value": "900054",
                                "name": "मदारपुर",
                                "nameEn": "Madarapura"
                            },
                            {
                                "value": "900081",
                                "name": "मनीराम बगिया 47",
                                "nameEn": "Maneerama Bagiya 47"
                            },
                            {
                                "value": "901108",
                                "name": "मनीराम बगिया चक सं० 47",
                                "nameEn": "Maneerama Bagiya Chak Sn0 47"
                            },
                            {
                                "value": "900072",
                                "name": "मनीराम बगिया",
                                "nameEn": "Maneerama Bagiya"
                            },
                            {
                                "value": "220369",
                                "name": "मवइया",
                                "nameEn": "Mavaiya"
                            },
                            {
                                "value": "900056",
                                "name": "मवइया",
                                "nameEn": "Mavaiya"
                            },
                            {
                                "value": "900149",
                                "name": "महेश्‍वरी मोहाल 30 चक",
                                "nameEn": "Maheshvaree Mohala 30 Chak"
                            },
                            {
                                "value": "900107",
                                "name": "मानस विहार",
                                "nameEn": "Manasa Vihara"
                            },
                            {
                                "value": "900152",
                                "name": "माल गोदाम 82 चक",
                                "nameEn": "Mala Godama 82 Chak"
                            },
                            {
                                "value": "900179",
                                "name": "माल रोड कैण्‍ट 62 63 चक",
                                "nameEn": "Mala Roda Kainta 62 63 Chak"
                            },
                            {
                                "value": "900025",
                                "name": "मालरोड कैण्‍ट चक सं०-६२",
                                "nameEn": "Malaroda Kainta Chak Sn0-62"
                            },
                            {
                                "value": "900109",
                                "name": "मालरोड चक सं0 16‚ 17‚ 18",
                                "nameEn": "Malaroda Chak Sn0 16‚ 17‚ 18"
                            },
                            {
                                "value": "901109",
                                "name": "माल रोड चक सं0 37",
                                "nameEn": "Mala Roda Chak Sn0 37"
                            },
                            {
                                "value": "901110",
                                "name": "मालरोड (तारघर रोड) चक सं० 37",
                                "nameEn": "Malaroda (taraghara Roda) Chak Sn0 37"
                            },
                            {
                                "value": "900158",
                                "name": "माल रोड",
                                "nameEn": "Mala Roda"
                            },
                            {
                                "value": "900074",
                                "name": "मिश्री बाजार 44",
                                "nameEn": "Mishree Bajara 44"
                            },
                            {
                                "value": "900024",
                                "name": "मीरपुर",
                                "nameEn": "Meerapura"
                            },
                            {
                                "value": "220370",
                                "name": "मुजफ्फरपुर",
                                "nameEn": "Mujphpharapura"
                            },
                            {
                                "value": "900073",
                                "name": "मूलगंज 44 45",
                                "nameEn": "Moolagnja 44 45"
                            },
                            {
                                "value": "900071",
                                "name": "मैदा बाजार",
                                "nameEn": "Maida Bajara"
                            },
                            {
                                "value": "900094",
                                "name": "मोती नगर जाजमऊ",
                                "nameEn": "Motee Nagara Jajamaoo"
                            },
                            {
                                "value": "900055",
                                "name": "मोतीपुर",
                                "nameEn": "Moteepura"
                            },
                            {
                                "value": "900180",
                                "name": "मोती मोहाल 65 चक",
                                "nameEn": "Motee Mohala 65 Chak"
                            },
                            {
                                "value": "900011",
                                "name": "रंजीतपुरवा चक सं०-७५",
                                "nameEn": "Rnjeetapurava Chak Sn0-75"
                            },
                            {
                                "value": "900082",
                                "name": "रामगंज 51",
                                "nameEn": "Ramagnja 51"
                            },
                            {
                                "value": "900127",
                                "name": "राम नारायण बाजार 17",
                                "nameEn": "Rama Narayana Bajara 17"
                            },
                            {
                                "value": "900095",
                                "name": "रामराय सराय",
                                "nameEn": "Ramaraya Saraya"
                            },
                            {
                                "value": "900057",
                                "name": "रुमा",
                                "nameEn": "Ruma"
                            },
                            {
                                "value": "220373",
                                "name": "रूमा",
                                "nameEn": "Rooma"
                            },
                            {
                                "value": "900026",
                                "name": "रेल बाजार",
                                "nameEn": "Rela Bajara"
                            },
                            {
                                "value": "900012",
                                "name": "रेलवे कालोनी चक सं०-७२",
                                "nameEn": "Relave Kalonee Chak Sn0-72"
                            },
                            {
                                "value": "900039",
                                "name": "रोटी गोदाम चक– 26 27",
                                "nameEn": "Rotee Godama Chak– 26 27"
                            },
                            {
                                "value": "900154",
                                "name": "लक्ष्‍मीपुरवा 85 चक",
                                "nameEn": "Laksh्meepurava 85 Chak"
                            },
                            {
                                "value": "900097",
                                "name": "ललतूपुरवा",
                                "nameEn": "Lalatoopurava"
                            },
                            {
                                "value": "900016",
                                "name": "लाटूश रोड चक सं०-७६",
                                "nameEn": "Latoosha Roda Chak Sn0-76"
                            },
                            {
                                "value": "900020",
                                "name": "लाटूश रोड चक सं०-८०",
                                "nameEn": "Latoosha Roda Chak Sn0-80"
                            },
                            {
                                "value": "900151",
                                "name": "लाठी मोहाल",
                                "nameEn": "Lathee Mohala"
                            },
                            {
                                "value": "900096",
                                "name": "लारी मार्केट",
                                "nameEn": "Laree Marketa"
                            },
                            {
                                "value": "900027",
                                "name": "लाल कुर्ती",
                                "nameEn": "Lala Kurtee"
                            },
                            {
                                "value": "900118",
                                "name": "लोकमन मोहाल 68",
                                "nameEn": "Lokamana Mohala 68"
                            },
                            {
                                "value": "900058",
                                "name": "लोधीपुर",
                                "nameEn": "Lodheepura"
                            },
                            {
                                "value": "220375",
                                "name": "वाजिदपुर उर्फ जाजमऊ",
                                "nameEn": "Vajidapura Urpha Jajamaoo"
                            },
                            {
                                "value": "900028",
                                "name": "शान्‍ती नगर",
                                "nameEn": "Shantee Nagara"
                            },
                            {
                                "value": "900098",
                                "name": "शीतला बाजार",
                                "nameEn": "Sheetala Bajara"
                            },
                            {
                                "value": "220379",
                                "name": "शीशामऊ",
                                "nameEn": "Sheeshamaoo"
                            },
                            {
                                "value": "900059",
                                "name": "शेखपुर उर्फ शेषपुर",
                                "nameEn": "Shekhapura Urpha Sheshapura"
                            },
                            {
                                "value": "220377",
                                "name": "शेषपुर",
                                "nameEn": "Sheshapura"
                            },
                            {
                                "value": "900167",
                                "name": "सतरंजी मोहाल 56 57 चक",
                                "nameEn": "Satarnjee Mohala 56 57 Chak"
                            },
                            {
                                "value": "900061",
                                "name": "सन्‍तनपुरवा",
                                "nameEn": "Sntanapurava"
                            },
                            {
                                "value": "900875",
                                "name": "सफीपुर",
                                "nameEn": "Sapheepura"
                            },
                            {
                                "value": "220400",
                                "name": "सफीपुर कानपुर",
                                "nameEn": "Sapheepura Kanapura"
                            },
                            {
                                "value": "900176",
                                "name": "सफीपुर प्रथम",
                                "nameEn": "Sapheepura Prathama"
                            },
                            {
                                "value": "900177",
                                "name": "सफीपुर सेकेण्‍ड",
                                "nameEn": "Sapheepura Sekenda"
                            },
                            {
                                "value": "900017",
                                "name": "सब्‍जी मण्‍डी चक सं०-७७",
                                "nameEn": "Sbjee Mndee Chak Sn0-77"
                            },
                            {
                                "value": "220403",
                                "name": "सराय राम राम",
                                "nameEn": "Saraya Rama Rama"
                            },
                            {
                                "value": "900108",
                                "name": "सिद्धनाथ घाट",
                                "nameEn": "Siddhanatha Ghata"
                            },
                            {
                                "value": "900168",
                                "name": "सिरकी मोहाल 57 चक",
                                "nameEn": "Sirakee Mohala 57 Chak"
                            },
                            {
                                "value": "900160",
                                "name": "सिविल लाईन्‍स 14 15 चक",
                                "nameEn": "Sivila Laeensa 14 15 Chak"
                            },
                            {
                                "value": "900112",
                                "name": "सि‍‍विल लाईन्‍स 16",
                                "nameEn": "Sivila Laeensa 16"
                            },
                            {
                                "value": "900122",
                                "name": "सिविल लार्इन्‍स 13",
                                "nameEn": "Sivila Larinsa 13"
                            },
                            {
                                "value": "900169",
                                "name": "सीताराम मोहाल 61 चक",
                                "nameEn": "Seetarama Mohala 61 Chak"
                            },
                            {
                                "value": "900033",
                                "name": "सीसामऊ चक सं०-१०४",
                                "nameEn": "Seesamaoo Chak Sn0-104"
                            },
                            {
                                "value": "900060",
                                "name": "सुखनीपुर",
                                "nameEn": "Sukhaneepura"
                            },
                            {
                                "value": "900013",
                                "name": "सुतरखाना चक सं०-७१",
                                "nameEn": "Sutarakhana Chak Sn0-71"
                            },
                            {
                                "value": "900084",
                                "name": "हटिया 47",
                                "nameEn": "Hatiya 47"
                            },
                            {
                                "value": "900186",
                                "name": "हरजेन्‍दर नगर",
                                "nameEn": "Harajendara Nagara"
                            },
                            {
                                "value": "900181",
                                "name": "हरबंश मोहाल 62 63 चक",
                                "nameEn": "Harabnsha Mohala 62 63 Chak"
                            },
                            {
                                "value": "900062",
                                "name": "ह‍र्रिया",
                                "nameEn": "Hrriya"
                            },
                            {
                                "value": "900083",
                                "name": "हालसी रोड 46",
                                "nameEn": "Halasee Roda 46"
                            },
                            {
                                "value": "900014",
                                "name": "हालसी रोड चक सं०-46 75",
                                "nameEn": "Halasee Roda Chak Sn0-46 75"
                            },
                            {
                                "value": "900029",
                                "name": "हैरिसगंज",
                                "nameEn": "Hairisagnja"
                            }
                        ],
                        "209": [
                            {
                                "value": "900934",
                                "name": "अचाक पुरवा",
                                "nameEn": "AChak Purava"
                            },
                            {
                                "value": "900959",
                                "name": "अजीमुल्ला नगर बिठूर कला",
                                "nameEn": "Ajeemulla Nagara Bithoora Kala"
                            },
                            {
                                "value": "901043",
                                "name": "अवधपुरी",
                                "nameEn": "Avadhapuree"
                            },
                            {
                                "value": "900936",
                                "name": "अशोक नगर चक–111 व 111ए",
                                "nameEn": "Ashoka Nagara Chak–111 Va 111e"
                            },
                            {
                                "value": "900935",
                                "name": "आजाद नगर चक–2ए",
                                "nameEn": "Azad Nagara Chak–2e"
                            },
                            {
                                "value": "901094",
                                "name": "आजाद नगर⁄ न्यू आजाद नगर (जी0टी0 राेड)",
                                "nameEn": "Azad Nagara⁄ Nyoo Azad Nagara (jee0tee0 Raeda)"
                            },
                            {
                                "value": "220301",
                                "name": "आराजी लश्कर",
                                "nameEn": "Aarajee Lshkara"
                            },
                            {
                                "value": "900960",
                                "name": "आराजी लश्कर",
                                "nameEn": "Aarajee Lshkara"
                            },
                            {
                                "value": "900941",
                                "name": "आर्य नगर चक–08 व 112",
                                "nameEn": "Aarya Nagara Chak–08 Va 112"
                            },
                            {
                                "value": "901099",
                                "name": "इन्द्रानगर",
                                "nameEn": "Indranagara"
                            },
                            {
                                "value": "901054",
                                "name": "ईदगाह कालोनी चक–09",
                                "nameEn": "Eedagaha Kalonee Chak–09"
                            },
                            {
                                "value": "150307",
                                "name": "ईश्वरीगंज",
                                "nameEn": "Eeshvareegnja"
                            },
                            {
                                "value": "900946",
                                "name": "उजियारिन पुरवा ख्योरा कंछार",
                                "nameEn": "Ujiyarina Purava Khyora Knchhara"
                            },
                            {
                                "value": "900962",
                                "name": "एन0आर0आई0 सिटी कटरी ख्यौरा",
                                "nameEn": "Ena0aara0aaee0 Sitee Kataree Khyaura"
                            },
                            {
                                "value": "901056",
                                "name": "एलनगंज चक–10",
                                "nameEn": "Elanagnja Chak–10"
                            },
                            {
                                "value": "900944",
                                "name": "कंघी मोहाल चक–99",
                                "nameEn": "Knghee Mohala Chak–99"
                            },
                            {
                                "value": "150365",
                                "name": "कटरा घनश्याम",
                                "nameEn": "Katara Ghanshyama"
                            },
                            {
                                "value": "150320",
                                "name": "कटरी कानपुर कोहना",
                                "nameEn": "Kataree Kanapura Kohana"
                            },
                            {
                                "value": "220306",
                                "name": "कटरी ख्यौरा",
                                "nameEn": "Kataree Khyaura"
                            },
                            {
                                "value": "150318",
                                "name": "कटरी ज्योरा नवाबगंज",
                                "nameEn": "Kataree Jyora Navabagnja"
                            },
                            {
                                "value": "150292",
                                "name": "कटरी बिठूर कँला",
                                "nameEn": "Kataree Bithoora Knla"
                            },
                            {
                                "value": "150293",
                                "name": "कटरी बिठूर खुर्द",
                                "nameEn": "Kataree Bithoora Khurd"
                            },
                            {
                                "value": "150322",
                                "name": "कटरी लक्ष्मी खेड़ा",
                                "nameEn": "Kataree Laksh्mee Khera"
                            },
                            {
                                "value": "150321",
                                "name": "कटरी लोधवा खेड़ा",
                                "nameEn": "Kataree Lodhava Khera"
                            },
                            {
                                "value": "150319",
                                "name": "कटरी शंकरपुर सराय",
                                "nameEn": "Kataree Shnkarapura Saraya"
                            },
                            {
                                "value": "901060",
                                "name": "कर्नेलगंज-101",
                                "nameEn": "Krnelagnja-101"
                            },
                            {
                                "value": "900943",
                                "name": "कर्नेलगंज चक–96 व 100‚101‚102‚103",
                                "nameEn": "Krnelagnja Chak–96 Va 100‚101‚102‚103"
                            },
                            {
                                "value": "901058",
                                "name": "कासिमगंज चक–89",
                                "nameEn": "Kasimagnja Chak–89"
                            },
                            {
                                "value": "150333",
                                "name": "कुरसौली",
                                "nameEn": "Kurasaulee"
                            },
                            {
                                "value": "901044",
                                "name": "केसा कालोनी",
                                "nameEn": "Kesa Kalonee"
                            },
                            {
                                "value": "901057",
                                "name": "खलासी लाईन चक–10",
                                "nameEn": "Khalasee Laeena Chak–10"
                            },
                            {
                                "value": "150305",
                                "name": "खुशहाल गंज",
                                "nameEn": "Khushahala Ganj"
                            },
                            {
                                "value": "220320",
                                "name": "ख्योरा कछार",
                                "nameEn": "Khyora Kachhara"
                            },
                            {
                                "value": "900956",
                                "name": "ख्योरा कंछार",
                                "nameEn": "Khyora Knchhara"
                            },
                            {
                                "value": "900947",
                                "name": "ख्योरा बांगर",
                                "nameEn": "Khyora Bangara"
                            },
                            {
                                "value": "220321",
                                "name": "ख्योरा बांगर",
                                "nameEn": "Khyora Bangara"
                            },
                            {
                                "value": "150327",
                                "name": "गंगपुर कछार",
                                "nameEn": "Gngapura Kachhara"
                            },
                            {
                                "value": "150315",
                                "name": "गंगपुर चकबदा",
                                "nameEn": "Gngapura Chakbada"
                            },
                            {
                                "value": "220326",
                                "name": "गंगापुर",
                                "nameEn": "Gngapura"
                            },
                            {
                                "value": "901045",
                                "name": "गडरियनपुरवा चक–02",
                                "nameEn": "Gadariyanapurava Chak–02"
                            },
                            {
                                "value": "150354",
                                "name": "गढ़ी कानपुर",
                                "nameEn": "Garhee Kanapura"
                            },
                            {
                                "value": "150369",
                                "name": "गदन खेड़ा",
                                "nameEn": "Gadana Khera"
                            },
                            {
                                "value": "150309",
                                "name": "गम्भीरपुर कछार",
                                "nameEn": "Gmbheerapura Kachhara"
                            },
                            {
                                "value": "900931",
                                "name": "गांधी नगर चक–105",
                                "nameEn": "Gandhee Nagara Chak–105"
                            },
                            {
                                "value": "900945",
                                "name": "गुटैया चक–07",
                                "nameEn": "Gutaiya Chak–07"
                            },
                            {
                                "value": "901062",
                                "name": "ग्वालटोली चक–12 व 12ए",
                                "nameEn": "Gvalatolee Chak–12 Va 12e"
                            },
                            {
                                "value": "900938",
                                "name": "घुसरामऊ चक–111ए",
                                "nameEn": "Ghusaramaoo Chak–111e"
                            },
                            {
                                "value": "150329",
                                "name": "चकरतनपुर",
                                "nameEn": "Chakratanapura"
                            },
                            {
                                "value": "220330",
                                "name": "चचेण्डी - सचेण्डी-I",
                                "nameEn": "Chachendee - Sachendee-I"
                            },
                            {
                                "value": "220331",
                                "name": "चचेण्डी - सचेण्डी-II",
                                "nameEn": "Chachendee - Sachendee-II"
                            },
                            {
                                "value": "901046",
                                "name": "चन्द नगर ⁄ चन्द्र बिहार",
                                "nameEn": "Chnda Nagara ⁄ Chndra Bihara"
                            },
                            {
                                "value": "900930",
                                "name": "चमनगंज चक–88 व 105",
                                "nameEn": "Chamanagnja Chak–88 Va 105"
                            },
                            {
                                "value": "901047",
                                "name": "चमारनपुरवा",
                                "nameEn": "Chamaranapurava"
                            },
                            {
                                "value": "150310",
                                "name": "चिरान",
                                "nameEn": "Chirana"
                            },
                            {
                                "value": "901061",
                                "name": "चुन्नीगंज चक–96 व 100 101‚102‚103‚105‚",
                                "nameEn": "Chunneegnja Chak–96 Va 100 101‚102‚103‚105‚"
                            },
                            {
                                "value": "150351",
                                "name": "छीतेपुर",
                                "nameEn": "Chheetepura"
                            },
                            {
                                "value": "901065",
                                "name": "जवाहर नगर चक–107",
                                "nameEn": "Javahara Nagara Chak–107"
                            },
                            {
                                "value": "901079",
                                "name": "ज्योरा",
                                "nameEn": "Jyora"
                            },
                            {
                                "value": "220334",
                                "name": "ज्योरा नवाबगंज",
                                "nameEn": "Jyora Navabagnja"
                            },
                            {
                                "value": "901080",
                                "name": "ज्योरा नवाबगंज",
                                "nameEn": "Jyora Navabagnja"
                            },
                            {
                                "value": "150342",
                                "name": "झखरा",
                                "nameEn": "Jhakhara"
                            },
                            {
                                "value": "150336",
                                "name": "टिकरा कानपुर",
                                "nameEn": "Tikara Kanapura"
                            },
                            {
                                "value": "150337",
                                "name": "टिकरी",
                                "nameEn": "Tikaree"
                            },
                            {
                                "value": "901089",
                                "name": "टुकनियापुरवा चक–105",
                                "nameEn": "Tukaniyapurava Chak–105"
                            },
                            {
                                "value": "901075",
                                "name": "डिप्टी का पडाव 89",
                                "nameEn": "Diptee Ka Padava 89"
                            },
                            {
                                "value": "900985",
                                "name": "तात्या टोपे नगर आराजी लश्कर",
                                "nameEn": "Tatya Tope Nagara Aarajee Lshkara"
                            },
                            {
                                "value": "901067",
                                "name": "तिलक नगर चक–07",
                                "nameEn": "Tilaka Nagara Chak–07"
                            },
                            {
                                "value": "901048",
                                "name": "दयानन्द बिहार",
                                "nameEn": "Dayannda Bihara"
                            },
                            {
                                "value": "901076",
                                "name": "दलेलपुरवा चक–89 व 91",
                                "nameEn": "Dalelapurava Chak–89 Va 91"
                            },
                            {
                                "value": "901081",
                                "name": "दीन दयाल नगर",
                                "nameEn": "Deena Dayala Nagara"
                            },
                            {
                                "value": "150344",
                                "name": "दूल",
                                "nameEn": "Doola"
                            },
                            {
                                "value": "220348",
                                "name": "धरमंगदपुर",
                                "nameEn": "Dharamngadapura"
                            },
                            {
                                "value": "150313",
                                "name": "धरमपुर",
                                "nameEn": "Dharamapura"
                            },
                            {
                                "value": "900988",
                                "name": "धुव नगर बिठूर कला",
                                "nameEn": "Dhuva Nagara Bithoora Kala"
                            },
                            {
                                "value": "150346",
                                "name": "नकटू",
                                "nameEn": "Nakatoo"
                            },
                            {
                                "value": "901082",
                                "name": "नवाबगंज चक–1 व 2 व 2ए व 3",
                                "nameEn": "Navabagnja Chak–1 Va 2 Va 2e Va 3"
                            },
                            {
                                "value": "901083",
                                "name": "नवाबगंज चक–3ए",
                                "nameEn": "Navabagnja Chak–3e"
                            },
                            {
                                "value": "901095",
                                "name": "नाजिरबाग चक–98",
                                "nameEn": "Najirabaga Chak–98"
                            },
                            {
                                "value": "150328",
                                "name": "नारामऊ कछार",
                                "nameEn": "Naramaoo Kachhara"
                            },
                            {
                                "value": "901069",
                                "name": "नारामऊ कछार",
                                "nameEn": "Naramaoo Kachhara"
                            },
                            {
                                "value": "220349",
                                "name": "नारामऊ बांगर",
                                "nameEn": "Naramaoo Bangara"
                            },
                            {
                                "value": "901070",
                                "name": "नारामऊ बांगार",
                                "nameEn": "Naramaoo Bangara"
                            },
                            {
                                "value": "901066",
                                "name": "नेहरू नगर चक–107",
                                "nameEn": "Neharoo Nagara Chak–107"
                            },
                            {
                                "value": "150335",
                                "name": "नौरंगाबाद",
                                "nameEn": "Naurngabada"
                            },
                            {
                                "value": "150368",
                                "name": "पकरी",
                                "nameEn": "Pakaree"
                            },
                            {
                                "value": "901049",
                                "name": "पत्रकारपुरम स्‍कीम;38 ⁄पाषर्द नगर",
                                "nameEn": "Patrkarapurama Skeema;38 ⁄pashrda Nagara"
                            },
                            {
                                "value": "150350",
                                "name": "पनका बहादुर नगर",
                                "nameEn": "Panaka Bahadura Nagara"
                            },
                            {
                                "value": "150325",
                                "name": "परगही बांगर",
                                "nameEn": "Paragahee Bangara"
                            },
                            {
                                "value": "900948",
                                "name": "परमियांपुरवा",
                                "nameEn": "Paramiyanpurava"
                            },
                            {
                                "value": "901084",
                                "name": "पहलवान का पुरवा",
                                "nameEn": "Pahalavana Ka Purava"
                            },
                            {
                                "value": "901086",
                                "name": "पुराना कानपुर चक–2ए",
                                "nameEn": "Purana Kanapura Chak–2e"
                            },
                            {
                                "value": "901087",
                                "name": "पुराना कानपुर चक–3ए व 4 व 5 व 6",
                                "nameEn": "Purana Kanapura Chak–3e Va 4 Va 5 Va 6"
                            },
                            {
                                "value": "150306",
                                "name": "पृथ्वीगंज",
                                "nameEn": "Prithveegnja"
                            },
                            {
                                "value": "900997",
                                "name": "पेशवा नगर बिठूर खुर्द",
                                "nameEn": "Peshava Nagara Bithoora Khurd"
                            },
                            {
                                "value": "150302",
                                "name": "पैगूपुर कछार",
                                "nameEn": "Paigoopura Kachhara"
                            },
                            {
                                "value": "150299",
                                "name": "पैगूपुर बांगर",
                                "nameEn": "Paigoopura Bangara"
                            },
                            {
                                "value": "150356",
                                "name": "प्रतापपुर सरसई",
                                "nameEn": "Pratapapura Sarasaee"
                            },
                            {
                                "value": "150311",
                                "name": "प्रतापपुर हरी",
                                "nameEn": "Pratapapura Haree"
                            },
                            {
                                "value": "901050",
                                "name": "प्रहलाद का पुरवा",
                                "nameEn": "Prahalada Ka Purava"
                            },
                            {
                                "value": "900932",
                                "name": "प्रेम नगर चक–105",
                                "nameEn": "Prema Nagara Chak–105"
                            },
                            {
                                "value": "900933",
                                "name": "प्रेम नगर चक–88",
                                "nameEn": "Prema Nagara Chak–88"
                            },
                            {
                                "value": "220358",
                                "name": "फत्तेपुर उत्तर",
                                "nameEn": "Phttepura Uttara"
                            },
                            {
                                "value": "150324",
                                "name": "बगदौधीकछार परगहीकछार",
                                "nameEn": "Bagadaudheekachhara Paragaheekachhara"
                            },
                            {
                                "value": "150323",
                                "name": "बगदौधी बांगर",
                                "nameEn": "Bagadaudhee Bangara"
                            },
                            {
                                "value": "900949",
                                "name": "बरसाईतपुर",
                                "nameEn": "Barasaeetapura"
                            },
                            {
                                "value": "150300",
                                "name": "बरहट कछार",
                                "nameEn": "Barahata Kachhara"
                            },
                            {
                                "value": "150298",
                                "name": "बरहट बाँगर",
                                "nameEn": "Barahata Bangara"
                            },
                            {
                                "value": "150340",
                                "name": "बहेड़ा",
                                "nameEn": "Bahera"
                            },
                            {
                                "value": "220384",
                                "name": "बिठूर कलां",
                                "nameEn": "Bithoora Kalan"
                            },
                            {
                                "value": "220385",
                                "name": "बिठूर खुर्द",
                                "nameEn": "Bithoora Khurd"
                            },
                            {
                                "value": "900950",
                                "name": "बिनुवापुर नौबस्ता",
                                "nameEn": "Binuvapura Naubsta"
                            },
                            {
                                "value": "900957",
                                "name": "बेकनगंज चक–98 व 99",
                                "nameEn": "Bekanagnja Chak–98 Va 99"
                            },
                            {
                                "value": "900958",
                                "name": "बेनाझाबर चक–112",
                                "nameEn": "Benajhabara Chak–112"
                            },
                            {
                                "value": "150308",
                                "name": "बैकुण्ठपुर",
                                "nameEn": "Baikunthapura"
                            },
                            {
                                "value": "220364",
                                "name": "बैरी अकबरपुर कछार",
                                "nameEn": "Bairee Akbarpur Kachhara"
                            },
                            {
                                "value": "901071",
                                "name": "बैरी अकबरपुर कछार",
                                "nameEn": "Bairee Akbarpur Kachhara"
                            },
                            {
                                "value": "220365",
                                "name": "बैरी अकबरपुर बांगर",
                                "nameEn": "Bairee Akbarpur Bangara"
                            },
                            {
                                "value": "901072",
                                "name": "बैरी अकबरपुर बांगर (आजाद नगर व अवन्तीपुरम)",
                                "nameEn": "Bairee Akbarpur Bangara (Azad Nagara Va Avnteepurama)"
                            },
                            {
                                "value": "900937",
                                "name": "ब्रम्‍‍ह नगर चक–111",
                                "nameEn": "Brmha Nagara Chak–111"
                            },
                            {
                                "value": "150367",
                                "name": "भिसार",
                                "nameEn": "Bhisara"
                            },
                            {
                                "value": "150347",
                                "name": "भीसीजरगाँव",
                                "nameEn": "BheeseejaraGanw"
                            },
                            {
                                "value": "150345",
                                "name": "भूल",
                                "nameEn": "Bhoola"
                            },
                            {
                                "value": "901088",
                                "name": "भैरो घाट चक–3 व 3ए",
                                "nameEn": "Bhairo Ghata Chak–3 Va 3e"
                            },
                            {
                                "value": "150352",
                                "name": "भैलामऊ",
                                "nameEn": "Bhailamaoo"
                            },
                            {
                                "value": "150348",
                                "name": "भौतीखेड़ा",
                                "nameEn": "Bhauteekhera"
                            },
                            {
                                "value": "150349",
                                "name": "भौती प्रतापपुर",
                                "nameEn": "Bhautee Pratapapura"
                            },
                            {
                                "value": "900951",
                                "name": "मकडी खेडा",
                                "nameEn": "Makadee Kheda"
                            },
                            {
                                "value": "901055",
                                "name": "मकराबर्टगंज चक–09",
                                "nameEn": "Makarabrtagnja Chak–09"
                            },
                            {
                                "value": "150339",
                                "name": "मकसूदाबाद",
                                "nameEn": "Makasoodabada"
                            },
                            {
                                "value": "900952",
                                "name": "मदारपुर",
                                "nameEn": "Madarapura"
                            },
                            {
                                "value": "901019",
                                "name": "महर्षि बाल्मीकि नगर आराजी लश्कर",
                                "nameEn": "Mahrshi Balmeeki Nagara Aarajee Lshkara"
                            },
                            {
                                "value": "901051",
                                "name": "मुखर्जी बिहार",
                                "nameEn": "Mukhrjee Bihara"
                            },
                            {
                                "value": "901020",
                                "name": "मैनावती नगर बिठूर कलॉ",
                                "nameEn": "Mainavatee Nagara Bithoora Kalao"
                            },
                            {
                                "value": "150296",
                                "name": "मोहम्मदपुर",
                                "nameEn": "Mohmmadapura"
                            },
                            {
                                "value": "150294",
                                "name": "रमेल कछार",
                                "nameEn": "Ramela Kachhara"
                            },
                            {
                                "value": "150297",
                                "name": "रमेल बांगर",
                                "nameEn": "Ramela Bangara"
                            },
                            {
                                "value": "901085",
                                "name": "रानी गंज",
                                "nameEn": "Ranee Ganj"
                            },
                            {
                                "value": "900940",
                                "name": "रामक्रष्‍ण नगर चक–110",
                                "nameEn": "Ramkrshna Nagara Chak–110"
                            },
                            {
                                "value": "150355",
                                "name": "रामपुर भीमसेन",
                                "nameEn": "Ramapura Bheemasena"
                            },
                            {
                                "value": "901090",
                                "name": "राम बाग चक–104ए",
                                "nameEn": "Rama Baga Chak–104e"
                            },
                            {
                                "value": "901073",
                                "name": "रूद्रपुर",
                                "nameEn": "Roodrapura"
                            },
                            {
                                "value": "150331",
                                "name": "रैकेपुर",
                                "nameEn": "Raikepura"
                            },
                            {
                                "value": "150341",
                                "name": "रौतेपुर",
                                "nameEn": "Rautepura"
                            },
                            {
                                "value": "901027",
                                "name": "लक्ष्मीबाई नगर बिठूर कलॉ",
                                "nameEn": "Laksh्meebaee Nagara Bithoora Kalao"
                            },
                            {
                                "value": "901052",
                                "name": "लखनपुर",
                                "nameEn": "Lakhanapura"
                            },
                            {
                                "value": "901028",
                                "name": "लवकुश नगर आराजी लश्कर",
                                "nameEn": "Lavakusha Nagara Aarajee Lshkara"
                            },
                            {
                                "value": "220389",
                                "name": "लिखनपुर",
                                "nameEn": "Likhanapura"
                            },
                            {
                                "value": "220374",
                                "name": "लोहदर",
                                "nameEn": "Lohadara"
                            },
                            {
                                "value": "150332",
                                "name": "लोहार खेड़ा",
                                "nameEn": "Lohara Khera"
                            },
                            {
                                "value": "901053",
                                "name": "विकास नगर",
                                "nameEn": "Vikasa Nagara"
                            },
                            {
                                "value": "901093",
                                "name": "विष्णुपुरी चक–3 व 3ए",
                                "nameEn": "Vishnupuree Chak–3 Va 3e"
                            },
                            {
                                "value": "220393",
                                "name": "विसायकपुर कछार",
                                "nameEn": "Visayakapura Kachhara"
                            },
                            {
                                "value": "900953",
                                "name": "विसायकपुर कछांर",
                                "nameEn": "Visayakapura Kachhanra"
                            },
                            {
                                "value": "900954",
                                "name": "विसायकपुर बंगार",
                                "nameEn": "Visayakapura Bngara"
                            },
                            {
                                "value": "220394",
                                "name": "विसायकपुर बाँगर",
                                "nameEn": "Visayakapura Bangara"
                            },
                            {
                                "value": "150316",
                                "name": "सम्भरपुर",
                                "nameEn": "Smbharapura"
                            },
                            {
                                "value": "901063",
                                "name": "सिविल लाइन्स चक–12 व 12ए",
                                "nameEn": "Sivila Lainsa Chak–12 Va 12e"
                            },
                            {
                                "value": "150314",
                                "name": "सिंहपुर कछार",
                                "nameEn": "Sinhapura Kachhara"
                            },
                            {
                                "value": "901092",
                                "name": "सीसामऊ चक–105",
                                "nameEn": "Seesamaoo Chak–105"
                            },
                            {
                                "value": "900955",
                                "name": "सुक्खा पुरवा",
                                "nameEn": "Sukkha Purava"
                            },
                            {
                                "value": "150353",
                                "name": "सुजानपुरा",
                                "nameEn": "Sujanapura"
                            },
                            {
                                "value": "150343",
                                "name": "सुरार",
                                "nameEn": "Surara"
                            },
                            {
                                "value": "901091",
                                "name": "सूटरगंज चक–11",
                                "nameEn": "Sootaragnja Chak–11"
                            },
                            {
                                "value": "901036",
                                "name": "सूबेदार नगर आराजी लश्कर",
                                "nameEn": "Soobedara Nagara Aarajee Lshkara"
                            },
                            {
                                "value": "901068",
                                "name": "स्वरूप नगर चक–112 व 113 व 7",
                                "nameEn": "Svaroopa Nagara Chak–112 Va 113 Va 7"
                            },
                            {
                                "value": "900939",
                                "name": "हर्ष नगर चक–111",
                                "nameEn": "Hrsha Nagara Chak–111"
                            },
                            {
                                "value": "901077",
                                "name": "हलवा खेडा",
                                "nameEn": "Halava Kheda"
                            },
                            {
                                "value": "150312",
                                "name": "हिन्दूपुर",
                                "nameEn": "Hindoopura"
                            },
                            {
                                "value": "150303",
                                "name": "हिरदेपुर",
                                "nameEn": "Hiradepura"
                            },
                            {
                                "value": "150301",
                                "name": "हींगूपुर कछार",
                                "nameEn": "Heengoopura Kachhara"
                            },
                            {
                                "value": "150295",
                                "name": "हींगूपुर बांगर",
                                "nameEn": "Heengoopura Bangara"
                            },
                            {
                                "value": "901096",
                                "name": "हीरामन का पुरवा चक–91 व 92",
                                "nameEn": "Heeramana Ka Purava Chak–91 Va 92"
                            },
                            {
                                "value": "150326",
                                "name": "होरा कछार",
                                "nameEn": "Hora Kachhara"
                            },
                            {
                                "value": "150330",
                                "name": "होरा बांगर",
                                "nameEn": "Hora Bangara"
                            }
                        ],
                        "210": [
                            {
                                "value": "900705",
                                "name": "127 आनन्दपुरी",
                                "nameEn": "127 Aanndapuree"
                            },
                            {
                                "value": "900702",
                                "name": "127 जूही एस ब्लाक बिनोबा नगर",
                                "nameEn": "127 Joohee Esa Blaka Binoba Nagara"
                            },
                            {
                                "value": "900714",
                                "name": "127 डबलू 2 नहर के पूर्व बसंत बिहार",
                                "nameEn": "127 Dabaloo 2 Nahara Ke Poorva Basnta Bihara"
                            },
                            {
                                "value": "900537",
                                "name": "127 डब्लू डब्‍लू 1 साकेत नगर",
                                "nameEn": "127 Dbloo Dbloo 1 Saketa Nagara"
                            },
                            {
                                "value": "900764",
                                "name": "127 निराला नगर",
                                "nameEn": "127 Nirala Nagara"
                            },
                            {
                                "value": "900763",
                                "name": "127 निराला नगर टी ब्‍लाक",
                                "nameEn": "127 Nirala Nagara Tee Blaka"
                            },
                            {
                                "value": "900762",
                                "name": "127 निराला नगर यू ब्‍लाक",
                                "nameEn": "127 Nirala Nagara Yoo Blaka"
                            },
                            {
                                "value": "900594",
                                "name": "128 किदवई नगर ए बी सी साइट न 1",
                                "nameEn": "128 Kidavaee Nagara E Bee See Saita Na 1"
                            },
                            {
                                "value": "900632",
                                "name": "128 किदवई नगर एल आई सी",
                                "nameEn": "128 Kidavaee Nagara Ela Aaee See"
                            },
                            {
                                "value": "900614",
                                "name": "128 किदवई नगर के ओ ब्लाक एवं सूची में वर्णित के अतिरिक्त अन्य",
                                "nameEn": "128 Kidavaee Nagara Ke O Blaka Evn Soochee Men Vrnita Ke Atirikta Anya"
                            },
                            {
                                "value": "900625",
                                "name": "128 किदवई नगर ब्लाक एच एच 1 व एच 2 एवं के",
                                "nameEn": "128 Kidavaee Nagara Blaka Echa Echa 1 Va Echa 2 Evn Ke"
                            },
                            {
                                "value": "900768",
                                "name": "128 किदवई नगर ब्लाक वाई‚वाई–1",
                                "nameEn": "128 Kidavaee Nagara Blaka Vaee‚vaee–1"
                            },
                            {
                                "value": "900630",
                                "name": "128 गोवर्धनपुरवा",
                                "nameEn": "128 Govrdhanapurava"
                            },
                            {
                                "value": "900769",
                                "name": "128 पशुपति नगर",
                                "nameEn": "128 Pashupati Nagara"
                            },
                            {
                                "value": "900618",
                                "name": "128 बाबूपुरवा",
                                "nameEn": "128 Baboopurava"
                            },
                            {
                                "value": "900599",
                                "name": "129 किदवई नगर",
                                "nameEn": "129 Kidavaee Nagara"
                            },
                            {
                                "value": "900784",
                                "name": "129 बाबूपुरवा",
                                "nameEn": "129 Baboopurava"
                            },
                            {
                                "value": "900001",
                                "name": "130 अजीतगंज",
                                "nameEn": "130 Ajeetagnja"
                            },
                            {
                                "value": "900819",
                                "name": "130 अजीतगंज आबादी",
                                "nameEn": "130 Ajeetagnja Aabadee"
                            },
                            {
                                "value": "900820",
                                "name": "130 अजीतगंज कालोनी",
                                "nameEn": "130 Ajeetagnja Kalonee"
                            },
                            {
                                "value": "900468",
                                "name": "130 खटिकाना बाबूपुरवा",
                                "nameEn": "130 Khatikana Baboopurava"
                            },
                            {
                                "value": "900786",
                                "name": "130 बगाही",
                                "nameEn": "130 Bagahee"
                            },
                            {
                                "value": "900787",
                                "name": "130 बगाही भठठा",
                                "nameEn": "130 Bagahee Bhathatha"
                            },
                            {
                                "value": "900785",
                                "name": "130 बाकरगंज",
                                "nameEn": "130 Bakaragnja"
                            },
                            {
                                "value": "900788",
                                "name": "131 बेगमपुरवा",
                                "nameEn": "131 Begamapurava"
                            },
                            {
                                "value": "901113",
                                "name": "132 बाबू पुरवा",
                                "nameEn": "132 Baboo Purava"
                            },
                            {
                                "value": "900789",
                                "name": "132 मुंशीपुरवा",
                                "nameEn": "132 Munsheepurava"
                            },
                            {
                                "value": "900495",
                                "name": "133 आनन्‍दपुरी",
                                "nameEn": "133 Aanndapuree"
                            },
                            {
                                "value": "900476",
                                "name": "133 किदवई नगर",
                                "nameEn": "133 Kidavaee Nagara"
                            },
                            {
                                "value": "900483",
                                "name": "133 किदवई नगर ओ ब्‍लाक एम एन साइट नं 1",
                                "nameEn": "133 Kidavaee Nagara O Blaka Ema Ena Saita Nn 1"
                            },
                            {
                                "value": "900723",
                                "name": "133जूही हमीरपुर रोड",
                                "nameEn": "133joohee Hameerapura Roda"
                            },
                            {
                                "value": "900491",
                                "name": "133 टान्‍सपोर्ट नगर",
                                "nameEn": "133 Tansaporta Nagara"
                            },
                            {
                                "value": "900486",
                                "name": "133 नया पुरवा",
                                "nameEn": "133 Naya Purava"
                            },
                            {
                                "value": "900470",
                                "name": "133 सब्‍जीमण्‍डी ओ ब्‍लाक",
                                "nameEn": "133 Sbjeemndee O Blaka"
                            },
                            {
                                "value": "900506",
                                "name": "78–79 लाटूश रोड",
                                "nameEn": "78–79 Latoosha Roda"
                            },
                            {
                                "value": "900500",
                                "name": "78–90 अनवरगंज",
                                "nameEn": "78–90 Anavaragnja"
                            },
                            {
                                "value": "900527",
                                "name": "79 बासमण्‍डी",
                                "nameEn": "79 Basamndee"
                            },
                            {
                                "value": "900518",
                                "name": "90 इफितखाराबाद",
                                "nameEn": "90 Iphitakharabada"
                            },
                            {
                                "value": "900511",
                                "name": "90फूलवाली गली",
                                "nameEn": "90phoolavalee Galee"
                            },
                            {
                                "value": "900524",
                                "name": "90 बेकनगंज",
                                "nameEn": "90 Bekanagnja"
                            },
                            {
                                "value": "150455",
                                "name": "अटवा",
                                "nameEn": "Atwa"
                            },
                            {
                                "value": "900677",
                                "name": "अम्‍बेडक्‍र नगर",
                                "nameEn": "Ambedkra Nagara"
                            },
                            {
                                "value": "220299",
                                "name": "अरर्ा",
                                "nameEn": "Arra"
                            },
                            {
                                "value": "900732",
                                "name": "अर्रा",
                                "nameEn": "Arra"
                            },
                            {
                                "value": "220298",
                                "name": "अहिरवाँ",
                                "nameEn": "Ahiravan"
                            },
                            {
                                "value": "900802",
                                "name": "अहिरवां",
                                "nameEn": "Ahiravan"
                            },
                            {
                                "value": "900778",
                                "name": "आदर्श नगर",
                                "nameEn": "Aadrsha Nagara"
                            },
                            {
                                "value": "900840",
                                "name": "आदर्श नगर",
                                "nameEn": "Aadrsha Nagara"
                            },
                            {
                                "value": "900737",
                                "name": "आनन्‍द बिहार",
                                "nameEn": "Aannda Bihara"
                            },
                            {
                                "value": "150458",
                                "name": "आराजी मझावन",
                                "nameEn": "Aarajee Majhavana"
                            },
                            {
                                "value": "220297",
                                "name": "इमलीपुर",
                                "nameEn": "Imaleepura"
                            },
                            {
                                "value": "900533",
                                "name": "उस्‍मानपुर",
                                "nameEn": "Usmanapura"
                            },
                            {
                                "value": "220303",
                                "name": "उस्मानपुर",
                                "nameEn": "Usmanapura"
                            },
                            {
                                "value": "900535",
                                "name": "उस्‍मानपुर केडीए कालोनी",
                                "nameEn": "Usmanapura Kedeee Kalonee"
                            },
                            {
                                "value": "150430",
                                "name": "ओरियारा",
                                "nameEn": "Oriyara"
                            },
                            {
                                "value": "900549",
                                "name": "कंजर पुरवा",
                                "nameEn": "Knjara Purava"
                            },
                            {
                                "value": "900657",
                                "name": "कमालपुर",
                                "nameEn": "Kamalapura"
                            },
                            {
                                "value": "900794",
                                "name": "करमपुर",
                                "nameEn": "Karamapura"
                            },
                            {
                                "value": "900733",
                                "name": "कर्रही",
                                "nameEn": "Krrahee"
                            },
                            {
                                "value": "900588",
                                "name": "किदवई नगर केडीए कालोनी",
                                "nameEn": "Kidavaee Nagara Kedeee Kalonee"
                            },
                            {
                                "value": "900577",
                                "name": "किदवई नगर ब्‍लाक डी ई एफ जी",
                                "nameEn": "Kidavaee Nagara Blaka Dee Ee Epha Jee"
                            },
                            {
                                "value": "900753",
                                "name": "कुंज बिहार",
                                "nameEn": "Kunja Bihara"
                            },
                            {
                                "value": "900563",
                                "name": "कुम्‍हारटोला",
                                "nameEn": "Kumharatola"
                            },
                            {
                                "value": "900660",
                                "name": "कुरियां",
                                "nameEn": "Kuriyan"
                            },
                            {
                                "value": "900568",
                                "name": "कृष्णा नगर",
                                "nameEn": "Krishna Nagara"
                            },
                            {
                                "value": "900566",
                                "name": "कृष्‍णापुरम",
                                "nameEn": "Krishnapurama"
                            },
                            {
                                "value": "900841",
                                "name": "के आर पुरम",
                                "nameEn": "Ke Aara Puram"
                            },
                            {
                                "value": "900756",
                                "name": "के डी ए कालोनी",
                                "nameEn": "Ke Dee E Kalonee"
                            },
                            {
                                "value": "900739",
                                "name": "के डी ए कालोनी अर्रा",
                                "nameEn": "Ke Dee E Kalonee Arra"
                            },
                            {
                                "value": "900757",
                                "name": "के डी ए कालोनी गंगापुर",
                                "nameEn": "Ke Dee E Kalonee Gngapura"
                            },
                            {
                                "value": "900709",
                                "name": "के डी ए कालोनी जूही",
                                "nameEn": "Ke Dee E Kalonee Joohee"
                            },
                            {
                                "value": "900765",
                                "name": "केनाल कालोनी",
                                "nameEn": "Kenala Kalonee"
                            },
                            {
                                "value": "900858",
                                "name": "कैटिल कालोनी",
                                "nameEn": "Kaitila Kalonee"
                            },
                            {
                                "value": "900844",
                                "name": "कोयला नगर",
                                "nameEn": "Koyala Nagara"
                            },
                            {
                                "value": "220322",
                                "name": "खजुरी",
                                "nameEn": "Khajuree"
                            },
                            {
                                "value": "150438",
                                "name": "खरगपुर",
                                "nameEn": "Kharagapura"
                            },
                            {
                                "value": "900686",
                                "name": "खाण्‍डेपुर",
                                "nameEn": "Khandepura"
                            },
                            {
                                "value": "220323",
                                "name": "खाण्डेपुर",
                                "nameEn": "Khandepura"
                            },
                            {
                                "value": "900556",
                                "name": "गंगागंज",
                                "nameEn": "Gngagnja"
                            },
                            {
                                "value": "900838",
                                "name": "गंगा नगर",
                                "nameEn": "Gnga Nagara"
                            },
                            {
                                "value": "900747",
                                "name": "गंगापुर मछरिया",
                                "nameEn": "Gngapura Machhariya"
                            },
                            {
                                "value": "900731",
                                "name": "गडरिनपुरवा",
                                "nameEn": "Gadarinapurava"
                            },
                            {
                                "value": "900849",
                                "name": "गणेशपुर",
                                "nameEn": "Ganeshapura"
                            },
                            {
                                "value": "900827",
                                "name": "गदियाना",
                                "nameEn": "Gadiyana"
                            },
                            {
                                "value": "900639",
                                "name": "गांधी ग्राम",
                                "nameEn": "Gandhee Grama"
                            },
                            {
                                "value": "900836",
                                "name": "गायत्री नगर",
                                "nameEn": "Gayatree Nagara"
                            },
                            {
                                "value": "900828",
                                "name": "गिरजा नगर",
                                "nameEn": "Giraja Nagara"
                            },
                            {
                                "value": "220325",
                                "name": "गुजैनी",
                                "nameEn": "Gujainee"
                            },
                            {
                                "value": "900675",
                                "name": "गुजैनी अन्‍य",
                                "nameEn": "Gujainee Anya"
                            },
                            {
                                "value": "900671",
                                "name": "गुजैनी कालेनी ब्‍लाक जे",
                                "nameEn": "Gujainee Kalenee Blaka Je"
                            },
                            {
                                "value": "900670",
                                "name": "गुजैनी कालोनी ब्‍लाक ई",
                                "nameEn": "Gujainee Kalonee Blaka Ee"
                            },
                            {
                                "value": "900664",
                                "name": "गुजैनी कालोनी ब्‍लाक ए",
                                "nameEn": "Gujainee Kalonee Blaka E"
                            },
                            {
                                "value": "900673",
                                "name": "गुजैनी कालोनी ब्‍लाक एच",
                                "nameEn": "Gujainee Kalonee Blaka Echa"
                            },
                            {
                                "value": "900674",
                                "name": "गुजैनी कालोनी ब्‍लाक के",
                                "nameEn": "Gujainee Kalonee Blaka Ke"
                            },
                            {
                                "value": "900672",
                                "name": "गुजैनी कालोनी ब्‍लाक जी",
                                "nameEn": "Gujainee Kalonee Blaka Jee"
                            },
                            {
                                "value": "900669",
                                "name": "गुजैनी कालोनी ब्‍लाक वाई",
                                "nameEn": "Gujainee Kalonee Blaka Vaee"
                            },
                            {
                                "value": "900667",
                                "name": "गुजैनी कालोनी ब्‍लाक सी",
                                "nameEn": "Gujainee Kalonee Blaka See"
                            },
                            {
                                "value": "900665",
                                "name": "गुजैनी कॉलोनी ब्लाक बी",
                                "nameEn": "Gujainee Kaolonee Blaka Bee"
                            },
                            {
                                "value": "900539",
                                "name": "गुलमोहर बिहार",
                                "nameEn": "Gulamohara Bihara"
                            },
                            {
                                "value": "900751",
                                "name": "गोपाल नगर",
                                "nameEn": "Gopala Nagara"
                            },
                            {
                                "value": "900853",
                                "name": "गौरिया",
                                "nameEn": "Gauriya"
                            },
                            {
                                "value": "150437",
                                "name": "घिसुरी",
                                "nameEn": "Ghisuree"
                            },
                            {
                                "value": "150457",
                                "name": "चकद्वारी",
                                "nameEn": "Chakdvaree"
                            },
                            {
                                "value": "900843",
                                "name": "चंदन नगर",
                                "nameEn": "Chndana Nagara"
                            },
                            {
                                "value": "900678",
                                "name": "चन्‍दारी गाव",
                                "nameEn": "Chndaree Gava"
                            },
                            {
                                "value": "900848",
                                "name": "चन्द्र नगरी",
                                "nameEn": "Chndra Nagaree"
                            },
                            {
                                "value": "900829",
                                "name": "चाणक्यपुरी",
                                "nameEn": "Chankyapuree"
                            },
                            {
                                "value": "900842",
                                "name": "चिश्ती नगर",
                                "nameEn": "Chishtee Nagara"
                            },
                            {
                                "value": "900814",
                                "name": "चेत नगर",
                                "nameEn": "Cheta Nagara"
                            },
                            {
                                "value": "900559",
                                "name": "छेदा की टटिया",
                                "nameEn": "Chheda Kee Tatiya"
                            },
                            {
                                "value": "900774",
                                "name": "छेदी सिह का पुरवा व बली का पुरवा",
                                "nameEn": "Chhedee Siha Ka Purava Va Balee Ka Purava"
                            },
                            {
                                "value": "900693",
                                "name": "जगईपुरवा",
                                "nameEn": "Jagaeepurava"
                            },
                            {
                                "value": "220337",
                                "name": "जरौली",
                                "nameEn": "Jaraulee"
                            },
                            {
                                "value": "900688",
                                "name": "जरौली अन्‍य",
                                "nameEn": "Jaraulee Anya"
                            },
                            {
                                "value": "900687",
                                "name": "जरौली केडीए",
                                "nameEn": "Jaraulee Kedeee"
                            },
                            {
                                "value": "900846",
                                "name": "जवाहरपुरम",
                                "nameEn": "Javaharapurama"
                            },
                            {
                                "value": "900720",
                                "name": "जाटनपुरवा",
                                "nameEn": "Jatanapurava"
                            },
                            {
                                "value": "900703",
                                "name": "जूही अन्‍य ब्‍लाक",
                                "nameEn": "Joohee Anya Blaka"
                            },
                            {
                                "value": "900699",
                                "name": "जूही कंजरपुरवा",
                                "nameEn": "Joohee Knjarapurava"
                            },
                            {
                                "value": "220339",
                                "name": "जूहीकलाँ",
                                "nameEn": "Jooheekalan"
                            },
                            {
                                "value": "900697",
                                "name": "जूही गढा",
                                "nameEn": "Joohee Gadha"
                            },
                            {
                                "value": "900700",
                                "name": "जूही गढा गाव",
                                "nameEn": "Joohee Gadha Gava"
                            },
                            {
                                "value": "900696",
                                "name": "जूही गौशाला",
                                "nameEn": "Joohee Gaushala"
                            },
                            {
                                "value": "900695",
                                "name": "जूही बम्‍बुरिहा",
                                "nameEn": "Joohee Bmburiha"
                            },
                            {
                                "value": "900701",
                                "name": "जूही बारादेवी",
                                "nameEn": "Joohee Baradevee"
                            },
                            {
                                "value": "900698",
                                "name": "जूही विजय गढा",
                                "nameEn": "Joohee Vijaya Gadha"
                            },
                            {
                                "value": "900767",
                                "name": "जे पी कालोनी",
                                "nameEn": "Je Pee Kalonee"
                            },
                            {
                                "value": "900683",
                                "name": "टटिया खेडा",
                                "nameEn": "Tatiya Kheda"
                            },
                            {
                                "value": "220341",
                                "name": "टटिया झनाकू",
                                "nameEn": "Tatiya Jhanakoo"
                            },
                            {
                                "value": "900642",
                                "name": "टटिया झनाकू",
                                "nameEn": "Tatiya Jhanakoo"
                            },
                            {
                                "value": "900682",
                                "name": "टटिया बल्‍ला",
                                "nameEn": "Tatiya Blla"
                            },
                            {
                                "value": "900681",
                                "name": "टटिया भगवन्‍त",
                                "nameEn": "Tatiya Bhagavnta"
                            },
                            {
                                "value": "900679",
                                "name": "टटिया सिंधी",
                                "nameEn": "Tatiya Sindhee"
                            },
                            {
                                "value": "900851",
                                "name": "टिकरा पैगम्बर",
                                "nameEn": "Tikara Paigmbara"
                            },
                            {
                                "value": "900852",
                                "name": "टिकरियाछतमरा",
                                "nameEn": "Tikariyachhatamara"
                            },
                            {
                                "value": "220342",
                                "name": "टीकर मघई",
                                "nameEn": "Teekara Maghaee"
                            },
                            {
                                "value": "900721",
                                "name": "ट्रान्‍सपोर्ट नगर",
                                "nameEn": "Transaporta Nagara"
                            },
                            {
                                "value": "900716",
                                "name": "डबलू2 नहर के पश्चिचम दामोदरनगर बाई पास दक्षिण",
                                "nameEn": "Dabaloo2 Nahara Ke Pshchichama Damodaranagara Baee Pasa Dakshina"
                            },
                            {
                                "value": "900715",
                                "name": "डबलू 2/नहर पश्चिम दामोदर नगर सम्‍पूर्ण क्षेत्र",
                                "nameEn": "Dabaloo 2/nahara Pshchima Damodara Nagara Smpoorna Kshetr"
                            },
                            {
                                "value": "900545",
                                "name": "डब्लू ब्‍लाक केशव नगर",
                                "nameEn": "Dbloo Blaka Keshava Nagara"
                            },
                            {
                                "value": "900717",
                                "name": "ढकनापुरवा",
                                "nameEn": "Dhakanapurava"
                            },
                            {
                                "value": "900676",
                                "name": "तात्‍या टोपे नगर",
                                "nameEn": "Tatya Tope Nagara"
                            },
                            {
                                "value": "900831",
                                "name": "तुलसी नगर",
                                "nameEn": "Tulasee Nagara"
                            },
                            {
                                "value": "900541",
                                "name": "तुलसी बिहार",
                                "nameEn": "Tulasee Bihara"
                            },
                            {
                                "value": "220344",
                                "name": "तौधकपुर",
                                "nameEn": "Taudhakapura"
                            },
                            {
                                "value": "900748",
                                "name": "तौधकपुर",
                                "nameEn": "Taudhakapura"
                            },
                            {
                                "value": "220345",
                                "name": "दबौली",
                                "nameEn": "Dabaulee"
                            },
                            {
                                "value": "900727",
                                "name": "दबौली अन्‍य ब्‍लाक",
                                "nameEn": "Dabaulee Anya Blaka"
                            },
                            {
                                "value": "900725",
                                "name": "दबौली कालोनी भाग 1",
                                "nameEn": "Dabaulee Kalonee Bhaga 1"
                            },
                            {
                                "value": "900726",
                                "name": "दबौली कालोनी भाग 2",
                                "nameEn": "Dabaulee Kalonee Bhaga 2"
                            },
                            {
                                "value": "900724",
                                "name": "दबौली गाव",
                                "nameEn": "Dabaulee Gava"
                            },
                            {
                                "value": "900761",
                                "name": "दयालपुरम",
                                "nameEn": "Dayalapurama"
                            },
                            {
                                "value": "900835",
                                "name": "दलनपुर",
                                "nameEn": "Dalanapura"
                            },
                            {
                                "value": "220346",
                                "name": "दहेली सुजानपुर",
                                "nameEn": "Dahelee Sujanapura"
                            },
                            {
                                "value": "900740",
                                "name": "दिवेदी नगर",
                                "nameEn": "Divedee Nagara"
                            },
                            {
                                "value": "900793",
                                "name": "देवकी नगर",
                                "nameEn": "Devakee Nagara"
                            },
                            {
                                "value": "900826",
                                "name": "देहली सुजानपुर",
                                "nameEn": "Dehalee Sujanapura"
                            },
                            {
                                "value": "900795",
                                "name": "धरी का पुरवा",
                                "nameEn": "Dharee Ka Purava"
                            },
                            {
                                "value": "900718",
                                "name": "नयापुरवा",
                                "nameEn": "Nayapurava"
                            },
                            {
                                "value": "150338",
                                "name": "नसेनियाँ",
                                "nameEn": "Naseniyan"
                            },
                            {
                                "value": "900738",
                                "name": "नारायणपुरी",
                                "nameEn": "Narayanapuree"
                            },
                            {
                                "value": "900825",
                                "name": "निहरा गांव",
                                "nameEn": "Nihara Ganw"
                            },
                            {
                                "value": "900749",
                                "name": "निहुरी",
                                "nameEn": "Nihuree"
                            },
                            {
                                "value": "150396",
                                "name": "नेवरी",
                                "nameEn": "Nevaree"
                            },
                            {
                                "value": "900816",
                                "name": "नोनियनपुरवा",
                                "nameEn": "Noniyanapurava"
                            },
                            {
                                "value": "220350",
                                "name": "नौबस्ता",
                                "nameEn": "Naubsta"
                            },
                            {
                                "value": "900728",
                                "name": "नौबस्‍ता‚नौबस्‍ता पुरानी बस्‍ती",
                                "nameEn": "Naubsta‚naubsta Puranee Bstee"
                            },
                            {
                                "value": "900742",
                                "name": "नौबस्ता पूर्व",
                                "nameEn": "Naubsta Poorva"
                            },
                            {
                                "value": "900797",
                                "name": "न्‍यू आजाद नगर",
                                "nameEn": "Nyoo Azad Nagara"
                            },
                            {
                                "value": "900653",
                                "name": "पटेल नगर",
                                "nameEn": "Patela Nagara"
                            },
                            {
                                "value": "150439",
                                "name": "परसौली",
                                "nameEn": "Parasaulee"
                            },
                            {
                                "value": "900750",
                                "name": "पहरनपुर",
                                "nameEn": "Paharanapura"
                            },
                            {
                                "value": "900685",
                                "name": "पहाडपुर",
                                "nameEn": "Pahadapura"
                            },
                            {
                                "value": "900707",
                                "name": "पीली कालोनी",
                                "nameEn": "Peelee Kalonee"
                            },
                            {
                                "value": "900809",
                                "name": "प्रज्ञा बिहार",
                                "nameEn": "Pragyaa Bihara"
                            },
                            {
                                "value": "900690",
                                "name": "प्रेरणा बिहार",
                                "nameEn": "Prerana Bihara"
                            },
                            {
                                "value": "220360",
                                "name": "बगाही",
                                "nameEn": "Bagahee"
                            },
                            {
                                "value": "900758",
                                "name": "बजरंगपुरी",
                                "nameEn": "Bajarngapuree"
                            },
                            {
                                "value": "220361",
                                "name": "बरर्ा",
                                "nameEn": "Barra"
                            },
                            {
                                "value": "900770",
                                "name": "बर्रा 1",
                                "nameEn": "Brra 1"
                            },
                            {
                                "value": "900771",
                                "name": "बर्रा 2",
                                "nameEn": "Brra 2"
                            },
                            {
                                "value": "900772",
                                "name": "बर्रा 3",
                                "nameEn": "Brra 3"
                            },
                            {
                                "value": "900773",
                                "name": "बर्रा 4",
                                "nameEn": "Brra 4"
                            },
                            {
                                "value": "900775",
                                "name": "बर्रा 5",
                                "nameEn": "Brra 5"
                            },
                            {
                                "value": "900780",
                                "name": "बर्रा 6",
                                "nameEn": "Brra 6"
                            },
                            {
                                "value": "900781",
                                "name": "बर्रा 7",
                                "nameEn": "Brra 7"
                            },
                            {
                                "value": "900782",
                                "name": "बर्रा 8",
                                "nameEn": "Brra 8"
                            },
                            {
                                "value": "900783",
                                "name": "बर्रा अन्‍य ब्‍लाक",
                                "nameEn": "Brra Anya Blaka"
                            },
                            {
                                "value": "901100",
                                "name": "बर्रा के यू डी पी",
                                "nameEn": "Brra Ke Yoo Dee Pee"
                            },
                            {
                                "value": "900776",
                                "name": "बर्रा गॉव",
                                "nameEn": "Brra Gaova"
                            },
                            {
                                "value": "900779",
                                "name": "बर्रा जेड 1",
                                "nameEn": "Brra Jeda 1"
                            },
                            {
                                "value": "901101",
                                "name": "बर्रा यू पी यू डी पी",
                                "nameEn": "Brra Yoo Pee Yoo Dee Pee"
                            },
                            {
                                "value": "900730",
                                "name": "बाबा नगर",
                                "nameEn": "Baba Nagara"
                            },
                            {
                                "value": "900684",
                                "name": "बिनगवां",
                                "nameEn": "Binagavan"
                            },
                            {
                                "value": "900743",
                                "name": "बूढपुर मछरिया",
                                "nameEn": "Boodhapura Machhariya"
                            },
                            {
                                "value": "220363",
                                "name": "बूढ़पुर मछरिहा",
                                "nameEn": "Boorhpura Machhariha"
                            },
                            {
                                "value": "900736",
                                "name": "बौद्ध् नगर",
                                "nameEn": "Bauddh Nagara"
                            },
                            {
                                "value": "901102",
                                "name": "भवानी नगर",
                                "nameEn": "Bhavanee Nagara"
                            },
                            {
                                "value": "900646",
                                "name": "भाभा नगर",
                                "nameEn": "Bhabha Nagara"
                            },
                            {
                                "value": "150436",
                                "name": "भारू",
                                "nameEn": "Bharoo"
                            },
                            {
                                "value": "900832",
                                "name": "मंगला बिहार 1 व मंगला बिहार 2",
                                "nameEn": "Mngala Bihara 1 Va Mngala Bihara 2"
                            },
                            {
                                "value": "150454",
                                "name": "मझावन",
                                "nameEn": "Majhavana"
                            },
                            {
                                "value": "150417",
                                "name": "मटियारा",
                                "nameEn": "Matiyara"
                            },
                            {
                                "value": "900815",
                                "name": "मथुरापुर",
                                "nameEn": "Mathurapura"
                            },
                            {
                                "value": "900755",
                                "name": "मनोहर नगर",
                                "nameEn": "Manohara Nagara"
                            },
                            {
                                "value": "900790",
                                "name": "यशोदा नगर",
                                "nameEn": "Yashoda Nagara"
                            },
                            {
                                "value": "900811",
                                "name": "यादव नगर",
                                "nameEn": "Yadava Nagara"
                            },
                            {
                                "value": "900800",
                                "name": "रतन लाल नगर",
                                "nameEn": "Ratana Lala Nagara"
                            },
                            {
                                "value": "900722",
                                "name": "रत्‍तूपुरवा",
                                "nameEn": "Rttoopurava"
                            },
                            {
                                "value": "150431",
                                "name": "रमईपुर",
                                "nameEn": "Ramaeepura"
                            },
                            {
                                "value": "900734",
                                "name": "राजीव बिहार",
                                "nameEn": "Rajeeva Bihara"
                            },
                            {
                                "value": "900760",
                                "name": "राजेन्‍द्रपुरम",
                                "nameEn": "Rajendrapurama"
                            },
                            {
                                "value": "900845",
                                "name": "राधापुरम",
                                "nameEn": "Radhapurama"
                            },
                            {
                                "value": "900833",
                                "name": "रामपुरम",
                                "nameEn": "Ramapurama"
                            },
                            {
                                "value": "900706",
                                "name": "लाल कालोनी",
                                "nameEn": "Lala Kalonee"
                            },
                            {
                                "value": "900796",
                                "name": "लालपुर",
                                "nameEn": "Lalapura"
                            },
                            {
                                "value": "150433",
                                "name": "लुधौरी",
                                "nameEn": "Ludhauree"
                            },
                            {
                                "value": "900692",
                                "name": "वरुण बिहार",
                                "nameEn": "Varuna Bihara"
                            },
                            {
                                "value": "900694",
                                "name": "वसुधा बिहार",
                                "nameEn": "Vasudha Bihara"
                            },
                            {
                                "value": "901114",
                                "name": "वाजिदपुर",
                                "nameEn": "Vajidapura"
                            },
                            {
                                "value": "220390",
                                "name": "विनगवाँ",
                                "nameEn": "Vinagavan"
                            },
                            {
                                "value": "900643",
                                "name": "विमान नगर",
                                "nameEn": "Vimana Nagara"
                            },
                            {
                                "value": "900644",
                                "name": "विमानपुरी",
                                "nameEn": "Vimanapuree"
                            },
                            {
                                "value": "900805",
                                "name": "विराट नगर",
                                "nameEn": "Virata Nagara"
                            },
                            {
                                "value": "900839",
                                "name": "विश्वकर्मा नगर",
                                "nameEn": "Vishvakrma Nagara"
                            },
                            {
                                "value": "900777",
                                "name": "विश्‍व बैक कालोनी",
                                "nameEn": "Vishva Baika Kalonee"
                            },
                            {
                                "value": "900689",
                                "name": "वैदेही बिहार",
                                "nameEn": "Vaidehee Bihara"
                            },
                            {
                                "value": "900691",
                                "name": "वैष्‍णवी बिहार",
                                "nameEn": "Vaishnavee Bihara"
                            },
                            {
                                "value": "900759",
                                "name": "शंकराचार्य नगर",
                                "nameEn": "Shnkaracharya Nagara"
                            },
                            {
                                "value": "150435",
                                "name": "शाहपुर मझावन",
                                "nameEn": "Shahpur Majhavana"
                            },
                            {
                                "value": "900655",
                                "name": "शिवकटरा",
                                "nameEn": "Shivakatara"
                            },
                            {
                                "value": "900806",
                                "name": "शिवपुरी",
                                "nameEn": "Shivapuree"
                            },
                            {
                                "value": "900813",
                                "name": "शिवशंकरपुरम",
                                "nameEn": "Shivashnkarapurama"
                            },
                            {
                                "value": "900830",
                                "name": "श्याम नगर के०डी०ए०कालोनी",
                                "nameEn": "Shyama Nagara Ke0dee0e0kalonee"
                            },
                            {
                                "value": "900680",
                                "name": "श्याम नगर ब्‍लाक ए बी सी",
                                "nameEn": "Shyama Nagara Blaka E Bee See"
                            },
                            {
                                "value": "900824",
                                "name": "श्याम नगर ब्लाक डी व ई",
                                "nameEn": "Shyama Nagara Blaka Dee Va Ee"
                            },
                            {
                                "value": "900823",
                                "name": "सकरापुर",
                                "nameEn": "Sakarapura"
                            },
                            {
                                "value": "220397",
                                "name": "सकरापुर",
                                "nameEn": "Sakarapura"
                            },
                            {
                                "value": "900729",
                                "name": "संजय गाधी नगर",
                                "nameEn": "Snjaya Gadhee Nagara"
                            },
                            {
                                "value": "900821",
                                "name": "संजय नगर",
                                "nameEn": "Snjaya Nagara"
                            },
                            {
                                "value": "900744",
                                "name": "संजय नगर",
                                "nameEn": "Snjaya Nagara"
                            },
                            {
                                "value": "900850",
                                "name": "सजारी",
                                "nameEn": "Sajaree"
                            },
                            {
                                "value": "220399",
                                "name": "सजारी",
                                "nameEn": "Sajaree"
                            },
                            {
                                "value": "900812",
                                "name": "संजीव नगर 1/ संजीव नगर 2",
                                "nameEn": "Snjeeva Nagara 1/ Snjeeva Nagara 2"
                            },
                            {
                                "value": "900791",
                                "name": "सतवरी",
                                "nameEn": "SAtwaree"
                            },
                            {
                                "value": "220398",
                                "name": "सतवरी",
                                "nameEn": "SAtwaree"
                            },
                            {
                                "value": "900803",
                                "name": "सदानन्‍द नगर",
                                "nameEn": "Sadannda Nagara"
                            },
                            {
                                "value": "220404",
                                "name": "सनिगवा",
                                "nameEn": "Sanigava"
                            },
                            {
                                "value": "900817",
                                "name": "सनिगवा",
                                "nameEn": "Sanigava"
                            },
                            {
                                "value": "900704",
                                "name": "सफेद कालोनी",
                                "nameEn": "Sapheda Kalonee"
                            },
                            {
                                "value": "900808",
                                "name": "सरन स्‍टेट",
                                "nameEn": "Sarana Steta"
                            },
                            {
                                "value": "900553",
                                "name": "सहदुल्‍लापुर",
                                "nameEn": "Sahadullapura"
                            },
                            {
                                "value": "900837",
                                "name": "सावित्री नगर",
                                "nameEn": "Savitree Nagara"
                            },
                            {
                                "value": "900807",
                                "name": "सिद्धार्थ नगर",
                                "nameEn": "Siddhartha Nagara"
                            },
                            {
                                "value": "900834",
                                "name": "सिद्धार्थ नगर(शहीद नगर)",
                                "nameEn": "Siddhartha Nagara(shaheeda Nagara)"
                            },
                            {
                                "value": "900810",
                                "name": "सीताराम नगर",
                                "nameEn": "Seetarama Nagara"
                            },
                            {
                                "value": "900719",
                                "name": "सुक्‍खापुरवा",
                                "nameEn": "Sukkhapurava"
                            },
                            {
                                "value": "900822",
                                "name": "सुजातगंज",
                                "nameEn": "Sujatagnja"
                            },
                            {
                                "value": "900754",
                                "name": "सुन्‍दर नगर",
                                "nameEn": "Sundara Nagara"
                            },
                            {
                                "value": "150456",
                                "name": "सेनियां",
                                "nameEn": "Seniyan"
                            },
                            {
                                "value": "900792",
                                "name": "सेमरा",
                                "nameEn": "Semara"
                            },
                            {
                                "value": "900804",
                                "name": "सैनिक नगर",
                                "nameEn": "Sainika Nagara"
                            },
                            {
                                "value": "900799",
                                "name": "स्‍वर्ण जयन्‍ती बिहार",
                                "nameEn": "Svrna Jayntee Bihara"
                            },
                            {
                                "value": "900847",
                                "name": "स्वर्ण नगरी",
                                "nameEn": "Svrna Nagaree"
                            },
                            {
                                "value": "900735",
                                "name": "हनुमन्‍त बिहार",
                                "nameEn": "Hanumnta Bihara"
                            },
                            {
                                "value": "900741",
                                "name": "हरदेव नगर",
                                "nameEn": "Haradeva Nagara"
                            },
                            {
                                "value": "150464",
                                "name": "हरदौली",
                                "nameEn": "Haradaulee"
                            },
                            {
                                "value": "900708",
                                "name": "हरी कालोनी",
                                "nameEn": "Haree Kalonee"
                            },
                            {
                                "value": "220395",
                                "name": "हंसपुर",
                                "nameEn": "Hnsapura"
                            },
                            {
                                "value": "900746",
                                "name": "हंसपुरम अन्य",
                                "nameEn": "Hnsapurama Anya"
                            },
                            {
                                "value": "900745",
                                "name": "हंसपुरम",
                                "nameEn": "Hnsapurama"
                            },
                            {
                                "value": "900818",
                                "name": "हाइवे सिटी व विस्तार",
                                "nameEn": "Haive Sitee Va Vistara"
                            },
                            {
                                "value": "150434",
                                "name": "हाजीपुर",
                                "nameEn": "Hajeepura"
                            },
                            {
                                "value": "900798",
                                "name": "हीरा नगर",
                                "nameEn": "Heera Nagara"
                            }
                        ],
                        "211": [
                            {
                                "value": "900369",
                                "name": "अनवर गंज 84 चक",
                                "nameEn": "Anavara Ganj 84 Chak"
                            },
                            {
                                "value": "900540",
                                "name": "अफजलपुर",
                                "nameEn": "Aphajalapura"
                            },
                            {
                                "value": "150424",
                                "name": "अफजलपुर",
                                "nameEn": "Aphajalapura"
                            },
                            {
                                "value": "900262",
                                "name": "अम्‍बेडकर नगर 117 चक",
                                "nameEn": "Ambedakara Nagara 117 Chak"
                            },
                            {
                                "value": "900317",
                                "name": "अशोक नगर कल्‍यानपुर",
                                "nameEn": "Ashoka Nagara Klyanapura"
                            },
                            {
                                "value": "900485",
                                "name": "अहिल्‍याबाई होल्‍कर नगर",
                                "nameEn": "Ahilyabaee Holkara Nagara"
                            },
                            {
                                "value": "900425",
                                "name": "आचार्य नगर 87 चक",
                                "nameEn": "Aacharya Nagara 87 Chak"
                            },
                            {
                                "value": "900431",
                                "name": "आदर्श नगर मथुरा नगर जनता नगर कुशवाहा नगर कैलाश नगर रावतपुर",
                                "nameEn": "Aadrsha Nagara Mathura Nagara Janata Nagara Kushavaha Nagara Kailasha Nagara Ravatapura"
                            },
                            {
                                "value": "900411",
                                "name": "आदर्श नगर मसवानपुर",
                                "nameEn": "Aadrsha Nagara Masavanapura"
                            },
                            {
                                "value": "900217",
                                "name": "आवास विकास अमबेडकरपुरम",
                                "nameEn": "Aavasa Vikasa Amabedakarapurama"
                            },
                            {
                                "value": "900214",
                                "name": "आवास विकास योजना 1 केशवपुरम",
                                "nameEn": "Aavasa Vikasa Yojana 1 Keshavapurama"
                            },
                            {
                                "value": "900215",
                                "name": "आवास विकास योजना 3 पनकी कल्यानपुर रोड",
                                "nameEn": "Aavasa Vikasa Yojana 3 Panakee Klyanapura Roda"
                            },
                            {
                                "value": "150378",
                                "name": "इटारा",
                                "nameEn": "Itara"
                            },
                            {
                                "value": "900645",
                                "name": "इटारा",
                                "nameEn": "Itara"
                            },
                            {
                                "value": "900401",
                                "name": "इन्‍डस्ट्रियल इस्‍टेट फजलगंज",
                                "nameEn": "Indstriyala Isteta Phajalagnja"
                            },
                            {
                                "value": "900271",
                                "name": "इन्‍द्रपुरी 117 चक",
                                "nameEn": "Indrapuree 117 Chak"
                            },
                            {
                                "value": "900505",
                                "name": "इस्‍पात नगर",
                                "nameEn": "Ispata Nagara"
                            },
                            {
                                "value": "900521",
                                "name": "ई एस आई कालोनी",
                                "nameEn": "Ee Esa Aaee Kalonee"
                            },
                            {
                                "value": "900462",
                                "name": "ई एस आई फण्‍ड कालोनी",
                                "nameEn": "Ee Esa Aaee Phnda Kalonee"
                            },
                            {
                                "value": "900344",
                                "name": "उघोग नगर ए ब्‍लाक",
                                "nameEn": "Ughoga Nagara E Blaka"
                            },
                            {
                                "value": "900346",
                                "name": "उघोग नगर बी ब्‍लाक",
                                "nameEn": "Ughoga Nagara Bee Blaka"
                            },
                            {
                                "value": "900348",
                                "name": "उघ्‍ाोग नगर सी ब्‍लाक",
                                "nameEn": "Ughaoga Nagara See Blaka"
                            },
                            {
                                "value": "150376",
                                "name": "उदयपुर",
                                "nameEn": "Udayapura"
                            },
                            {
                                "value": "900595",
                                "name": "उदयपुर",
                                "nameEn": "Udayapura"
                            },
                            {
                                "value": "900450",
                                "name": "एम पी उघोग मिल कैम्‍पस 117 चक",
                                "nameEn": "Ema Pee Ughoga Mila Kaimpasa 117 Chak"
                            },
                            {
                                "value": "150374",
                                "name": "एेंती",
                                "nameEn": "Eentee"
                            },
                            {
                                "value": "900597",
                                "name": "ऐती",
                                "nameEn": "Aitee"
                            },
                            {
                                "value": "900374",
                                "name": "ओम नगर  119 चक",
                                "nameEn": "Oma Nagara  119 Chak"
                            },
                            {
                                "value": "900598",
                                "name": "कठारा",
                                "nameEn": "Kathara"
                            },
                            {
                                "value": "150404",
                                "name": "कठारा 1",
                                "nameEn": "Kathara 1"
                            },
                            {
                                "value": "220313",
                                "name": "कठारा 2",
                                "nameEn": "Kathara 2"
                            },
                            {
                                "value": "220314",
                                "name": "कठारा 3",
                                "nameEn": "Kathara 3"
                            },
                            {
                                "value": "900647",
                                "name": "कठुई",
                                "nameEn": "Kathuee"
                            },
                            {
                                "value": "150425",
                                "name": "कठुई",
                                "nameEn": "Kathuee"
                            },
                            {
                                "value": "150407",
                                "name": "कठेरूआ",
                                "nameEn": "Katherooaa"
                            },
                            {
                                "value": "900606",
                                "name": "कठेरूआ",
                                "nameEn": "Katherooaa"
                            },
                            {
                                "value": "150400",
                                "name": "कडरी चम्पतपुर",
                                "nameEn": "Kadaree Chmpatapura"
                            },
                            {
                                "value": "900601",
                                "name": "कड़री चम्‍पतपुर",
                                "nameEn": "Karree Chmpatapura"
                            },
                            {
                                "value": "220319",
                                "name": "कपिली",
                                "nameEn": "Kapilee"
                            },
                            {
                                "value": "900393",
                                "name": "कपिली के डी ए कालोनी व शताब्दी नगर  फेज 3",
                                "nameEn": "Kapilee Ke Dee E Kalonee Va Shatabdee Nagara  Pheja 3"
                            },
                            {
                                "value": "900391",
                                "name": "कपिली गांव",
                                "nameEn": "Kapilee Ganw"
                            },
                            {
                                "value": "900395",
                                "name": "कबाड़ी मार्केट122 123 चक",
                                "nameEn": "Kabaree Marketa122 123 Chak"
                            },
                            {
                                "value": "900441",
                                "name": "कमला नगर",
                                "nameEn": "Kamala Nagara"
                            },
                            {
                                "value": "220316",
                                "name": "कल्यानपुर कलाँ",
                                "nameEn": "Klyanapura Kalan"
                            },
                            {
                                "value": "900306",
                                "name": "कल्‍यानपुर कलां",
                                "nameEn": "Klyanapura Kalan"
                            },
                            {
                                "value": "900304",
                                "name": "कल्‍यानपुर खुर्द",
                                "nameEn": "Klyanapura Khurd"
                            },
                            {
                                "value": "220317",
                                "name": "कल्यानपुर खुर्द",
                                "nameEn": "Klyanapura Khurd"
                            },
                            {
                                "value": "900324",
                                "name": "कल्‍यानपुर सी व बी  ब्‍लाक",
                                "nameEn": "Klyanapura See Va Bee  Blaka"
                            },
                            {
                                "value": "900308",
                                "name": "कश्‍यप नगर",
                                "nameEn": "Kshyapa Nagara"
                            },
                            {
                                "value": "900266",
                                "name": "काकादेव अो ब्‍लाक ⁄ गीता नगर 117 चक",
                                "nameEn": "Kakadeva Ao Blaka ⁄ Geeta Nagara 117 Chak"
                            },
                            {
                                "value": "900240",
                                "name": "काकादेव आर एस पुरम 117 चक",
                                "nameEn": "Kakadeva Aara Esa Purama 117 Chak"
                            },
                            {
                                "value": "900458",
                                "name": "काकादेव एच एच1एच2 ब्‍लाक",
                                "nameEn": "Kakadeva Echa Echa1echa2 Blaka"
                            },
                            {
                                "value": "900246",
                                "name": "काकादेव एन ब्‍लाक 117 चक",
                                "nameEn": "Kakadeva Ena Blaka 117 Chak"
                            },
                            {
                                "value": "900234",
                                "name": "काकादेव एम ब्‍लाक 117 चक",
                                "nameEn": "Kakadeva Ema Blaka 117 Chak"
                            },
                            {
                                "value": "900244",
                                "name": "काकादेव एल ब्‍लाक 117 चक",
                                "nameEn": "Kakadeva Ela Blaka 117 Chak"
                            },
                            {
                                "value": "900238",
                                "name": "काकादेव के ब्‍लाक 117 चक",
                                "nameEn": "Kakadeva Ke Blaka 117 Chak"
                            },
                            {
                                "value": "900269",
                                "name": "काकादेव क्‍यू ब्‍लाक 117 चक",
                                "nameEn": "Kakadeva Kyoo Blaka 117 Chak"
                            },
                            {
                                "value": "900220",
                                "name": "काकादेव गांव 117",
                                "nameEn": "Kakadeva Ganw 117"
                            },
                            {
                                "value": "900236",
                                "name": "काकादेव पी व पी 1  व पी 2 ब्‍लाक 117 चक",
                                "nameEn": "Kakadeva Pee Va Pee 1  Va Pee 2 Blaka 117 Chak"
                            },
                            {
                                "value": "150408",
                                "name": "काकोरी",
                                "nameEn": "Kakoree"
                            },
                            {
                                "value": "900648",
                                "name": "काकोरी",
                                "nameEn": "Kakoree"
                            },
                            {
                                "value": "900367",
                                "name": "कारवालो नगर 84 व 86 चक",
                                "nameEn": "Karavalo Nagara 84 Va 86 Chak"
                            },
                            {
                                "value": "900608",
                                "name": "किशनपुर मझावन",
                                "nameEn": "Kishanapura Majhavana"
                            },
                            {
                                "value": "150422",
                                "name": "किशुनपुर मझावन",
                                "nameEn": "Kishunapura Majhavana"
                            },
                            {
                                "value": "900602",
                                "name": "कीरतपुर",
                                "nameEn": "Keeratapura"
                            },
                            {
                                "value": "150380",
                                "name": "कीरतपुर",
                                "nameEn": "Keeratapura"
                            },
                            {
                                "value": "900543",
                                "name": "कुरौना बहादुर नगर",
                                "nameEn": "Kurauna Bahadura Nagara"
                            },
                            {
                                "value": "150393",
                                "name": "कुरौना बहादुर नगर",
                                "nameEn": "Kurauna Bahadura Nagara"
                            },
                            {
                                "value": "900605",
                                "name": "कुल्‍हौली",
                                "nameEn": "Kulhaulee"
                            },
                            {
                                "value": "150462",
                                "name": "कुल्हौली",
                                "nameEn": "Kulhaulee"
                            },
                            {
                                "value": "900544",
                                "name": "कैंधा",
                                "nameEn": "Kaindha"
                            },
                            {
                                "value": "150362",
                                "name": "कैंधा",
                                "nameEn": "Kaindha"
                            },
                            {
                                "value": "900330",
                                "name": "कौशलपुरी 118 चक व गुमटी न 5",
                                "nameEn": "Kaushalapuree 118 Chak Va Gumatee Na 5"
                            },
                            {
                                "value": "150405",
                                "name": "खड़ेसर",
                                "nameEn": "Kharesara"
                            },
                            {
                                "value": "900610",
                                "name": "खड़ेसर",
                                "nameEn": "Kharesara"
                            },
                            {
                                "value": "150423",
                                "name": "खेरसा",
                                "nameEn": "Kherasa"
                            },
                            {
                                "value": "900546",
                                "name": "खेरसा",
                                "nameEn": "Kherasa"
                            },
                            {
                                "value": "900405",
                                "name": "गड़रियनपुरवा 123 चक",
                                "nameEn": "Garriyanapurava 123 Chak"
                            },
                            {
                                "value": "150421",
                                "name": "गढेवा मझावन",
                                "nameEn": "Gadheva Majhavana"
                            },
                            {
                                "value": "900548",
                                "name": "गढ़ेवा मझावन",
                                "nameEn": "Garheva Majhavana"
                            },
                            {
                                "value": "900550",
                                "name": "गढ़ेवा मोहसनपुर",
                                "nameEn": "Garheva Mohasanapura"
                            },
                            {
                                "value": "150395",
                                "name": "गढेवा मोहसिंनपुर",
                                "nameEn": "Gadheva Mohasinnapura"
                            },
                            {
                                "value": "900386",
                                "name": "गम्‍भीरपुर",
                                "nameEn": "Gmbheerapura"
                            },
                            {
                                "value": "900554",
                                "name": "गम्‍भीरपुर दक्षिण",
                                "nameEn": "Gmbheerapura Dakshina"
                            },
                            {
                                "value": "150384",
                                "name": "गम्भीरपुर दक्षिण",
                                "nameEn": "Gmbheerapura Dakshina"
                            },
                            {
                                "value": "900310",
                                "name": "गायत्रीपुरम",
                                "nameEn": "Gayatreepurama"
                            },
                            {
                                "value": "150360",
                                "name": "गोपालपुर",
                                "nameEn": "Gopalapura"
                            },
                            {
                                "value": "900552",
                                "name": "गोपालपुर",
                                "nameEn": "Gopalapura"
                            },
                            {
                                "value": "900336",
                                "name": "गोविन्‍द नगर 124 चक‚ ब्लाक ए बी सी डी ई एम के वी एन  10  ब्लाक तथा 1 से 7 ब्‍लाक तथा 11 12 व 13 ब्‍लाक",
                                "nameEn": "Govinda Nagara 124 Chak‚ Blaka E Bee See Dee Ee Ema Ke Vee Ena  10  Blaka Tatha 1 Se 7 Blaka Tatha 11 12 Va 13 Blaka"
                            },
                            {
                                "value": "900358",
                                "name": "गोविन्‍द नगर 125 चक‚ व लाल क्वार्टर 125 चक व 7 8 9 10 एवं एच आई जे आर एस टी क्‍यू एल ओ यू ब्‍लाक व अन्‍य शेष",
                                "nameEn": "Govinda Nagara 125 Chak‚ Va Lala Kvartara 125 Chak Va 7 8 9 10 Evn Echa Aaee Je Aara Esa Tee Kyoo Ela O Yoo Blaka Va Anya Shesha"
                            },
                            {
                                "value": "900377",
                                "name": "गोविन्‍द नगर 126 चक‚ यूं एफ जी एच आई जे आर एस टी पी वी क्यू व 13 ब्‍लाक",
                                "nameEn": "Govinda Nagara 126 Chak‚ Yoon Epha Jee Echa Aaee Je Aara Esa Tee Pee Vee Kyoo Va 13 Blaka"
                            },
                            {
                                "value": "150402",
                                "name": "गोसरा",
                                "nameEn": "Gosara"
                            },
                            {
                                "value": "900612",
                                "name": "गोसरा",
                                "nameEn": "Gosara"
                            },
                            {
                                "value": "900314",
                                "name": "गौतम विहार शिवली रोड",
                                "nameEn": "Gautama Vihara Shivalee Roda"
                            },
                            {
                                "value": "900615",
                                "name": "चक कुल्‍हौली",
                                "nameEn": "Chak Kulhaulee"
                            },
                            {
                                "value": "150463",
                                "name": "चक कुल्हौली",
                                "nameEn": "Chak Kulhaulee"
                            },
                            {
                                "value": "900321",
                                "name": "चमारनपुरवा",
                                "nameEn": "Chamaranapurava"
                            },
                            {
                                "value": "150411",
                                "name": "चौराई",
                                "nameEn": "Chauraee"
                            },
                            {
                                "value": "900617",
                                "name": "चौराई",
                                "nameEn": "Chauraee"
                            },
                            {
                                "value": "900446",
                                "name": "छोटा लखनपुर 114 चक",
                                "nameEn": "Chhota Lakhanapura 114 Chak"
                            },
                            {
                                "value": "150413",
                                "name": "छौकी",
                                "nameEn": "Chhaukee"
                            },
                            {
                                "value": "900620",
                                "name": "छौंकी",
                                "nameEn": "Chhaunkee"
                            },
                            {
                                "value": "150453",
                                "name": "जगदीशपुर",
                                "nameEn": "Jagadeeshapura"
                            },
                            {
                                "value": "900555",
                                "name": "जगदीशपुर",
                                "nameEn": "Jagadeeshapura"
                            },
                            {
                                "value": "900649",
                                "name": "जमरेही",
                                "nameEn": "Jamarehee"
                            },
                            {
                                "value": "150398",
                                "name": "जमरेही",
                                "nameEn": "Jamarehee"
                            },
                            {
                                "value": "220336",
                                "name": "जमुई",
                                "nameEn": "Jamuee"
                            },
                            {
                                "value": "900515",
                                "name": "जमूई",
                                "nameEn": "Jamooee"
                            },
                            {
                                "value": "900368",
                                "name": "जरीब चौकी 84 चक",
                                "nameEn": "Jareeba Chaukee 84 Chak"
                            },
                            {
                                "value": "900383",
                                "name": "जवाहरपुरम ग्रीन सिटी",
                                "nameEn": "Javaharapurama Greena Sitee"
                            },
                            {
                                "value": "900856",
                                "name": "जहानपुर",
                                "nameEn": "Jahanapura"
                            },
                            {
                                "value": "150427",
                                "name": "जहाँनपुर",
                                "nameEn": "Jahannapura"
                            },
                            {
                                "value": "150390",
                                "name": "जादौपुर",
                                "nameEn": "Jadaupura"
                            },
                            {
                                "value": "900650",
                                "name": "जादौपुर",
                                "nameEn": "Jadaupura"
                            },
                            {
                                "value": "150391",
                                "name": "जामू",
                                "nameEn": "Jamoo"
                            },
                            {
                                "value": "900558",
                                "name": "जामू",
                                "nameEn": "Jamoo"
                            },
                            {
                                "value": "220338",
                                "name": "जूही खुर्द",
                                "nameEn": "Joohee Khurd"
                            },
                            {
                                "value": "900362",
                                "name": "जूही खुर्द 83ए",
                                "nameEn": "Joohee Khurd 83e"
                            },
                            {
                                "value": "900359",
                                "name": "जूही खुर्द 83 व 83 ए",
                                "nameEn": "Joohee Khurd 83 Va 83 E"
                            },
                            {
                                "value": "900370",
                                "name": "झकरकटी 84 चक",
                                "nameEn": "Jhakarakatee 84 Chak"
                            },
                            {
                                "value": "900519",
                                "name": "टेलीफोन कालोनी",
                                "nameEn": "Teleephona Kalonee"
                            },
                            {
                                "value": "900561",
                                "name": "डांडे का पुरवा",
                                "nameEn": "Dande Ka Purava"
                            },
                            {
                                "value": "150394",
                                "name": "डांडे का पुरवा",
                                "nameEn": "Dande Ka Purava"
                            },
                            {
                                "value": "900464",
                                "name": "डीआई आफिस कालोनी",
                                "nameEn": "Deeaaee Aaphisa Kalonee"
                            },
                            {
                                "value": "150399",
                                "name": "ढरहरा",
                                "nameEn": "Dharahara"
                            },
                            {
                                "value": "900623",
                                "name": "ढरहरा",
                                "nameEn": "Dharahara"
                            },
                            {
                                "value": "900622",
                                "name": "ढोढर",
                                "nameEn": "Dhodhara"
                            },
                            {
                                "value": "150371",
                                "name": "ढोढर",
                                "nameEn": "Dhodhara"
                            },
                            {
                                "value": "900651",
                                "name": "तकसीमपुर",
                                "nameEn": "Takaseemapura"
                            },
                            {
                                "value": "150460",
                                "name": "तकसीमपुर",
                                "nameEn": "Takaseemapura"
                            },
                            {
                                "value": "900250",
                                "name": "तुलसी नगर काकादेव 117 चक",
                                "nameEn": "Tulasee Nagara Kakadeva 117 Chak"
                            },
                            {
                                "value": "900332",
                                "name": "दर्शनपुरवा 119   118 चक",
                                "nameEn": "Drshanapurava 119   118 Chak"
                            },
                            {
                                "value": "900652",
                                "name": "दलेलपुर",
                                "nameEn": "Dalelapura"
                            },
                            {
                                "value": "150409",
                                "name": "दलेलपुर",
                                "nameEn": "Dalelapura"
                            },
                            {
                                "value": "900624",
                                "name": "दहेली उजागर",
                                "nameEn": "Dahelee Ujagara"
                            },
                            {
                                "value": "150401",
                                "name": "दहेली उजागर",
                                "nameEn": "Dahelee Ujagara"
                            },
                            {
                                "value": "900343",
                                "name": "दादा नगर",
                                "nameEn": "Dada Nagara"
                            },
                            {
                                "value": "150397",
                                "name": "दुर्जनपुर",
                                "nameEn": "Durjanapura"
                            },
                            {
                                "value": "900654",
                                "name": "दुर्जनपुर",
                                "nameEn": "Durjanapura"
                            },
                            {
                                "value": "900293",
                                "name": "देवी सहाय नगर पुरानी व नई बस्‍ती",
                                "nameEn": "Devee Sahaya Nagara Puranee Va Naee Bstee"
                            },
                            {
                                "value": "900417",
                                "name": "दौलतपुर",
                                "nameEn": "Daulatapura"
                            },
                            {
                                "value": "220347",
                                "name": "दौलतपुर उर्फ धामीखेड",
                                "nameEn": "Daulatapura Urpha Dhameekheda"
                            },
                            {
                                "value": "900414",
                                "name": "धामीखेड़ा",
                                "nameEn": "Dhameekhera"
                            },
                            {
                                "value": "900439",
                                "name": "नरायनपुरवा 120 चक",
                                "nameEn": "Narayanapurava 120 Chak"
                            },
                            {
                                "value": "900255",
                                "name": "नवीन नगर 117 चक",
                                "nameEn": "Naveena Nagara 117 Chak"
                            },
                            {
                                "value": "900373",
                                "name": "नसीमाबाद  119 चक",
                                "nameEn": "Naseemabada  119 Chak"
                            },
                            {
                                "value": "900274",
                                "name": "नानकारी",
                                "nameEn": "Nanakaree"
                            },
                            {
                                "value": "900627",
                                "name": "नूरपुर",
                                "nameEn": "Noorapura"
                            },
                            {
                                "value": "150459",
                                "name": "नूरपुर उर्फ लालपुर",
                                "nameEn": "Noorapura Urpha Lalapura"
                            },
                            {
                                "value": "900501",
                                "name": "नोनियनपुरवा",
                                "nameEn": "Noniyanapurava"
                            },
                            {
                                "value": "220351",
                                "name": "नौरइयाखेड़ा",
                                "nameEn": "Nauraiyakhera"
                            },
                            {
                                "value": "900513",
                                "name": "नौरैयाखेड़ा",
                                "nameEn": "Nauraiyakhera"
                            },
                            {
                                "value": "900508",
                                "name": "न्‍यू ट्रान्‍सपोर्ट नगर",
                                "nameEn": "Nyoo Transaporta Nagara"
                            },
                            {
                                "value": "150357",
                                "name": "पतरसा",
                                "nameEn": "Patarasa"
                            },
                            {
                                "value": "900656",
                                "name": "पतरसा",
                                "nameEn": "Patarasa"
                            },
                            {
                                "value": "900658",
                                "name": "पतेहुरी",
                                "nameEn": "Patehuree"
                            },
                            {
                                "value": "150385",
                                "name": "पत्तेहुरी",
                                "nameEn": "Pttehuree"
                            },
                            {
                                "value": "900490",
                                "name": "पनकी इं एरिया साइट  1 व उघोग कुंज",
                                "nameEn": "Panakee In Eriya Saita  1 Va Ughoga Kunja"
                            },
                            {
                                "value": "900477",
                                "name": "पनकी ए बी सी डी व अन्‍य समस्‍त ब्‍लाक",
                                "nameEn": "Panakee E Bee See Dee Va Anya Samsta Blaka"
                            },
                            {
                                "value": "900378",
                                "name": "पनकी कटरा",
                                "nameEn": "Panakee Katara"
                            },
                            {
                                "value": "900381",
                                "name": "पनकी कलां",
                                "nameEn": "Panakee Kalan"
                            },
                            {
                                "value": "220353",
                                "name": "पनकीगंगागंज",
                                "nameEn": "Panakeegngagnja"
                            },
                            {
                                "value": "900380",
                                "name": "पनकी गंगागंज व शताब्दी नगर फेज 4 व 5 मन्दाकिनी इन्क्लेव",
                                "nameEn": "Panakee Gngagnja Va Shatabdee Nagara Pheja 4 Va 5 Mndakinee Inkleva"
                            },
                            {
                                "value": "220352",
                                "name": "पनकी भौसिंह",
                                "nameEn": "Panakee Bhausinha"
                            },
                            {
                                "value": "900503",
                                "name": "पनकी भौंसिंह व कालपी नगर व कालिंद्री नगर",
                                "nameEn": "Panakee Bhaunsinha Va Kalapee Nagara Va Kalindree Nagara"
                            },
                            {
                                "value": "900361",
                                "name": "परमपुरवा 83 चक",
                                "nameEn": "Paramapurava 83 Chak"
                            },
                            {
                                "value": "900628",
                                "name": "पलरा",
                                "nameEn": "Palara"
                            },
                            {
                                "value": "150372",
                                "name": "पलरा",
                                "nameEn": "Palara"
                            },
                            {
                                "value": "900457",
                                "name": "पाण्‍डु नगर 117 चक",
                                "nameEn": "Pandu Nagara 117 Chak"
                            },
                            {
                                "value": "900562",
                                "name": "पिपौरी",
                                "nameEn": "Pipauree"
                            },
                            {
                                "value": "150383",
                                "name": "पिपौरी",
                                "nameEn": "Pipauree"
                            },
                            {
                                "value": "900403",
                                "name": "पी टी ब्‍लाक फजलगंज",
                                "nameEn": "Pee Tee Blaka Phajalagnja"
                            },
                            {
                                "value": "220355",
                                "name": "पुरवा नानकारी",
                                "nameEn": "Purava Nanakaree"
                            },
                            {
                                "value": "900283",
                                "name": "पुरवा नानकारी",
                                "nameEn": "Purava Nanakaree"
                            },
                            {
                                "value": "900397",
                                "name": "प्रतापगंज",
                                "nameEn": "Pratapagnja"
                            },
                            {
                                "value": "900388",
                                "name": "प्रतापपुर",
                                "nameEn": "Pratapapura"
                            },
                            {
                                "value": "900564",
                                "name": "प्रतापपुर मजरा रामपुर",
                                "nameEn": "Pratapapura Majara Ramapura"
                            },
                            {
                                "value": "150358",
                                "name": "प्रतापपुर मजरारामपुर",
                                "nameEn": "Pratapapura Majararamapura"
                            },
                            {
                                "value": "901098",
                                "name": "प्रह्लाद्पुरवा 117 चक",
                                "nameEn": "Prhladpurava 117 Chak"
                            },
                            {
                                "value": "900396",
                                "name": "फजलगंज 122 व 123 चक",
                                "nameEn": "Phajalagnja 122 Va 123 Chak"
                            },
                            {
                                "value": "900371",
                                "name": "फजलगंज 84 चक",
                                "nameEn": "Phajalagnja 84 Chak"
                            },
                            {
                                "value": "900567",
                                "name": "फत्‍तेपुर दक्षिण",
                                "nameEn": "Phttepura Dakshina"
                            },
                            {
                                "value": "220359",
                                "name": "फत्तेपुर दक्षिण",
                                "nameEn": "Phttepura Dakshina"
                            },
                            {
                                "value": "900402",
                                "name": "फैक्‍ट्री एरिया 123 चक",
                                "nameEn": "Phaiktree Eriya 123 Chak"
                            },
                            {
                                "value": "900400",
                                "name": "फैक्‍ट्री एरिया फजलगंज",
                                "nameEn": "Phaiktree Eriya Phajalagnja"
                            },
                            {
                                "value": "900631",
                                "name": "बकौली",
                                "nameEn": "Bakaulee"
                            },
                            {
                                "value": "150403",
                                "name": "बकौली",
                                "nameEn": "Bakaulee"
                            },
                            {
                                "value": "900337",
                                "name": "बंगाली कालोनी",
                                "nameEn": "Bngalee Kalonee"
                            },
                            {
                                "value": "900498",
                                "name": "बदुआपुर",
                                "nameEn": "Baduaapura"
                            },
                            {
                                "value": "900375",
                                "name": "बम्‍बा रोड 119 चक",
                                "nameEn": "Bmba Roda 119 Chak"
                            },
                            {
                                "value": "900496",
                                "name": "बरगदियापुरवा",
                                "nameEn": "Baragadiyapurava"
                            },
                            {
                                "value": "900366",
                                "name": "बसन्‍ती नगर 83 चक",
                                "nameEn": "Basntee Nagara 83 Chak"
                            },
                            {
                                "value": "150432",
                                "name": "बाजपुर",
                                "nameEn": "Bajapura"
                            },
                            {
                                "value": "900659",
                                "name": "बाजपुर",
                                "nameEn": "Bajapura"
                            },
                            {
                                "value": "220366",
                                "name": "बारा सिरोही",
                                "nameEn": "Bara Sirohee"
                            },
                            {
                                "value": "900287",
                                "name": "बारासिरोही",
                                "nameEn": "Barasirohee"
                            },
                            {
                                "value": "900569",
                                "name": "बिधनू",
                                "nameEn": "Bidhanoo"
                            },
                            {
                                "value": "150419",
                                "name": "बिधनू",
                                "nameEn": "Bidhanoo"
                            },
                            {
                                "value": "900570",
                                "name": "बिनौर",
                                "nameEn": "Binaura"
                            },
                            {
                                "value": "220386",
                                "name": "बिनौर द्वितीय",
                                "nameEn": "Binaura Dviteeya"
                            },
                            {
                                "value": "220387",
                                "name": "बिनौर प्रथम",
                                "nameEn": "Binaura Prathama"
                            },
                            {
                                "value": "900338",
                                "name": "बी एम मार्केट 83 च 124 चक",
                                "nameEn": "Bee Ema Marketa 83 Cha 124 Chak"
                            },
                            {
                                "value": "150415",
                                "name": "बीछी गाँव",
                                "nameEn": "Beechhee Ganw"
                            },
                            {
                                "value": "900634",
                                "name": "बीछीगांव",
                                "nameEn": "BeechheeGanw"
                            },
                            {
                                "value": "900389",
                                "name": "भटठा एरिया रानीगंज",
                                "nameEn": "Bhatatha Eriya Raneegnja"
                            },
                            {
                                "value": "900422",
                                "name": "भन्‍नानापुरवा 87 चक",
                                "nameEn": "Bhnnanapurava 87 Chak"
                            },
                            {
                                "value": "900385",
                                "name": "भवानीपुर",
                                "nameEn": "Bhavaneepura"
                            },
                            {
                                "value": "150377",
                                "name": "भैरमपुर",
                                "nameEn": "Bhairamapura"
                            },
                            {
                                "value": "900572",
                                "name": "भैरमपुर",
                                "nameEn": "Bhairamapura"
                            },
                            {
                                "value": "900575",
                                "name": "मगरासा",
                                "nameEn": "Magarasa"
                            },
                            {
                                "value": "150429",
                                "name": "मगरासा",
                                "nameEn": "Magarasa"
                            },
                            {
                                "value": "900473",
                                "name": "मतैयापुरवा",
                                "nameEn": "Mataiyapurava"
                            },
                            {
                                "value": "150382",
                                "name": "मरदनपुर",
                                "nameEn": "Maradanapura"
                            },
                            {
                                "value": "900573",
                                "name": "मर्दनपुर",
                                "nameEn": "Mrdanapura"
                            },
                            {
                                "value": "900351",
                                "name": "मलिन बस्‍ती व हरिजन बस्ती",
                                "nameEn": "Malina Bstee Va Harijana Bstee"
                            },
                            {
                                "value": "900407",
                                "name": "मसवानपुर",
                                "nameEn": "Masavanapura"
                            },
                            {
                                "value": "900410",
                                "name": "मसवानपुर नई बस्‍ती",
                                "nameEn": "Masavanapura Naee Bstee"
                            },
                            {
                                "value": "900327",
                                "name": "महाबलीपुरम एलआईजी एमआईजी 1 एमआईजी 2 मिनी एलआईजी",
                                "nameEn": "Mahabaleepurama Elaaaeejee Emaaaeejee 1 Emaaaeejee 2 Minee Elaaaeejee"
                            },
                            {
                                "value": "900455",
                                "name": "माडल टाउन 117 चक",
                                "nameEn": "Madala Tauna 117 Chak"
                            },
                            {
                                "value": "220388",
                                "name": "मिजर्ापुर",
                                "nameEn": "Mijrapura"
                            },
                            {
                                "value": "900289",
                                "name": "मिर्जापुर",
                                "nameEn": "Mirjapura"
                            },
                            {
                                "value": "900576",
                                "name": "मेहरबान सिंह का पुरवा",
                                "nameEn": "Meharabana Sinha Ka Purava"
                            },
                            {
                                "value": "150381",
                                "name": "मेहरबानसिंह का पुरवा",
                                "nameEn": "Meharabanasinha Ka Purava"
                            },
                            {
                                "value": "900221",
                                "name": "मोमिन नगर 117 चक",
                                "nameEn": "Momina Nagara 117 Chak"
                            },
                            {
                                "value": "900408",
                                "name": "मोहसिनपुर",
                                "nameEn": "Mohasinapura"
                            },
                            {
                                "value": "220371",
                                "name": "मोहसिनपुर",
                                "nameEn": "Mohasinapura"
                            },
                            {
                                "value": "900436",
                                "name": "रंजीत नगर 120 चक",
                                "nameEn": "Rnjeeta Nagara 120 Chak"
                            },
                            {
                                "value": "900382",
                                "name": "रतनपुर व शताब्दी नगर फेज 1 व 2",
                                "nameEn": "Ratanapura Va Shatabdee Nagara Pheja 1 Va 2"
                            },
                            {
                                "value": "900349",
                                "name": "राखी मण्‍डी",
                                "nameEn": "Rakhee Mndee"
                            },
                            {
                                "value": "900231",
                                "name": "राजीव नगर 117 चक",
                                "nameEn": "Rajeeva Nagara 117 Chak"
                            },
                            {
                                "value": "900222",
                                "name": "राणा प्रताप नगर 117 चक",
                                "nameEn": "Rana Pratapa Nagara 117 Chak"
                            },
                            {
                                "value": "900252",
                                "name": "रानीगंज  117  चक",
                                "nameEn": "Raneegnja  117  Chak"
                            },
                            {
                                "value": "900857",
                                "name": "राम खेड़ा",
                                "nameEn": "Rama Khera"
                            },
                            {
                                "value": "150410",
                                "name": "रामखेड़ा",
                                "nameEn": "Ramakhera"
                            },
                            {
                                "value": "900580",
                                "name": "रामपुर खास",
                                "nameEn": "Ramapura Khasa"
                            },
                            {
                                "value": "150361",
                                "name": "रामपुर खास",
                                "nameEn": "Ramapura Khasa"
                            },
                            {
                                "value": "900434",
                                "name": "रामलला रोड रावतपुर 116 चक",
                                "nameEn": "Ramalala Roda Ravatapura 116 Chak"
                            },
                            {
                                "value": "150373",
                                "name": "रायपुर कठार",
                                "nameEn": "Rayapura Kathara"
                            },
                            {
                                "value": "900635",
                                "name": "रायपुर कठार",
                                "nameEn": "Rayapura Kathara"
                            },
                            {
                                "value": "900423",
                                "name": "रायपुरवा ⁄ देवनगर ⁄ हीरागंज 86 चक",
                                "nameEn": "Rayapurava ⁄ Devanagara ⁄ Heeragnja 86 Chak"
                            },
                            {
                                "value": "220372",
                                "name": "रावतपुर",
                                "nameEn": "Ravatapura"
                            },
                            {
                                "value": "900427",
                                "name": "रावतपुर 115 व 116 चक",
                                "nameEn": "Ravatapura 115 Va 116 Chak"
                            },
                            {
                                "value": "900429",
                                "name": "रोशन नगर",
                                "nameEn": "Roshana Nagara"
                            },
                            {
                                "value": "900578",
                                "name": "रौतारा",
                                "nameEn": "Rautara"
                            },
                            {
                                "value": "150428",
                                "name": "रौतारा",
                                "nameEn": "Rautara"
                            },
                            {
                                "value": "900522",
                                "name": "लक्ष्‍मी रतन का हाता",
                                "nameEn": "Laksh्mee Ratana Ka Hata"
                            },
                            {
                                "value": "900448",
                                "name": "लखनपुर दक्षिण 114 चक",
                                "nameEn": "Lakhanapura Dakshina 114 Chak"
                            },
                            {
                                "value": "900435",
                                "name": "लाजपत नगर 120 चक",
                                "nameEn": "Lajapata Nagara 120 Chak"
                            },
                            {
                                "value": "900636",
                                "name": "लाल्‍हेपुर",
                                "nameEn": "Lalhepura"
                            },
                            {
                                "value": "150375",
                                "name": "लाल्हेपुर",
                                "nameEn": "Lalhepura"
                            },
                            {
                                "value": "900353",
                                "name": "विघार्थी मार्केट 126 चक",
                                "nameEn": "Vigharthee Marketa 126 Chak"
                            },
                            {
                                "value": "900449",
                                "name": "विजय नगर 121 चक",
                                "nameEn": "Vijaya Nagara 121 Chak"
                            },
                            {
                                "value": "900341",
                                "name": "विधवा र्क्‍वाटर",
                                "nameEn": "Vidhava Rkvatara"
                            },
                            {
                                "value": "220391",
                                "name": "विनायकपुर",
                                "nameEn": "Vinayakapura"
                            },
                            {
                                "value": "900444",
                                "name": "विनायकपुर  114  117 चक",
                                "nameEn": "Vinayakapura  114  117 Chak"
                            },
                            {
                                "value": "900443",
                                "name": "विनायकपुर 114 चक",
                                "nameEn": "Vinayakapura 114 Chak"
                            },
                            {
                                "value": "900340",
                                "name": "विवेकानन्‍द नगर",
                                "nameEn": "Vivekannda Nagara"
                            },
                            {
                                "value": "900509",
                                "name": "व्‍यापार नगर",
                                "nameEn": "Vyapara Nagara"
                            },
                            {
                                "value": "900637",
                                "name": "शम्‍भुआ",
                                "nameEn": "Shmbhuaa"
                            },
                            {
                                "value": "150406",
                                "name": "शम्भुआ 1",
                                "nameEn": "Shmbhuaa 1"
                            },
                            {
                                "value": "220376",
                                "name": "शम्भुआ 2",
                                "nameEn": "Shmbhuaa 2"
                            },
                            {
                                "value": "900854",
                                "name": "शारदा नगर 117 चक",
                                "nameEn": "Sharada Nagara 117 Chak"
                            },
                            {
                                "value": "900481",
                                "name": "शाहपुर",
                                "nameEn": "Shahpur"
                            },
                            {
                                "value": "900413",
                                "name": "शिव नगर",
                                "nameEn": "Shiva Nagara"
                            },
                            {
                                "value": "900661",
                                "name": "शिवरामपुर",
                                "nameEn": "Shivaramapura"
                            },
                            {
                                "value": "150418",
                                "name": "शिवरामपुर",
                                "nameEn": "Shivaramapura"
                            },
                            {
                                "value": "900316",
                                "name": "शिवली रोड कल्‍यानपुर",
                                "nameEn": "Shivalee Roda Klyanapura"
                            },
                            {
                                "value": "900438",
                                "name": "शिवाजी नगर 120 चक",
                                "nameEn": "Shivajee Nagara 120 Chak"
                            },
                            {
                                "value": "900460",
                                "name": "श्रम निदेशालय कालोनी",
                                "nameEn": "Shrama Nideshalaya Kalonee"
                            },
                            {
                                "value": "900638",
                                "name": "सपई",
                                "nameEn": "Sapaee"
                            },
                            {
                                "value": "150379",
                                "name": "सपई",
                                "nameEn": "Sapaee"
                            },
                            {
                                "value": "150426",
                                "name": "सरनैतपुर",
                                "nameEn": "Saranaitapura"
                            },
                            {
                                "value": "900666",
                                "name": "सरनैतपुर सरनैकपुर",
                                "nameEn": "Saranaitapura Saranaikapura"
                            },
                            {
                                "value": "900493",
                                "name": "सरायमीता",
                                "nameEn": "Sarayameeta"
                            },
                            {
                                "value": "900399",
                                "name": "सरेश बाग 123 चक",
                                "nameEn": "Saresha Baga 123 Chak"
                            },
                            {
                                "value": "900472",
                                "name": "सरोजनी नगर 122 चक",
                                "nameEn": "Sarojanee Nagara 122 Chak"
                            },
                            {
                                "value": "900454",
                                "name": "सर्वोदय नगर एच ब्‍लाक 117 चक",
                                "nameEn": "Srvodaya Nagara Echa Blaka 117 Chak"
                            },
                            {
                                "value": "900452",
                                "name": "सर्वोदय नगर सी ब्‍लाक 117 चक",
                                "nameEn": "Srvodaya Nagara See Blaka 117 Chak"
                            },
                            {
                                "value": "900415",
                                "name": "सहकार नगर",
                                "nameEn": "Sahakara Nagara"
                            },
                            {
                                "value": "900526",
                                "name": "सिन्‍धी कालोनी",
                                "nameEn": "Sindhee Kalonee"
                            },
                            {
                                "value": "150359",
                                "name": "सिंहपुर कठार",
                                "nameEn": "Sinhapura Kathara"
                            },
                            {
                                "value": "900590",
                                "name": "सिंहपुर कठार",
                                "nameEn": "Sinhapura Kathara"
                            },
                            {
                                "value": "150389",
                                "name": "सीढी",
                                "nameEn": "Seedhee"
                            },
                            {
                                "value": "900584",
                                "name": "सीढ़ी",
                                "nameEn": "Seerhee"
                            },
                            {
                                "value": "900480",
                                "name": "सुजानपुर",
                                "nameEn": "Sujanapura"
                            },
                            {
                                "value": "900432",
                                "name": "सुरेन्‍द्र नगर",
                                "nameEn": "Surendra Nagara"
                            },
                            {
                                "value": "900586",
                                "name": "सुरौली",
                                "nameEn": "Suraulee"
                            },
                            {
                                "value": "150416",
                                "name": "सुरौली",
                                "nameEn": "Suraulee"
                            },
                            {
                                "value": "900640",
                                "name": "सुल्‍तानपुर",
                                "nameEn": "Sultanapura"
                            },
                            {
                                "value": "150414",
                                "name": "सुल्तानपुर",
                                "nameEn": "Sultanapura"
                            },
                            {
                                "value": "900663",
                                "name": "सेंगरापुर",
                                "nameEn": "Sengarapura"
                            },
                            {
                                "value": "150461",
                                "name": "सेंगरापुर",
                                "nameEn": "Sengarapura"
                            },
                            {
                                "value": "150386",
                                "name": "सेन पश्चिम पारा",
                                "nameEn": "Sena Pshchima Para"
                            },
                            {
                                "value": "900583",
                                "name": "सेन पश्चिमपारा",
                                "nameEn": "Sena Pshchimapara"
                            },
                            {
                                "value": "150388",
                                "name": "सेन पूरब पारा",
                                "nameEn": "Sena Pooraba Para"
                            },
                            {
                                "value": "900582",
                                "name": "सेन पूरबपारा",
                                "nameEn": "Sena Poorabapara"
                            },
                            {
                                "value": "900352",
                                "name": "सेवाग्राम कालोनी व लोहिया नगर कॉलोनी 124 चक",
                                "nameEn": "Sevagrama Kalonee Va Lohiya Nagara Kaolonee 124 Chak"
                            },
                            {
                                "value": "900428",
                                "name": "सैययद नगर",
                                "nameEn": "Saiyayada Nagara"
                            },
                            {
                                "value": "900662",
                                "name": "सैंया गोझा",
                                "nameEn": "Sainya Gojha"
                            },
                            {
                                "value": "150392",
                                "name": "सैंया गौझा",
                                "nameEn": "Sainya Gaujha"
                            },
                            {
                                "value": "900587",
                                "name": "सोना",
                                "nameEn": "Sona"
                            },
                            {
                                "value": "150363",
                                "name": "सोना",
                                "nameEn": "Sona"
                            },
                            {
                                "value": "900478",
                                "name": "स्‍वराज नगर",
                                "nameEn": "Svaraja Nagara"
                            },
                            {
                                "value": "150412",
                                "name": "हड़हा",
                                "nameEn": "Harha"
                            },
                            {
                                "value": "900641",
                                "name": "हड़हा",
                                "nameEn": "Harha"
                            },
                            {
                                "value": "150420",
                                "name": "हरबंशपुर",
                                "nameEn": "Harabnshapura"
                            },
                            {
                                "value": "900592",
                                "name": "हरवशपुर",
                                "nameEn": "Haravashapura"
                            },
                            {
                                "value": "900517",
                                "name": "हरिहरनाथ शास्‍त्री नगर 121व 122 चक",
                                "nameEn": "Hariharanatha Shastree Nagara 121va 122 Chak"
                            },
                            {
                                "value": "900419",
                                "name": "हसनपुर",
                                "nameEn": "Hasanapura"
                            },
                            {
                                "value": "220396",
                                "name": "हसनपूर",
                                "nameEn": "Hasanapoora"
                            }
                        ],
                        "212": [
                            {
                                "value": "149972",
                                "name": "अकबरपुर सेंग",
                                "nameEn": "Akbarpur Senga"
                            },
                            {
                                "value": "150105",
                                "name": "अजौली",
                                "nameEn": "Ajauli"
                            },
                            {
                                "value": "150213",
                                "name": "अटवा",
                                "nameEn": "Atwa"
                            },
                            {
                                "value": "149953",
                                "name": "अनेई",
                                "nameEn": "Anei"
                            },
                            {
                                "value": "900910",
                                "name": "अब्दुल कलाम आजाद नगर",
                                "nameEn": "Abdula Kalama Azad Nagara"
                            },
                            {
                                "value": "150239",
                                "name": "अमिलिहा",
                                "nameEn": "Amiliha"
                            },
                            {
                                "value": "900919",
                                "name": "अम्बेडकर नगर",
                                "nameEn": "Ambedakara Nagara"
                            },
                            {
                                "value": "900913",
                                "name": "अम्बेडकर नगर",
                                "nameEn": "Ambedakara Nagara"
                            },
                            {
                                "value": "149914",
                                "name": "अरौल",
                                "nameEn": "Araula"
                            },
                            {
                                "value": "149991",
                                "name": "अर्जुनपुर",
                                "nameEn": "Arjunapura"
                            },
                            {
                                "value": "150084",
                                "name": "अल्लापुर भसेनी",
                                "nameEn": "Allapura Bhasenee"
                            },
                            {
                                "value": "150026",
                                "name": "अल्लीपुर",
                                "nameEn": "Alleepura"
                            },
                            {
                                "value": "150206",
                                "name": "अवावकपुर",
                                "nameEn": "Avavakapura"
                            },
                            {
                                "value": "900908",
                                "name": "अशफाक उल्ला नगर",
                                "nameEn": "Ashaphaka Ulla Nagara"
                            },
                            {
                                "value": "150040",
                                "name": "अहमदपुर नदिहा",
                                "nameEn": "Ahamadapura Nadiha"
                            },
                            {
                                "value": "149910",
                                "name": "आंकिन",
                                "nameEn": "Aankina"
                            },
                            {
                                "value": "900904",
                                "name": "आजाद नगर",
                                "nameEn": "Azad Nagara"
                            },
                            {
                                "value": "150145",
                                "name": "आँटी",
                                "nameEn": "Aantee"
                            },
                            {
                                "value": "150032",
                                "name": "आराजी ईशेपुर",
                                "nameEn": "Aarajee Eeshepura"
                            },
                            {
                                "value": "150234",
                                "name": "आलमपुर",
                                "nameEn": "Aalamapura"
                            },
                            {
                                "value": "150275",
                                "name": "इटरा",
                                "nameEn": "Itara"
                            },
                            {
                                "value": "150268",
                                "name": "इन्दलपुर जुगराज",
                                "nameEn": "Indalapura Jugaraja"
                            },
                            {
                                "value": "150187",
                                "name": "इन्दलपुर शिवराजपुर",
                                "nameEn": "Indalapura Shivarajapura"
                            },
                            {
                                "value": "900918",
                                "name": "इन्द्रा नगर",
                                "nameEn": "Indra Nagara"
                            },
                            {
                                "value": "150011",
                                "name": "इब्राहीमपुर रौंस",
                                "nameEn": "Ibraheemapura Raunsa"
                            },
                            {
                                "value": "149889",
                                "name": "इलियासपुर",
                                "nameEn": "Iliyasapura"
                            },
                            {
                                "value": "149948",
                                "name": "ईशेपुर बिल्हौर",
                                "nameEn": "Eeshepura Bilhaura"
                            },
                            {
                                "value": "150107",
                                "name": "ईशेपुर शिवराजपुर",
                                "nameEn": "Eeshepura Shivarajapura"
                            },
                            {
                                "value": "150021",
                                "name": "उट्ठा",
                                "nameEn": "Uttha"
                            },
                            {
                                "value": "150028",
                                "name": "उत्तमपुर",
                                "nameEn": "Uttamapura"
                            },
                            {
                                "value": "150042",
                                "name": "उत्तरी",
                                "nameEn": "Uttaree"
                            },
                            {
                                "value": "150016",
                                "name": "उदयभानपुर",
                                "nameEn": "Udayabhanapura"
                            },
                            {
                                "value": "150222",
                                "name": "उदेतपुर बिठूर",
                                "nameEn": "Udetapura Bithoora"
                            },
                            {
                                "value": "150109",
                                "name": "उदेतपुर शिवराजपुर",
                                "nameEn": "Udetapura Shivarajapura"
                            },
                            {
                                "value": "150261",
                                "name": "उमरी",
                                "nameEn": "Umaree"
                            },
                            {
                                "value": "149950",
                                "name": "औरंगपुर साँभी",
                                "nameEn": "Aurngapura Sanbhee"
                            },
                            {
                                "value": "220817",
                                "name": "औरावरी",
                                "nameEn": "Auravaree"
                            },
                            {
                                "value": "150022",
                                "name": "औरोंताहरपुर",
                                "nameEn": "Aurontaharapura"
                            },
                            {
                                "value": "150036",
                                "name": "ककवन",
                                "nameEn": "Kakavana"
                            },
                            {
                                "value": "150149",
                                "name": "कंजती",
                                "nameEn": "Knjatee"
                            },
                            {
                                "value": "149971",
                                "name": "कटरी अकबरपुर सेग",
                                "nameEn": "Kataree Akbarpur Sega"
                            },
                            {
                                "value": "150212",
                                "name": "कटरी अटवा",
                                "nameEn": "Kataree Atwa"
                            },
                            {
                                "value": "150085",
                                "name": "कटरी अल्लापुर भसेनी",
                                "nameEn": "Kataree Allapura Bhasenee"
                            },
                            {
                                "value": "149911",
                                "name": "कटरी आंकिन",
                                "nameEn": "Kataree Aankina"
                            },
                            {
                                "value": "150173",
                                "name": "कटरी केवना",
                                "nameEn": "Kataree Kevana"
                            },
                            {
                                "value": "220818",
                                "name": "कटरी ख्वाजगीपुर",
                                "nameEn": "Kataree Khvajageepura"
                            },
                            {
                                "value": "149970",
                                "name": "कटरी गदनपुर अहार",
                                "nameEn": "Kataree Gadanapura Ahara"
                            },
                            {
                                "value": "149918",
                                "name": "कटरी गिलवट अमीनाबाद",
                                "nameEn": "Kataree Gilavata Ameenabada"
                            },
                            {
                                "value": "149960",
                                "name": "कटरी गौरी",
                                "nameEn": "Kataree Gauree"
                            },
                            {
                                "value": "149985",
                                "name": "कटरी जैसरमऊ",
                                "nameEn": "Kataree Jaisaramaoo"
                            },
                            {
                                "value": "150169",
                                "name": "कटरी तरीपाठकपुर",
                                "nameEn": "Kataree Tareepathakapura"
                            },
                            {
                                "value": "150174",
                                "name": "कटरी दुगर्ापुर",
                                "nameEn": "Kataree Dugrapura"
                            },
                            {
                                "value": "149937",
                                "name": "कटरी नानामऊ",
                                "nameEn": "Kataree Nanamaoo"
                            },
                            {
                                "value": "150070",
                                "name": "कटरी पनका",
                                "nameEn": "Kataree Panaka"
                            },
                            {
                                "value": "150230",
                                "name": "कटरी पाठकपुरबिठूर",
                                "nameEn": "Kataree Pathakapurabithoora"
                            },
                            {
                                "value": "150069",
                                "name": "कटरी प्यारेपुर",
                                "nameEn": "Kataree Pyarepura"
                            },
                            {
                                "value": "150170",
                                "name": "कटरी बरूवा कलाँ",
                                "nameEn": "Kataree Baroova Kalan"
                            },
                            {
                                "value": "150211",
                                "name": "कटरी बरूवा खुर्द",
                                "nameEn": "Kataree Baroova Khurd"
                            },
                            {
                                "value": "149912",
                                "name": "कटरी बहरामपुर",
                                "nameEn": "Kataree Baharamapura"
                            },
                            {
                                "value": "150215",
                                "name": "कटरी बाल्हीपुर",
                                "nameEn": "Kataree Balheepura"
                            },
                            {
                                "value": "150168",
                                "name": "कटरी बेहटा",
                                "nameEn": "Kataree Behata"
                            },
                            {
                                "value": "149935",
                                "name": "कटरी बोहनार",
                                "nameEn": "Kataree Bohanara"
                            },
                            {
                                "value": "149982",
                                "name": "कटरी मतलबपुर जुलहा",
                                "nameEn": "Kataree Matalabapura Julaha"
                            },
                            {
                                "value": "149940",
                                "name": "कटरी महिगवाँ",
                                "nameEn": "Kataree Mahigavan"
                            },
                            {
                                "value": "149961",
                                "name": "कटरी मुहीउद्दीनपुर",
                                "nameEn": "Kataree Muheeuddeenapura"
                            },
                            {
                                "value": "150086",
                                "name": "कटरी राजेपुर शादीपुर",
                                "nameEn": "Kataree Rajepura Shadeepura"
                            },
                            {
                                "value": "149986",
                                "name": "कटरी राधन",
                                "nameEn": "Kataree Radhana"
                            },
                            {
                                "value": "150219",
                                "name": "कटरी वाजीदपुर",
                                "nameEn": "Kataree Vajeedapura"
                            },
                            {
                                "value": "149932",
                                "name": "कटरी संजतीबादशाहपुर",
                                "nameEn": "Kataree SnjateebadaShahpur"
                            },
                            {
                                "value": "149933",
                                "name": "कटरी सम्भियापुर",
                                "nameEn": "Kataree Smbhiyapura"
                            },
                            {
                                "value": "150083",
                                "name": "कटरी सरांयगंग",
                                "nameEn": "Kataree Saranyagnga"
                            },
                            {
                                "value": "150218",
                                "name": "कटरी सलेमपुर बिठूर",
                                "nameEn": "Kataree Salemapura Bithoora"
                            },
                            {
                                "value": "150214",
                                "name": "कटरी सुनौढ़ा",
                                "nameEn": "Kataree Sunaurha"
                            },
                            {
                                "value": "149909",
                                "name": "कटरी हसौलीकाजीगंज",
                                "nameEn": "Kataree Hasauleekajeegnja"
                            },
                            {
                                "value": "149917",
                                "name": "कटरी हासिमपुर",
                                "nameEn": "Kataree Hasimapura"
                            },
                            {
                                "value": "150061",
                                "name": "कपूरपुर भवन",
                                "nameEn": "Kapoorapura Bhavana"
                            },
                            {
                                "value": "149949",
                                "name": "कमसान",
                                "nameEn": "Kamasana"
                            },
                            {
                                "value": "150050",
                                "name": "कमालपुर",
                                "nameEn": "Kamalapura"
                            },
                            {
                                "value": "150166",
                                "name": "करतरिया",
                                "nameEn": "Karatariya"
                            },
                            {
                                "value": "149930",
                                "name": "क.शाहमपुरपदुर्मन",
                                "nameEn": "Ka.shahamapurapadurmana"
                            },
                            {
                                "value": "150033",
                                "name": "कसिगवां",
                                "nameEn": "Kasigavan"
                            },
                            {
                                "value": "150076",
                                "name": "काकूपुर निहाल",
                                "nameEn": "Kakoopura Nihala"
                            },
                            {
                                "value": "150077",
                                "name": "काकूपुर रब्बन",
                                "nameEn": "Kakoopura Rbbana"
                            },
                            {
                                "value": "150080",
                                "name": "काकूपुर सीताराम",
                                "nameEn": "Kakoopura Seetarama"
                            },
                            {
                                "value": "150073",
                                "name": "काकूपुर हलबल",
                                "nameEn": "Kakoopura Halabala"
                            },
                            {
                                "value": "149915",
                                "name": "कांटी कुंर्इं",
                                "nameEn": "Kantee Kunrin"
                            },
                            {
                                "value": "150128",
                                "name": "कासामऊ",
                                "nameEn": "Kasamaoo"
                            },
                            {
                                "value": "900916",
                                "name": "किदवई नगर",
                                "nameEn": "Kidavaee Nagara"
                            },
                            {
                                "value": "150223",
                                "name": "किशुनपुर",
                                "nameEn": "Kishunapura"
                            },
                            {
                                "value": "150153",
                                "name": "कीरतपुर",
                                "nameEn": "Keeratapura"
                            },
                            {
                                "value": "150282",
                                "name": "कुकरादेव",
                                "nameEn": "Kukaradeva"
                            },
                            {
                                "value": "149946",
                                "name": "कुदौरा",
                                "nameEn": "Kudaura"
                            },
                            {
                                "value": "150020",
                                "name": "कुरेह",
                                "nameEn": "Kureha"
                            },
                            {
                                "value": "150035",
                                "name": "कुरौली",
                                "nameEn": "Kuraulee"
                            },
                            {
                                "value": "150250",
                                "name": "कुर्मीखेड़ा कलाँ",
                                "nameEn": "Kurmikhera Kalan"
                            },
                            {
                                "value": "150135",
                                "name": "कुर्मीखेड़ा खुर्द",
                                "nameEn": "Kurmikhera Khurd"
                            },
                            {
                                "value": "150058",
                                "name": "कुंवरपुर",
                                "nameEn": "Kunvarapura"
                            },
                            {
                                "value": "150142",
                                "name": "कुंवरपुर कुकरी",
                                "nameEn": "Kunvarapura Kukaree"
                            },
                            {
                                "value": "900900",
                                "name": "कृष्णा नगर",
                                "nameEn": "Krishna Nagara"
                            },
                            {
                                "value": "150178",
                                "name": "केवना",
                                "nameEn": "Kevana"
                            },
                            {
                                "value": "149903",
                                "name": "केशवापुर",
                                "nameEn": "Keshavapura"
                            },
                            {
                                "value": "149945",
                                "name": "खजुरी",
                                "nameEn": "Khajuree"
                            },
                            {
                                "value": "150192",
                                "name": "खरगपुर",
                                "nameEn": "Kharagapura"
                            },
                            {
                                "value": "150010",
                                "name": "खरपतपुर",
                                "nameEn": "Kharapatapura"
                            },
                            {
                                "value": "149897",
                                "name": "खाड़ामऊ",
                                "nameEn": "Kharamaoo"
                            },
                            {
                                "value": "149926",
                                "name": "खासपुर",
                                "nameEn": "Khasapura"
                            },
                            {
                                "value": "150025",
                                "name": "खुर्द खोजनपुर",
                                "nameEn": "Khurd Khojanapura"
                            },
                            {
                                "value": "150008",
                                "name": "खेरवा",
                                "nameEn": "Kherava"
                            },
                            {
                                "value": "150140",
                                "name": "खोंधन",
                                "nameEn": "Khondhana"
                            },
                            {
                                "value": "220819",
                                "name": "ख्वाजगीपुर",
                                "nameEn": "Khvajageepura"
                            },
                            {
                                "value": "149905",
                                "name": "गजना",
                                "nameEn": "Gajana"
                            },
                            {
                                "value": "150251",
                                "name": "गजेनपुर",
                                "nameEn": "Gajenapura"
                            },
                            {
                                "value": "149974",
                                "name": "गढ़",
                                "nameEn": "Garh"
                            },
                            {
                                "value": "150014",
                                "name": "गढ़ी",
                                "nameEn": "Garhee"
                            },
                            {
                                "value": "150039",
                                "name": "गढ़ेवा",
                                "nameEn": "Garheva"
                            },
                            {
                                "value": "149969",
                                "name": "गदनपुर आहर",
                                "nameEn": "Gadanapura Aahara"
                            },
                            {
                                "value": "149952",
                                "name": "गदनपुर चोरसा",
                                "nameEn": "Gadanapura Chorasa"
                            },
                            {
                                "value": "150208",
                                "name": "गबड़हा",
                                "nameEn": "Gabarha"
                            },
                            {
                                "value": "150279",
                                "name": "गम्भीरपुर",
                                "nameEn": "Gmbheerapura"
                            },
                            {
                                "value": "900896",
                                "name": "गया प्रसाद नगर",
                                "nameEn": "Gaya Prasada Nagara"
                            },
                            {
                                "value": "149907",
                                "name": "गांगूपुर",
                                "nameEn": "Gangoopura"
                            },
                            {
                                "value": "149919",
                                "name": "गिलवट अमीनाबाद",
                                "nameEn": "Gilavata Ameenabada"
                            },
                            {
                                "value": "150134",
                                "name": "गुरैनी",
                                "nameEn": "Gurainee"
                            },
                            {
                                "value": "150204",
                                "name": "गुरैया",
                                "nameEn": "Guraiya"
                            },
                            {
                                "value": "149904",
                                "name": "गूजेपुर",
                                "nameEn": "Goojepura"
                            },
                            {
                                "value": "150253",
                                "name": "गोगूमऊ",
                                "nameEn": "Gogoomaoo"
                            },
                            {
                                "value": "150054",
                                "name": "गोड़रा",
                                "nameEn": "Gorra"
                            },
                            {
                                "value": "150067",
                                "name": "गोपालपुर शिवराजपुर",
                                "nameEn": "Gopalapura Shivarajapura"
                            },
                            {
                                "value": "150286",
                                "name": "गोविन्दपुर",
                                "nameEn": "Govindapura"
                            },
                            {
                                "value": "150114",
                                "name": "गोविन्देपुर",
                                "nameEn": "Govindepura"
                            },
                            {
                                "value": "149959",
                                "name": "गौरी",
                                "nameEn": "Gauree"
                            },
                            {
                                "value": "150120",
                                "name": "गौरी अभयपुर",
                                "nameEn": "Gauree Abhayapura"
                            },
                            {
                                "value": "150125",
                                "name": "गौरी चौबे",
                                "nameEn": "Gauree Chaube"
                            },
                            {
                                "value": "150258",
                                "name": "गौरीलक्खा",
                                "nameEn": "Gaureelkkha"
                            },
                            {
                                "value": "150181",
                                "name": "घनश्यामपुर",
                                "nameEn": "Ghanshyamapura"
                            },
                            {
                                "value": "150207",
                                "name": "घाघपुर",
                                "nameEn": "Ghaghapura"
                            },
                            {
                                "value": "150165",
                                "name": "घेमऊ",
                                "nameEn": "Ghemaoo"
                            },
                            {
                                "value": "150227",
                                "name": "चक काजी अलिहा",
                                "nameEn": "Chak Kajee Aliha"
                            },
                            {
                                "value": "149925",
                                "name": "चक खासपुर",
                                "nameEn": "Chak Khasapura"
                            },
                            {
                                "value": "150285",
                                "name": "चक गोविन्देपुर",
                                "nameEn": "Chak Govindepura"
                            },
                            {
                                "value": "150272",
                                "name": "चक बहरमपुर",
                                "nameEn": "Chak Baharamapura"
                            },
                            {
                                "value": "150078",
                                "name": "चक बाँका",
                                "nameEn": "Chak Banka"
                            },
                            {
                                "value": "150226",
                                "name": "चक बेचा",
                                "nameEn": "Chak Becha"
                            },
                            {
                                "value": "150133",
                                "name": "चक सम्भलपुर",
                                "nameEn": "Chak Smbhalapura"
                            },
                            {
                                "value": "150199",
                                "name": "चक हजरतपुर",
                                "nameEn": "Chak Hajaratapura"
                            },
                            {
                                "value": "150031",
                                "name": "चन्दपुरा",
                                "nameEn": "Chndapura"
                            },
                            {
                                "value": "150288",
                                "name": "चन्दुला",
                                "nameEn": "Chndula"
                            },
                            {
                                "value": "900902",
                                "name": "चन्द्र शेखर आजाद नगर",
                                "nameEn": "Chndra Shekhara Azad Nagara"
                            },
                            {
                                "value": "900921",
                                "name": "चन्द्रशेखर आजाद नगर",
                                "nameEn": "Chndrashekhara Azad Nagara"
                            },
                            {
                                "value": "150248",
                                "name": "चम्पतपुर",
                                "nameEn": "Chmpatapura"
                            },
                            {
                                "value": "149906",
                                "name": "चीतामऊ",
                                "nameEn": "Cheetamaoo"
                            },
                            {
                                "value": "149943",
                                "name": "चौखंडी",
                                "nameEn": "Chaukhndee"
                            },
                            {
                                "value": "150235",
                                "name": "चौधरीपुर",
                                "nameEn": "Chaudhareepura"
                            },
                            {
                                "value": "149963",
                                "name": "चौबिगही शिकोहाबाद",
                                "nameEn": "Chaubigahee Shikohabada"
                            },
                            {
                                "value": "150291",
                                "name": "चौबेपुर कलाँ",
                                "nameEn": "Chaubepura Kalan"
                            },
                            {
                                "value": "150195",
                                "name": "चौबेपुर पक्खन",
                                "nameEn": "Chaubepura Pkkhana"
                            },
                            {
                                "value": "150079",
                                "name": "छतरपुर",
                                "nameEn": "Chhatarapura"
                            },
                            {
                                "value": "150136",
                                "name": "जगतपुर",
                                "nameEn": "Jagatapura"
                            },
                            {
                                "value": "150131",
                                "name": "जगदीशपुर",
                                "nameEn": "Jagadeeshapura"
                            },
                            {
                                "value": "150027",
                                "name": "जमालपुर",
                                "nameEn": "Jamalapura"
                            },
                            {
                                "value": "900899",
                                "name": "जय प्रकाश नगर",
                                "nameEn": "Jaya Prakasha Nagara"
                            },
                            {
                                "value": "150191",
                                "name": "जरारी",
                                "nameEn": "Jararee"
                            },
                            {
                                "value": "150019",
                                "name": "जरिहा",
                                "nameEn": "Jariha"
                            },
                            {
                                "value": "149891",
                                "name": "जलालपुर",
                                "nameEn": "Jalalapura"
                            },
                            {
                                "value": "150186",
                                "name": "जवाँसी",
                                "nameEn": "Javansee"
                            },
                            {
                                "value": "900926",
                                "name": "जवाहर नगर",
                                "nameEn": "Javahara Nagara"
                            },
                            {
                                "value": "900906",
                                "name": "जवाहर नगर",
                                "nameEn": "Javahara Nagara"
                            },
                            {
                                "value": "150167",
                                "name": "जादेपुर घस्सा",
                                "nameEn": "Jadepura Ghssa"
                            },
                            {
                                "value": "150066",
                                "name": "जानपुर उर्फ रानीनेवा",
                                "nameEn": "Janapura Urpha Raneeneva"
                            },
                            {
                                "value": "150081",
                                "name": "जाफराबाद",
                                "nameEn": "Japharabada"
                            },
                            {
                                "value": "150118",
                                "name": "जैतपुर शिवराजपुर",
                                "nameEn": "Jaitapura Shivarajapura"
                            },
                            {
                                "value": "149984",
                                "name": "जैसरमऊ",
                                "nameEn": "Jaisaramaoo"
                            },
                            {
                                "value": "150119",
                                "name": "जोराबरपुर",
                                "nameEn": "Jorabarapura"
                            },
                            {
                                "value": "150144",
                                "name": "टकटौली",
                                "nameEn": "Takataulee"
                            },
                            {
                                "value": "150164",
                                "name": "टोड़कापुर",
                                "nameEn": "Torkapura"
                            },
                            {
                                "value": "150221",
                                "name": "डिगरापुर",
                                "nameEn": "Digarapura"
                            },
                            {
                                "value": "150043",
                                "name": "डोडवा जमौली",
                                "nameEn": "Dodava Jamaulee"
                            },
                            {
                                "value": "150001",
                                "name": "ढूकापुर",
                                "nameEn": "Dhookapura"
                            },
                            {
                                "value": "150150",
                                "name": "तकीपुर",
                                "nameEn": "Takeepura"
                            },
                            {
                                "value": "150273",
                                "name": "ततारपुर",
                                "nameEn": "Tatarapura"
                            },
                            {
                                "value": "150177",
                                "name": "तरीपाठकपुर",
                                "nameEn": "Tareepathakapura"
                            },
                            {
                                "value": "150267",
                                "name": "ताजपुर",
                                "nameEn": "Tajapura"
                            },
                            {
                                "value": "150237",
                                "name": "तिघरा",
                                "nameEn": "Tighara"
                            },
                            {
                                "value": "150203",
                                "name": "त्रिलोकपुर",
                                "nameEn": "Trilokapura"
                            },
                            {
                                "value": "149939",
                                "name": "ददिखा",
                                "nameEn": "Dadikha"
                            },
                            {
                                "value": "150233",
                                "name": "दरियापुर बिठूर",
                                "nameEn": "Dariyapura Bithoora"
                            },
                            {
                                "value": "149975",
                                "name": "दरियापुर बिल्हौर",
                                "nameEn": "Dariyapura Bilhaura"
                            },
                            {
                                "value": "150108",
                                "name": "दरियापुर शिवराजपुर",
                                "nameEn": "Dariyapura Shivarajapura"
                            },
                            {
                                "value": "150162",
                                "name": "दलीपनगर",
                                "nameEn": "Daleepanagara"
                            },
                            {
                                "value": "150015",
                                "name": "दलेलपुर",
                                "nameEn": "Dalelapura"
                            },
                            {
                                "value": "150121",
                                "name": "दहारूद्रपुर",
                                "nameEn": "Daharoodrapura"
                            },
                            {
                                "value": "150065",
                                "name": "दहेलिया",
                                "nameEn": "Daheliya"
                            },
                            {
                                "value": "150012",
                                "name": "दाउदपुर",
                                "nameEn": "Daudapura"
                            },
                            {
                                "value": "149973",
                                "name": "दादारपुर कटहा",
                                "nameEn": "Dadarapura Kataha"
                            },
                            {
                                "value": "150060",
                                "name": "दिनकरपुर",
                                "nameEn": "Dinakarapura"
                            },
                            {
                                "value": "150276",
                                "name": "दिलावरपुर टोसवा",
                                "nameEn": "Dilavarapura Tosava"
                            },
                            {
                                "value": "150151",
                                "name": "दीनदारपुर",
                                "nameEn": "Deenadarapura"
                            },
                            {
                                "value": "150176",
                                "name": "दुगर्ापुर",
                                "nameEn": "Dugrapura"
                            },
                            {
                                "value": "150101",
                                "name": "दुबियाना",
                                "nameEn": "Dubiyana"
                            },
                            {
                                "value": "150190",
                                "name": "देदूपुर",
                                "nameEn": "Dedoopura"
                            },
                            {
                                "value": "149890",
                                "name": "देवकली बिल्हौर",
                                "nameEn": "Devakalee Bilhaura"
                            },
                            {
                                "value": "150148",
                                "name": "देवकली शिवराजपुर",
                                "nameEn": "Devakalee Shivarajapura"
                            },
                            {
                                "value": "150240",
                                "name": "देवपालपुर",
                                "nameEn": "Devapalapura"
                            },
                            {
                                "value": "150023",
                                "name": "देवहा",
                                "nameEn": "Devaha"
                            },
                            {
                                "value": "149989",
                                "name": "देवीपुर सरांय",
                                "nameEn": "Deveepura Saranya"
                            },
                            {
                                "value": "150183",
                                "name": "दोदेपुर",
                                "nameEn": "Dodepura"
                            },
                            {
                                "value": "149900",
                                "name": "धौरहरा",
                                "nameEn": "Dhaurahara"
                            },
                            {
                                "value": "150047",
                                "name": "नदिहा खुर्द",
                                "nameEn": "Nadiha Khurd"
                            },
                            {
                                "value": "150046",
                                "name": "नदिहा घामू",
                                "nameEn": "Nadiha Ghamoo"
                            },
                            {
                                "value": "150051",
                                "name": "नदीहा बुर्जुग",
                                "nameEn": "Nadeeha Burjuga"
                            },
                            {
                                "value": "149928",
                                "name": "नसिरापुर",
                                "nameEn": "Nasirapura"
                            },
                            {
                                "value": "150260",
                                "name": "नाढ़ूपुर",
                                "nameEn": "Narhoopura"
                            },
                            {
                                "value": "150198",
                                "name": "नाथूपुर",
                                "nameEn": "Nathoopura"
                            },
                            {
                                "value": "149938",
                                "name": "नानामऊ",
                                "nameEn": "Nanamaoo"
                            },
                            {
                                "value": "150269",
                                "name": "निगोह",
                                "nameEn": "Nigoha"
                            },
                            {
                                "value": "150117",
                                "name": "निसोन",
                                "nameEn": "Nisona"
                            },
                            {
                                "value": "150088",
                                "name": "नेवादा अजीतराय",
                                "nameEn": "Nevada Ajeetaraya"
                            },
                            {
                                "value": "150000",
                                "name": "नेवादा ऊधौ",
                                "nameEn": "Nevada Oodhau"
                            },
                            {
                                "value": "150092",
                                "name": "नेवादा कंठी",
                                "nameEn": "Nevada Knthee"
                            },
                            {
                                "value": "150089",
                                "name": "नेवादा तारापत",
                                "nameEn": "Nevada Tarapata"
                            },
                            {
                                "value": "150094",
                                "name": "नेवादा थाती",
                                "nameEn": "Nevada Thatee"
                            },
                            {
                                "value": "150075",
                                "name": "नेवादा दरिया",
                                "nameEn": "Nevada Dariya"
                            },
                            {
                                "value": "149992",
                                "name": "नेवादा दासा",
                                "nameEn": "Nevada Dasa"
                            },
                            {
                                "value": "149996",
                                "name": "नेवादा धमनू",
                                "nameEn": "Nevada Dhamanoo"
                            },
                            {
                                "value": "150100",
                                "name": "नेवादा भग्गी",
                                "nameEn": "Nevada Bhggee"
                            },
                            {
                                "value": "150098",
                                "name": "नेवादा मधई",
                                "nameEn": "Nevada Madhaee"
                            },
                            {
                                "value": "149980",
                                "name": "नेवादा मन्जू",
                                "nameEn": "Nevada Mnjoo"
                            },
                            {
                                "value": "150106",
                                "name": "नेवादा महासरन",
                                "nameEn": "Nevada Mahasarana"
                            },
                            {
                                "value": "150059",
                                "name": "नेवादा वंशी",
                                "nameEn": "Nevada Vnshee"
                            },
                            {
                                "value": "150003",
                                "name": "नेवादा शाह",
                                "nameEn": "Nevada Shaha"
                            },
                            {
                                "value": "150155",
                                "name": "नेवादा सुक्खा",
                                "nameEn": "Nevada Sukkha"
                            },
                            {
                                "value": "150124",
                                "name": "नेवादा सुजान",
                                "nameEn": "Nevada Sujana"
                            },
                            {
                                "value": "150002",
                                "name": "नेवादा सैना",
                                "nameEn": "Nevada Saina"
                            },
                            {
                                "value": "150056",
                                "name": "नेवादा हरीराय",
                                "nameEn": "Nevada Hareeraya"
                            },
                            {
                                "value": "150123",
                                "name": "नेवादा हंसी",
                                "nameEn": "Nevada Hnsee"
                            },
                            {
                                "value": "150197",
                                "name": "नोनहा कलाँ",
                                "nameEn": "Nonaha Kalan"
                            },
                            {
                                "value": "150196",
                                "name": "नोनहा नरसिंह",
                                "nameEn": "Nonaha Narasinha"
                            },
                            {
                                "value": "150018",
                                "name": "न्योराखेड़ा",
                                "nameEn": "Nyorakhera"
                            },
                            {
                                "value": "150280",
                                "name": "पचोर",
                                "nameEn": "Pachora"
                            },
                            {
                                "value": "900927",
                                "name": "पटेल नगर",
                                "nameEn": "Patela Nagara"
                            },
                            {
                                "value": "150071",
                                "name": "पनका",
                                "nameEn": "Panaka"
                            },
                            {
                                "value": "900905",
                                "name": "पन्त नगर",
                                "nameEn": "Pnta Nagara"
                            },
                            {
                                "value": "149886",
                                "name": "पलिया बुर्जुग",
                                "nameEn": "Paliya Burjuga"
                            },
                            {
                                "value": "150229",
                                "name": "पाठकपुर बिठूर",
                                "nameEn": "Pathakapura Bithoora"
                            },
                            {
                                "value": "150102",
                                "name": "पाठकपुर शिवराजपुर",
                                "nameEn": "Pathakapura Shivarajapura"
                            },
                            {
                                "value": "150289",
                                "name": "पारापरतापपुर",
                                "nameEn": "Paraparatapapura"
                            },
                            {
                                "value": "149896",
                                "name": "पिहानीमजबूतनगर",
                                "nameEn": "Pihaneemajabootanagara"
                            },
                            {
                                "value": "150225",
                                "name": "पीरकपुर",
                                "nameEn": "Peerakapura"
                            },
                            {
                                "value": "149998",
                                "name": "पूरा",
                                "nameEn": "Poora"
                            },
                            {
                                "value": "150200",
                                "name": "पूरा गनू",
                                "nameEn": "Poora Ganoo"
                            },
                            {
                                "value": "150265",
                                "name": "पूरा जसू",
                                "nameEn": "Poora Jasoo"
                            },
                            {
                                "value": "150160",
                                "name": "पूरा बुर्जुग",
                                "nameEn": "Poora Burjuga"
                            },
                            {
                                "value": "150287",
                                "name": "पूरा सुवंस",
                                "nameEn": "Poora Suvnsa"
                            },
                            {
                                "value": "150112",
                                "name": "पूरेबला",
                                "nameEn": "Poorebala"
                            },
                            {
                                "value": "150290",
                                "name": "पेम",
                                "nameEn": "Pema"
                            },
                            {
                                "value": "150068",
                                "name": "प्यारेपुर",
                                "nameEn": "Pyarepura"
                            },
                            {
                                "value": "150185",
                                "name": "प्रधानपुर",
                                "nameEn": "Pradhanapura"
                            },
                            {
                                "value": "150202",
                                "name": "प्रेमपुर",
                                "nameEn": "Premapura"
                            },
                            {
                                "value": "150038",
                                "name": "फत्तेपुर",
                                "nameEn": "Phttepura"
                            },
                            {
                                "value": "220820",
                                "name": "फत्तेपुर मजरा दलीपनगर",
                                "nameEn": "Phttepura Majara Daleepanagara"
                            },
                            {
                                "value": "149927",
                                "name": "बकोठी",
                                "nameEn": "Bakothee"
                            },
                            {
                                "value": "150030",
                                "name": "बछना",
                                "nameEn": "Bachhana"
                            },
                            {
                                "value": "150278",
                                "name": "बनी",
                                "nameEn": "Banee"
                            },
                            {
                                "value": "149894",
                                "name": "बम्भियापुर",
                                "nameEn": "Bmbhiyapura"
                            },
                            {
                                "value": "149898",
                                "name": "बरण्डा",
                                "nameEn": "Barnda"
                            },
                            {
                                "value": "150171",
                                "name": "बरूवाकलाँ",
                                "nameEn": "Baroovakalan"
                            },
                            {
                                "value": "150210",
                                "name": "बरूवाखुर्द",
                                "nameEn": "BaroovaKhurd"
                            },
                            {
                                "value": "149944",
                                "name": "बरौली",
                                "nameEn": "Baraulee"
                            },
                            {
                                "value": "150161",
                                "name": "बसेन",
                                "nameEn": "Basena"
                            },
                            {
                                "value": "150264",
                                "name": "बहरमपुर",
                                "nameEn": "Baharamapura"
                            },
                            {
                                "value": "150104",
                                "name": "बहरमापुर",
                                "nameEn": "Baharamapura"
                            },
                            {
                                "value": "149913",
                                "name": "बहरामपुर",
                                "nameEn": "Baharamapura"
                            },
                            {
                                "value": "150283",
                                "name": "बहलोलपुर",
                                "nameEn": "Bahalolapura"
                            },
                            {
                                "value": "900901",
                                "name": "बहादुर शाह जफर नगर",
                                "nameEn": "Bahadura Shaha Japhara Nagara"
                            },
                            {
                                "value": "149947",
                                "name": "बारामऊ",
                                "nameEn": "Baramaoo"
                            },
                            {
                                "value": "900897",
                                "name": "बाल्मीक नगर",
                                "nameEn": "Balmeeka Nagara"
                            },
                            {
                                "value": "150216",
                                "name": "बाल्हीपुर",
                                "nameEn": "Balheepura"
                            },
                            {
                                "value": "149922",
                                "name": "बावनझाला मुजफ्फरपुर",
                                "nameEn": "Bavanajhala Mujphpharapura"
                            },
                            {
                                "value": "150284",
                                "name": "बिरतियान बिठूर",
                                "nameEn": "Biratiyana Bithoora"
                            },
                            {
                                "value": "150184",
                                "name": "बिरैचामऊ",
                                "nameEn": "Biraichamaoo"
                            },
                            {
                                "value": "150091",
                                "name": "बिलहन",
                                "nameEn": "Bilahana"
                            },
                            {
                                "value": "149954",
                                "name": "बिल्हौर देहात",
                                "nameEn": "Bilhaura Dehata"
                            },
                            {
                                "value": "220821",
                                "name": "बिल्हौर नगरपालिका",
                                "nameEn": "Bilhaura Nagarapalika"
                            },
                            {
                                "value": "220822",
                                "name": "बिहारीपुर",
                                "nameEn": "Bihareepura"
                            },
                            {
                                "value": "149964",
                                "name": "बीबीपुर",
                                "nameEn": "Beebeepura"
                            },
                            {
                                "value": "150055",
                                "name": "बीरामऊ",
                                "nameEn": "Beeramaoo"
                            },
                            {
                                "value": "150236",
                                "name": "बूढ़नपुर",
                                "nameEn": "Boorhnapura"
                            },
                            {
                                "value": "149968",
                                "name": "बेदीपुर",
                                "nameEn": "Bedeepura"
                            },
                            {
                                "value": "149924",
                                "name": "बेरर्ा खानपुर",
                                "nameEn": "Berra Khanapura"
                            },
                            {
                                "value": "150175",
                                "name": "बेहटा",
                                "nameEn": "Behata"
                            },
                            {
                                "value": "149951",
                                "name": "बैडी अलीपुर",
                                "nameEn": "Baidee Aleepura"
                            },
                            {
                                "value": "150244",
                                "name": "बैदानी",
                                "nameEn": "Baidanee"
                            },
                            {
                                "value": "150096",
                                "name": "बैरी",
                                "nameEn": "Bairee"
                            },
                            {
                                "value": "150271",
                                "name": "बैसठी",
                                "nameEn": "Baisathee"
                            },
                            {
                                "value": "150157",
                                "name": "बोझा",
                                "nameEn": "Bojha"
                            },
                            {
                                "value": "149936",
                                "name": "बोहनार",
                                "nameEn": "Bohanara"
                            },
                            {
                                "value": "900903",
                                "name": "भगत सिंह नगर",
                                "nameEn": "Bhagata Sinha Nagara"
                            },
                            {
                                "value": "150247",
                                "name": "भगवन्तपुर",
                                "nameEn": "Bhagavntapura"
                            },
                            {
                                "value": "150103",
                                "name": "भटपुरा शिवरापुर",
                                "nameEn": "Bhatapura Shivarapura"
                            },
                            {
                                "value": "150143",
                                "name": "भटपुरा शिवली",
                                "nameEn": "Bhatapura Shivalee"
                            },
                            {
                                "value": "150243",
                                "name": "भवानीपुर",
                                "nameEn": "Bhavaneepura"
                            },
                            {
                                "value": "150224",
                                "name": "भाउपुर माधो सिंह",
                                "nameEn": "Bhaupura Madho Sinha"
                            },
                            {
                                "value": "150238",
                                "name": "भिखारीपुर",
                                "nameEn": "Bhikhareepura"
                            },
                            {
                                "value": "150194",
                                "name": "भिण्डुरी",
                                "nameEn": "Bhinduree"
                            },
                            {
                                "value": "150159",
                                "name": "भीटी",
                                "nameEn": "Bheetee"
                            },
                            {
                                "value": "149920",
                                "name": "भींटी हवेली",
                                "nameEn": "Bheentee Havelee"
                            },
                            {
                                "value": "150126",
                                "name": "भैसऊ",
                                "nameEn": "Bhaisaoo"
                            },
                            {
                                "value": "150110",
                                "name": "भौनतपुर",
                                "nameEn": "Bhaunatapura"
                            },
                            {
                                "value": "150154",
                                "name": "भौसाना",
                                "nameEn": "Bhausana"
                            },
                            {
                                "value": "149887",
                                "name": "मकनपुर",
                                "nameEn": "Makanapura"
                            },
                            {
                                "value": "150231",
                                "name": "मकरन्दपुर शिवराजपुर",
                                "nameEn": "Makarndapura Shivarajapura"
                            },
                            {
                                "value": "900922",
                                "name": "मक्खन सिंह नगर",
                                "nameEn": "Mkkhana Sinha Nagara"
                            },
                            {
                                "value": "149981",
                                "name": "मतलबपुर जुलहा",
                                "nameEn": "Matalabapura Julaha"
                            },
                            {
                                "value": "150099",
                                "name": "मदनेपुर",
                                "nameEn": "Madanepura"
                            },
                            {
                                "value": "149892",
                                "name": "मदारपुर",
                                "nameEn": "Madarapura"
                            },
                            {
                                "value": "149997",
                                "name": "मदाराराय गुमान",
                                "nameEn": "Madararaya Gumana"
                            },
                            {
                                "value": "150049",
                                "name": "मद्दूपुर",
                                "nameEn": "Mddoopura"
                            },
                            {
                                "value": "150034",
                                "name": "मनावाँ बिल्हौर",
                                "nameEn": "Manavan Bilhaura"
                            },
                            {
                                "value": "150156",
                                "name": "मनोह",
                                "nameEn": "Manoha"
                            },
                            {
                                "value": "150201",
                                "name": "मरखरा",
                                "nameEn": "Marakhara"
                            },
                            {
                                "value": "150152",
                                "name": "मरहमतनगर",
                                "nameEn": "Marahamatanagara"
                            },
                            {
                                "value": "150193",
                                "name": "मरियानी",
                                "nameEn": "Mariyanee"
                            },
                            {
                                "value": "149899",
                                "name": "महदेवा",
                                "nameEn": "Mahadeva"
                            },
                            {
                                "value": "150137",
                                "name": "महराजनगर",
                                "nameEn": "Maharajanagara"
                            },
                            {
                                "value": "150241",
                                "name": "महराजपुर",
                                "nameEn": "Maharajapura"
                            },
                            {
                                "value": "900895",
                                "name": "महात्मा गॉधी नगर",
                                "nameEn": "Mahatma Gaodhee Nagara"
                            },
                            {
                                "value": "900911",
                                "name": "महाराणा प्रताप नगर",
                                "nameEn": "Maharana Pratapa Nagara"
                            },
                            {
                                "value": "149941",
                                "name": "महिगवाँ",
                                "nameEn": "Mahigavan"
                            },
                            {
                                "value": "150095",
                                "name": "महिपालपुर",
                                "nameEn": "Mahipalapura"
                            },
                            {
                                "value": "150113",
                                "name": "मानपुर",
                                "nameEn": "Manapura"
                            },
                            {
                                "value": "150252",
                                "name": "मालौं",
                                "nameEn": "Malaun"
                            },
                            {
                                "value": "150256",
                                "name": "मितनपुर",
                                "nameEn": "Mitanapura"
                            },
                            {
                                "value": "150090",
                                "name": "मीरपुर बिलहन",
                                "nameEn": "Meerapura Bilahana"
                            },
                            {
                                "value": "900928",
                                "name": "मुख्तार अनीस नगर",
                                "nameEn": "Mukhtara Aneesa Nagara"
                            },
                            {
                                "value": "150093",
                                "name": "मुड़ेरी",
                                "nameEn": "Mureree"
                            },
                            {
                                "value": "900894",
                                "name": "मुनीश्वर अवस्थी नगर",
                                "nameEn": "Muneeshvara Avsthee Nagara"
                            },
                            {
                                "value": "150007",
                                "name": "मुनौवरपुर बिल्हौर",
                                "nameEn": "Munauvarapura Bilhaura"
                            },
                            {
                                "value": "150132",
                                "name": "मुश्ता",
                                "nameEn": "Mushta"
                            },
                            {
                                "value": "149958",
                                "name": "मुसाहेबपुर",
                                "nameEn": "Musahebapura"
                            },
                            {
                                "value": "150072",
                                "name": "मुंह पोछा",
                                "nameEn": "Munha Pochha"
                            },
                            {
                                "value": "149965",
                                "name": "मुहम्मदनगर चन्डारी",
                                "nameEn": "Muhmmadanagara Chndaree"
                            },
                            {
                                "value": "150024",
                                "name": "मुहम्मदपुर",
                                "nameEn": "Muhmmadapura"
                            },
                            {
                                "value": "149966",
                                "name": "मुहम्मदपुर उर्फ शिवदत्तपुर",
                                "nameEn": "Muhmmadapura Urpha Shivadttapura"
                            },
                            {
                                "value": "149962",
                                "name": "मुहीउद्दीनपुर",
                                "nameEn": "Muheeuddeenapura"
                            },
                            {
                                "value": "149921",
                                "name": "मेडुंवा",
                                "nameEn": "Medunva"
                            },
                            {
                                "value": "150005",
                                "name": "मैदौं",
                                "nameEn": "Maidaun"
                            },
                            {
                                "value": "150163",
                                "name": "मोड़हर",
                                "nameEn": "Morhara"
                            },
                            {
                                "value": "150009",
                                "name": "मौजमपुर",
                                "nameEn": "Maujamapura"
                            },
                            {
                                "value": "150115",
                                "name": "रतनपुर",
                                "nameEn": "Ratanapura"
                            },
                            {
                                "value": "220823",
                                "name": "रवाँलालपुर",
                                "nameEn": "Ravanlalapura"
                            },
                            {
                                "value": "149976",
                                "name": "रसूलपुर बिल्हौर",
                                "nameEn": "Rasoolapura Bilhaura"
                            },
                            {
                                "value": "149955",
                                "name": "रहमतपुर",
                                "nameEn": "Rahamatapura"
                            },
                            {
                                "value": "149942",
                                "name": "रहीमपुर करीमपुर",
                                "nameEn": "Raheemapura Kareemapura"
                            },
                            {
                                "value": "150006",
                                "name": "रहीमपुर विषधन",
                                "nameEn": "Raheemapura Vishadhana"
                            },
                            {
                                "value": "220824",
                                "name": "राजपुर",
                                "nameEn": "Rajapura"
                            },
                            {
                                "value": "150182",
                                "name": "राजारामपुर",
                                "nameEn": "Rajaramapura"
                            },
                            {
                                "value": "900914",
                                "name": "राजीव नगर",
                                "nameEn": "Rajeeva Nagara"
                            },
                            {
                                "value": "149967",
                                "name": "राजेपुर बिल्हौर",
                                "nameEn": "Rajepura Bilhaura"
                            },
                            {
                                "value": "150087",
                                "name": "राजेपुर शादीपुर",
                                "nameEn": "Rajepura Shadeepura"
                            },
                            {
                                "value": "149983",
                                "name": "राढ़ा",
                                "nameEn": "Rarha"
                            },
                            {
                                "value": "149987",
                                "name": "राधन",
                                "nameEn": "Radhana"
                            },
                            {
                                "value": "150044",
                                "name": "रानेपुर",
                                "nameEn": "Ranepura"
                            },
                            {
                                "value": "900924",
                                "name": "राम कृष्‍ण नगर",
                                "nameEn": "Rama Krishna Nagara"
                            },
                            {
                                "value": "150130",
                                "name": "रामनगर",
                                "nameEn": "Ramanagara"
                            },
                            {
                                "value": "150228",
                                "name": "रामपुर किशोरसिंह",
                                "nameEn": "Ramapura Kishorasinha"
                            },
                            {
                                "value": "150048",
                                "name": "रामपुर नरूवा",
                                "nameEn": "Ramapura Naroova"
                            },
                            {
                                "value": "149988",
                                "name": "रामपुर शिवराजपुर",
                                "nameEn": "Ramapura Shivarajapura"
                            },
                            {
                                "value": "150141",
                                "name": "रामपुर सखरेज",
                                "nameEn": "Ramapura Sakhareja"
                            },
                            {
                                "value": "150274",
                                "name": "रायगोपालपुर",
                                "nameEn": "Rayagopalapura"
                            },
                            {
                                "value": "149979",
                                "name": "रायपुर",
                                "nameEn": "Rayapura"
                            },
                            {
                                "value": "150052",
                                "name": "रायपुर नदिहा",
                                "nameEn": "Rayapura Nadiha"
                            },
                            {
                                "value": "150179",
                                "name": "रूद्रपुर बैल",
                                "nameEn": "Roodrapura Baila"
                            },
                            {
                                "value": "150277",
                                "name": "रूद्रापुर",
                                "nameEn": "Roodrapura"
                            },
                            {
                                "value": "149888",
                                "name": "रौगाँव",
                                "nameEn": "RauGanw"
                            },
                            {
                                "value": "150259",
                                "name": "रौतापुर कलां",
                                "nameEn": "Rautapura Kalan"
                            },
                            {
                                "value": "150129",
                                "name": "रौतापुर खुर्द",
                                "nameEn": "Rautapura Khurd"
                            },
                            {
                                "value": "150127",
                                "name": "र्इंधना",
                                "nameEn": "Rindhana"
                            },
                            {
                                "value": "900909",
                                "name": "लक्ष्मी बाई नगर",
                                "nameEn": "Laksh्mee Baee Nagara"
                            },
                            {
                                "value": "150246",
                                "name": "लछिमनपुर तिवारियान",
                                "nameEn": "Lachhimanapura Tivariyana"
                            },
                            {
                                "value": "149994",
                                "name": "लछिमनपुर मिश्रान",
                                "nameEn": "Lachhimanapura Mishrana"
                            },
                            {
                                "value": "149977",
                                "name": "लालपुर",
                                "nameEn": "Lalapura"
                            },
                            {
                                "value": "900915",
                                "name": "लाल बहादुर शास्त्री नगर",
                                "nameEn": "Lala Bahadura Shastree Nagara"
                            },
                            {
                                "value": "900912",
                                "name": "लोहिया नगर",
                                "nameEn": "Lohiya Nagara"
                            },
                            {
                                "value": "150205",
                                "name": "वदनपुर",
                                "nameEn": "Vadanapura"
                            },
                            {
                                "value": "220825",
                                "name": "वरर्ाजपुर",
                                "nameEn": "Varrajapura"
                            },
                            {
                                "value": "150147",
                                "name": "वाचीपुर",
                                "nameEn": "Vacheepura"
                            },
                            {
                                "value": "150220",
                                "name": "वाजीदपुर",
                                "nameEn": "Vajeedapura"
                            },
                            {
                                "value": "150158",
                                "name": "विकरू",
                                "nameEn": "Vikaroo"
                            },
                            {
                                "value": "900929",
                                "name": "विकास नगर",
                                "nameEn": "Vikasa Nagara"
                            },
                            {
                                "value": "150255",
                                "name": "विरोह",
                                "nameEn": "Viroha"
                            },
                            {
                                "value": "150232",
                                "name": "विशुनपुर",
                                "nameEn": "Vishunapura"
                            },
                            {
                                "value": "900925",
                                "name": "शहीद राजा सतीप्रसाद नगर",
                                "nameEn": "Shaheeda Raja Sateeprasada Nagara"
                            },
                            {
                                "value": "150281",
                                "name": "शादीपुर",
                                "nameEn": "Shadeepura"
                            },
                            {
                                "value": "150111",
                                "name": "शाहपुर कामा",
                                "nameEn": "Shahpur Kama"
                            },
                            {
                                "value": "150004",
                                "name": "शाहपुर दूलू",
                                "nameEn": "Shahpur Dooloo"
                            },
                            {
                                "value": "150188",
                                "name": "शाहपुर माल्हा",
                                "nameEn": "Shahpur Malha"
                            },
                            {
                                "value": "149957",
                                "name": "शाहमपुर कोट",
                                "nameEn": "Shahamapura Kota"
                            },
                            {
                                "value": "220826",
                                "name": "शाहमपुर पदुर्मन उर्फ गढ़ी",
                                "nameEn": "Shahamapura Padurmana Urpha Garhee"
                            },
                            {
                                "value": "149990",
                                "name": "शिवपुरी",
                                "nameEn": "Shivapuree"
                            },
                            {
                                "value": "220827",
                                "name": "शिवराजपुर",
                                "nameEn": "Shivarajapura"
                            },
                            {
                                "value": "150057",
                                "name": "शुक्लापुर",
                                "nameEn": "Shuklapura"
                            },
                            {
                                "value": "150270",
                                "name": "शेरपुर बैरा",
                                "nameEn": "Sherapura Baira"
                            },
                            {
                                "value": "149902",
                                "name": "शेषपुर धर्मशाला",
                                "nameEn": "Sheshapura Dhrmashala"
                            },
                            {
                                "value": "150138",
                                "name": "सकरवाँ",
                                "nameEn": "Sakaravan"
                            },
                            {
                                "value": "150146",
                                "name": "सखरेज",
                                "nameEn": "Sakhareja"
                            },
                            {
                                "value": "149929",
                                "name": "संजतीबादशाहपुर",
                                "nameEn": "SnjateebadaShahpur"
                            },
                            {
                                "value": "900920",
                                "name": "सत्य प्रकाश मालवीय नगर",
                                "nameEn": "Stya Prakasha Malaveeya Nagara"
                            },
                            {
                                "value": "150074",
                                "name": "सदिकामऊ",
                                "nameEn": "Sadikamaoo"
                            },
                            {
                                "value": "150245",
                                "name": "सन्डीला",
                                "nameEn": "Sndeela"
                            },
                            {
                                "value": "150097",
                                "name": "सबलपुर शिवराजपुर",
                                "nameEn": "Sabalapura Shivarajapura"
                            },
                            {
                                "value": "150189",
                                "name": "सम्भरपुर मिश्रान",
                                "nameEn": "Smbharapura Mishrana"
                            },
                            {
                                "value": "149934",
                                "name": "सम्भियापुर",
                                "nameEn": "Smbhiyapura"
                            },
                            {
                                "value": "900898",
                                "name": "सरदार पटेल नगर",
                                "nameEn": "Saradara Patela Nagara"
                            },
                            {
                                "value": "150263",
                                "name": "सरदारपुर",
                                "nameEn": "Saradarapura"
                            },
                            {
                                "value": "150082",
                                "name": "सरांय गंग",
                                "nameEn": "Saranya Gnga"
                            },
                            {
                                "value": "150254",
                                "name": "सरायछीतम",
                                "nameEn": "Sarayachheetama"
                            },
                            {
                                "value": "150045",
                                "name": "सरिगवां",
                                "nameEn": "Sarigavan"
                            },
                            {
                                "value": "149923",
                                "name": "सरैयाभूड़",
                                "nameEn": "Saraiyabhoor"
                            },
                            {
                                "value": "900907",
                                "name": "सरोजनी नायडू नगर",
                                "nameEn": "Sarojanee Nayadoo Nagara"
                            },
                            {
                                "value": "150217",
                                "name": "सलेमपुर बिठूर",
                                "nameEn": "Salemapura Bithoora"
                            },
                            {
                                "value": "150037",
                                "name": "सलेमपुर बिल्हौर",
                                "nameEn": "Salemapura Bilhaura"
                            },
                            {
                                "value": "150262",
                                "name": "सहज्योरा",
                                "nameEn": "Sahjyora"
                            },
                            {
                                "value": "150122",
                                "name": "सिकन्दरपुरशिवराजपुर",
                                "nameEn": "Sikndarapurashivarajapura"
                            },
                            {
                                "value": "149893",
                                "name": "सिघौंली",
                                "nameEn": "Sighaunlee"
                            },
                            {
                                "value": "150029",
                                "name": "सिहुरादाराशिकोह",
                                "nameEn": "Sihuradarashikoha"
                            },
                            {
                                "value": "150257",
                                "name": "सिहुरापुर",
                                "nameEn": "Sihurapura"
                            },
                            {
                                "value": "149993",
                                "name": "सिहुरामऊ",
                                "nameEn": "Sihuramaoo"
                            },
                            {
                                "value": "150064",
                                "name": "सुघरदेवा",
                                "nameEn": "Sugharadeva"
                            },
                            {
                                "value": "149999",
                                "name": "सुजावलपुर",
                                "nameEn": "Sujavalapura"
                            },
                            {
                                "value": "150139",
                                "name": "सुज्जापुर",
                                "nameEn": "Sujjapura"
                            },
                            {
                                "value": "150209",
                                "name": "सुनौढ़ा",
                                "nameEn": "Sunaurha"
                            },
                            {
                                "value": "149956",
                                "name": "सुभानपुर मुरादनगर",
                                "nameEn": "Subhanapura Muradanagara"
                            },
                            {
                                "value": "900923",
                                "name": "सुभाष नगर",
                                "nameEn": "Subhasha Nagara"
                            },
                            {
                                "value": "900917",
                                "name": "सुभाष नगर",
                                "nameEn": "Subhasha Nagara"
                            },
                            {
                                "value": "149978",
                                "name": "सैबसू",
                                "nameEn": "Saibasoo"
                            },
                            {
                                "value": "150063",
                                "name": "सैलहा",
                                "nameEn": "Sailaha"
                            },
                            {
                                "value": "150242",
                                "name": "हरदासपुर",
                                "nameEn": "Haradasapura"
                            },
                            {
                                "value": "150053",
                                "name": "हरनू",
                                "nameEn": "Haranoo"
                            },
                            {
                                "value": "149901",
                                "name": "हलपुरा",
                                "nameEn": "Halapura"
                            },
                            {
                                "value": "150266",
                                "name": "हंसपुर",
                                "nameEn": "Hnsapura"
                            },
                            {
                                "value": "149908",
                                "name": "हसौलीकाजीगंज",
                                "nameEn": "Hasauleekajeegnja"
                            },
                            {
                                "value": "150017",
                                "name": "हालामऊ",
                                "nameEn": "Halamaoo"
                            },
                            {
                                "value": "149916",
                                "name": "हासिमपुर",
                                "nameEn": "Hasimapura"
                            },
                            {
                                "value": "150116",
                                "name": "हिन्दूपुर",
                                "nameEn": "Hindoopura"
                            },
                            {
                                "value": "149895",
                                "name": "हिलालपुर",
                                "nameEn": "Hilalapura"
                            },
                            {
                                "value": "150249",
                                "name": "हृदयपुर मजरा गोगूमऊ",
                                "nameEn": "Hridayapura Majara Gogoomaoo"
                            }
                        ],
                        "213": [
                            {
                                "value": "150577",
                                "name": "अकबरपुर झवैया",
                                "nameEn": "Akbarpur Jhavaiya"
                            },
                            {
                                "value": "150854",
                                "name": "अकबरपुर बीरबल कछार",
                                "nameEn": "Akbarpur Beerabala Kachhara"
                            },
                            {
                                "value": "150855",
                                "name": "अकबरपुर बीरबल बॉगर",
                                "nameEn": "Akbarpur Beerabala Baogara"
                            },
                            {
                                "value": "150859",
                                "name": "अज्योरी",
                                "nameEn": "Ajyoree"
                            },
                            {
                                "value": "150875",
                                "name": "अनोइया",
                                "nameEn": "Anoiya"
                            },
                            {
                                "value": "150789",
                                "name": "अमिरतेपुर",
                                "nameEn": "Amiratepura"
                            },
                            {
                                "value": "150847",
                                "name": "अमौली",
                                "nameEn": "Amaulee"
                            },
                            {
                                "value": "150589",
                                "name": "अरखरी",
                                "nameEn": "Arakharee"
                            },
                            {
                                "value": "150825",
                                "name": "अलादाद पुर",
                                "nameEn": "Aladada Pur"
                            },
                            {
                                "value": "150866",
                                "name": "अलियापुर",
                                "nameEn": "Aliyapura"
                            },
                            {
                                "value": "900867",
                                "name": "अशोक नगर उत्तरी",
                                "nameEn": "Ashoka Nagara Uttaree"
                            },
                            {
                                "value": "900863",
                                "name": "अशोक नगर दक्षिणी",
                                "nameEn": "Ashoka Nagara Dakshinee"
                            },
                            {
                                "value": "150881",
                                "name": "असगहा",
                                "nameEn": "Asagaha"
                            },
                            {
                                "value": "150763",
                                "name": "असधना",
                                "nameEn": "Asadhana"
                            },
                            {
                                "value": "150586",
                                "name": "असवाकपुर",
                                "nameEn": "Asavakapura"
                            },
                            {
                                "value": "150893",
                                "name": "असवार मऊ",
                                "nameEn": "Asavara Maoo"
                            },
                            {
                                "value": "900866",
                                "name": "अाछीमोहाल पूर्वी",
                                "nameEn": "Aachheemohala Poorvee"
                            },
                            {
                                "value": "150585",
                                "name": "आगापुर",
                                "nameEn": "Aagapura"
                            },
                            {
                                "value": "900865",
                                "name": "आछी मोहाल उत्तरी",
                                "nameEn": "Aachhee Mohala Uttaree"
                            },
                            {
                                "value": "900873",
                                "name": "आछी मोहाल पश्चिमी",
                                "nameEn": "Aachhee Mohala Pshchimee"
                            },
                            {
                                "value": "150861",
                                "name": "आनूपुर",
                                "nameEn": "Aanoopura"
                            },
                            {
                                "value": "900881",
                                "name": "आशा नगर",
                                "nameEn": "Aasha Nagara"
                            },
                            {
                                "value": "150770",
                                "name": "इछौली",
                                "nameEn": "Ichhaulee"
                            },
                            {
                                "value": "150837",
                                "name": "इटौरा",
                                "nameEn": "Itaura"
                            },
                            {
                                "value": "150645",
                                "name": "इतर्रा",
                                "nameEn": "Itrra"
                            },
                            {
                                "value": "150773",
                                "name": "इस्माइलपुर कदीम",
                                "nameEn": "Ismailapura Kadeema"
                            },
                            {
                                "value": "150824",
                                "name": "इस्माइलपुर जदीद",
                                "nameEn": "Ismailapura Jadeeda"
                            },
                            {
                                "value": "150732",
                                "name": "उमरा",
                                "nameEn": "Umara"
                            },
                            {
                                "value": "150750",
                                "name": "ऐमनपुर",
                                "nameEn": "Aimanapura"
                            },
                            {
                                "value": "150637",
                                "name": "ऐमा रामसारी",
                                "nameEn": "Aima Ramasaree"
                            },
                            {
                                "value": "150642",
                                "name": "ओरिया",
                                "nameEn": "Oriya"
                            },
                            {
                                "value": "150618",
                                "name": "ककरहिया",
                                "nameEn": "Kakarahiya"
                            },
                            {
                                "value": "900882",
                                "name": "कजियाना",
                                "nameEn": "Kajiyana"
                            },
                            {
                                "value": "900880",
                                "name": "कटरा",
                                "nameEn": "Katara"
                            },
                            {
                                "value": "150820",
                                "name": "कटरा",
                                "nameEn": "Katara"
                            },
                            {
                                "value": "150791",
                                "name": "कटरी",
                                "nameEn": "Kataree"
                            },
                            {
                                "value": "150599",
                                "name": "कठेठा",
                                "nameEn": "Kathetha"
                            },
                            {
                                "value": "150884",
                                "name": "कंधौली",
                                "nameEn": "Kndhaulee"
                            },
                            {
                                "value": "150646",
                                "name": "कन्ठीपुर",
                                "nameEn": "Kntheepura"
                            },
                            {
                                "value": "150751",
                                "name": "कमालपुर",
                                "nameEn": "Kamalapura"
                            },
                            {
                                "value": "150790",
                                "name": "काटर",
                                "nameEn": "Katara"
                            },
                            {
                                "value": "900884",
                                "name": "काेटद्वार",
                                "nameEn": "Kaetdvara"
                            },
                            {
                                "value": "150849",
                                "name": "किरार",
                                "nameEn": "Kirara"
                            },
                            {
                                "value": "150794",
                                "name": "किरॉव",
                                "nameEn": "Kiraova"
                            },
                            {
                                "value": "220807",
                                "name": "कुतुबुद्दीनपुर",
                                "nameEn": "Kutubuddeenapura"
                            },
                            {
                                "value": "150762",
                                "name": "कुमखरा",
                                "nameEn": "Kumakhara"
                            },
                            {
                                "value": "150640",
                                "name": "कुम्हेडि़या",
                                "nameEn": "Kumhediya"
                            },
                            {
                                "value": "150838",
                                "name": "कुरसेड़ा",
                                "nameEn": "Kurasera"
                            },
                            {
                                "value": "150612",
                                "name": "कुँवरपुर",
                                "nameEn": "Kunvarapura"
                            },
                            {
                                "value": "150752",
                                "name": "कुवा खेडा",
                                "nameEn": "Kuva Kheda"
                            },
                            {
                                "value": "900870",
                                "name": "कुष्माण्डा नगर",
                                "nameEn": "Kushmanda Nagara"
                            },
                            {
                                "value": "900879",
                                "name": "कृष्णा नगर",
                                "nameEn": "Krishna Nagara"
                            },
                            {
                                "value": "150625",
                                "name": "केवडि़या",
                                "nameEn": "Kevadiya"
                            },
                            {
                                "value": "150747",
                                "name": "कैथा",
                                "nameEn": "Kaitha"
                            },
                            {
                                "value": "221517",
                                "name": "कोटरा",
                                "nameEn": "Kotara"
                            },
                            {
                                "value": "220411",
                                "name": "कोरिया पश्चिमी",
                                "nameEn": "Koriya Pshchimee"
                            },
                            {
                                "value": "220410",
                                "name": "कोरिया पूर्वी",
                                "nameEn": "Koriya Poorvee"
                            },
                            {
                                "value": "150788",
                                "name": "कोरौ",
                                "nameEn": "Korau"
                            },
                            {
                                "value": "150851",
                                "name": "कोहरा",
                                "nameEn": "Kohara"
                            },
                            {
                                "value": "150784",
                                "name": "खीरियाँ",
                                "nameEn": "Kheeriyan"
                            },
                            {
                                "value": "150592",
                                "name": "खेमपुर",
                                "nameEn": "Khemapura"
                            },
                            {
                                "value": "150604",
                                "name": "गढ.वा",
                                "nameEn": "Gadha.va"
                            },
                            {
                                "value": "150785",
                                "name": "गढोलामऊ",
                                "nameEn": "Gadholamaoo"
                            },
                            {
                                "value": "150792",
                                "name": "गराथा",
                                "nameEn": "Garatha"
                            },
                            {
                                "value": "900860",
                                "name": "गांधीनगर",
                                "nameEn": "Gandheenagara"
                            },
                            {
                                "value": "150576",
                                "name": "गिरसी",
                                "nameEn": "Girasee"
                            },
                            {
                                "value": "150823",
                                "name": "गुच्चूपुर",
                                "nameEn": "Guchchoopura"
                            },
                            {
                                "value": "150841",
                                "name": "गुजेला",
                                "nameEn": "Gujela"
                            },
                            {
                                "value": "900885",
                                "name": "गूच्चूपुर",
                                "nameEn": "Goochchoopura"
                            },
                            {
                                "value": "150748",
                                "name": "गूजा",
                                "nameEn": "Gooja"
                            },
                            {
                                "value": "150830",
                                "name": "गोपालपुर घाटमपुर",
                                "nameEn": "Gopalapura Ghatamapura"
                            },
                            {
                                "value": "150583",
                                "name": "गौरा",
                                "nameEn": "Gaura"
                            },
                            {
                                "value": "150857",
                                "name": "गौरा छजमल",
                                "nameEn": "Gaura Chhajamala"
                            },
                            {
                                "value": "150877",
                                "name": "गौरीघाटमपुर",
                                "nameEn": "Gaureeghatamapura"
                            },
                            {
                                "value": "220405",
                                "name": "घाटमपुर देहात",
                                "nameEn": "Ghatamapura Dehata"
                            },
                            {
                                "value": "220406",
                                "name": "घाटमपुर शहरी क्षेत्र",
                                "nameEn": "Ghatamapura Shaharee Kshetr"
                            },
                            {
                                "value": "150783",
                                "name": "घुघुवा",
                                "nameEn": "Ghughuva"
                            },
                            {
                                "value": "150843",
                                "name": "चक आदम",
                                "nameEn": "Chak Aadama"
                            },
                            {
                                "value": "150754",
                                "name": "चक कासिमपुर",
                                "nameEn": "Chak Kasimapura"
                            },
                            {
                                "value": "150620",
                                "name": "चकदरगाही",
                                "nameEn": "Chakdaragahee"
                            },
                            {
                                "value": "150821",
                                "name": "चकबीरपुर",
                                "nameEn": "Chakbeerapura"
                            },
                            {
                                "value": "150742",
                                "name": "चक सीहूपुर",
                                "nameEn": "Chak Seehoopura"
                            },
                            {
                                "value": "150623",
                                "name": "चतुरीपुर",
                                "nameEn": "Chatureepura"
                            },
                            {
                                "value": "150766",
                                "name": "चतुरीपुरवा",
                                "nameEn": "Chatureepurava"
                            },
                            {
                                "value": "150760",
                                "name": "चपरेहटा",
                                "nameEn": "Chaparehata"
                            },
                            {
                                "value": "150605",
                                "name": "चंवर",
                                "nameEn": "Chnvara"
                            },
                            {
                                "value": "150874",
                                "name": "चितौली",
                                "nameEn": "Chitaulee"
                            },
                            {
                                "value": "150806",
                                "name": "चिल्ली",
                                "nameEn": "Chillee"
                            },
                            {
                                "value": "150804",
                                "name": "चौबेपुर",
                                "nameEn": "Chaubepura"
                            },
                            {
                                "value": "150619",
                                "name": "छापा",
                                "nameEn": "Chhapa"
                            },
                            {
                                "value": "150636",
                                "name": "छॉजा",
                                "nameEn": "Chhaoja"
                            },
                            {
                                "value": "150818",
                                "name": "जलाला",
                                "nameEn": "Jalala"
                            },
                            {
                                "value": "150868",
                                "name": "जल्ला",
                                "nameEn": "Jlla"
                            },
                            {
                                "value": "900878",
                                "name": "जवाहर नगर उत्तरी",
                                "nameEn": "Javahara Nagara Uttaree"
                            },
                            {
                                "value": "900864",
                                "name": "जवाहर नगर पश्चिमी",
                                "nameEn": "Javahara Nagara Pshchimee"
                            },
                            {
                                "value": "900861",
                                "name": "जवाहरनगर पूर्वी द्वतीय",
                                "nameEn": "Javaharanagara Poorvee Dvateeya"
                            },
                            {
                                "value": "900871",
                                "name": "जवाहर नगर पूर्वी प्रथम",
                                "nameEn": "Javahara Nagara Poorvee Prathama"
                            },
                            {
                                "value": "150627",
                                "name": "जहाँगीराबाद",
                                "nameEn": "Jahangeerabada"
                            },
                            {
                                "value": "150826",
                                "name": "जाजपुर",
                                "nameEn": "Jajapura"
                            },
                            {
                                "value": "150803",
                                "name": "जुरैंया",
                                "nameEn": "Jurainya"
                            },
                            {
                                "value": "150828",
                                "name": "जैतीपुर",
                                "nameEn": "Jaiteepura"
                            },
                            {
                                "value": "150800",
                                "name": "टिकरी गौरवा कछार",
                                "nameEn": "Tikaree Gaurava Kachhara"
                            },
                            {
                                "value": "150801",
                                "name": "टिकरी गौरवा बॉगर",
                                "nameEn": "Tikaree Gaurava Baogara"
                            },
                            {
                                "value": "150869",
                                "name": "टिकवॉपुर",
                                "nameEn": "Tikavaopura"
                            },
                            {
                                "value": "150769",
                                "name": "डोभा",
                                "nameEn": "Dobha"
                            },
                            {
                                "value": "150848",
                                "name": "डोहरू",
                                "nameEn": "Doharoo"
                            },
                            {
                                "value": "150777",
                                "name": "तहरापुर",
                                "nameEn": "Taharapura"
                            },
                            {
                                "value": "150609",
                                "name": "तारगांव घाटमपुर",
                                "nameEn": "TaraGanw Ghatamapura"
                            },
                            {
                                "value": "150611",
                                "name": "तिलसड़ा",
                                "nameEn": "Tilasara"
                            },
                            {
                                "value": "150816",
                                "name": "तिलहली",
                                "nameEn": "Tilahalee"
                            },
                            {
                                "value": "150613",
                                "name": "तेजपुर",
                                "nameEn": "Tejapura"
                            },
                            {
                                "value": "150596",
                                "name": "दतारी",
                                "nameEn": "Dataree"
                            },
                            {
                                "value": "150582",
                                "name": "दलई का पुरवा",
                                "nameEn": "Dalaee Ka Purava"
                            },
                            {
                                "value": "150865",
                                "name": "दहिलर अव्वल",
                                "nameEn": "Dahilara Avvala"
                            },
                            {
                                "value": "150864",
                                "name": "दहिलर सानी",
                                "nameEn": "Dahilara Sanee"
                            },
                            {
                                "value": "150580",
                                "name": "दहेली",
                                "nameEn": "Dahelee"
                            },
                            {
                                "value": "150597",
                                "name": "दिवली",
                                "nameEn": "Divalee"
                            },
                            {
                                "value": "150578",
                                "name": "दुरौली",
                                "nameEn": "Duraulee"
                            },
                            {
                                "value": "150641",
                                "name": "देवरा",
                                "nameEn": "Devara"
                            },
                            {
                                "value": "150797",
                                "name": "दौलतपुर घाटमपुर",
                                "nameEn": "Daulatapura Ghatamapura"
                            },
                            {
                                "value": "150764",
                                "name": "धमना बुजुर्ग",
                                "nameEn": "Dhamana Bujurga"
                            },
                            {
                                "value": "150885",
                                "name": "धरछुआ",
                                "nameEn": "Dharachhuaa"
                            },
                            {
                                "value": "150867",
                                "name": "धरमंगदपुर",
                                "nameEn": "Dharamngadapura"
                            },
                            {
                                "value": "150630",
                                "name": "धरमपुर घाटमपुर",
                                "nameEn": "Dharamapura Ghatamapura"
                            },
                            {
                                "value": "150871",
                                "name": "धीरपुर",
                                "nameEn": "Dheerapura"
                            },
                            {
                                "value": "220808",
                                "name": "धुरऊपुर",
                                "nameEn": "Dhuraoopura"
                            },
                            {
                                "value": "150608",
                                "name": "नन्दना",
                                "nameEn": "Nndana"
                            },
                            {
                                "value": "150622",
                                "name": "नरसिंहपुर",
                                "nameEn": "Narasinhapura"
                            },
                            {
                                "value": "150839",
                                "name": "नरायनपुर घाटमपुर",
                                "nameEn": "Narayanapura Ghatamapura"
                            },
                            {
                                "value": "150755",
                                "name": "नवही",
                                "nameEn": "Navahee"
                            },
                            {
                                "value": "220809",
                                "name": "नवेड़ी",
                                "nameEn": "Naveree"
                            },
                            {
                                "value": "150815",
                                "name": "निमधा",
                                "nameEn": "Nimadha"
                            },
                            {
                                "value": "150796",
                                "name": "निहुरा",
                                "nameEn": "Nihura"
                            },
                            {
                                "value": "900859",
                                "name": "नौबस्ता पश्‍चिमी",
                                "nameEn": "Naubsta Pshchimee"
                            },
                            {
                                "value": "900876",
                                "name": "नौबस्ता पूर्वी",
                                "nameEn": "Naubsta Poorvee"
                            },
                            {
                                "value": "150745",
                                "name": "नौरंगा",
                                "nameEn": "Naurnga"
                            },
                            {
                                "value": "900869",
                                "name": "पचखुरा",
                                "nameEn": "Pachakhura"
                            },
                            {
                                "value": "150761",
                                "name": "पचखुरा",
                                "nameEn": "Pachakhura"
                            },
                            {
                                "value": "150882",
                                "name": "पड़री गंगादीन",
                                "nameEn": "Parree Gngadeena"
                            },
                            {
                                "value": "150631",
                                "name": "पडरी लालपुर",
                                "nameEn": "Padaree Lalapura"
                            },
                            {
                                "value": "150598",
                                "name": "पतरसा",
                                "nameEn": "Patarasa"
                            },
                            {
                                "value": "150624",
                                "name": "पतारा",
                                "nameEn": "Patara"
                            },
                            {
                                "value": "150735",
                                "name": "पतारी",
                                "nameEn": "Pataree"
                            },
                            {
                                "value": "220413",
                                "name": "परास द्वितीय खंड",
                                "nameEn": "Parasa Dviteeya Khnda"
                            },
                            {
                                "value": "220412",
                                "name": "परास प्रथम खंड",
                                "nameEn": "Parasa Prathama Khnda"
                            },
                            {
                                "value": "150829",
                                "name": "पल्टूपुर",
                                "nameEn": "Pltoopura"
                            },
                            {
                                "value": "150727",
                                "name": "पसेमा",
                                "nameEn": "Pasema"
                            },
                            {
                                "value": "150647",
                                "name": "पहेवा",
                                "nameEn": "Paheva"
                            },
                            {
                                "value": "150811",
                                "name": "पाराचांद",
                                "nameEn": "Parachanda"
                            },
                            {
                                "value": "150591",
                                "name": "पाराराइब",
                                "nameEn": "Pararaiba"
                            },
                            {
                                "value": "150728",
                                "name": "पासीखेडा",
                                "nameEn": "Paseekheda"
                            },
                            {
                                "value": "150832",
                                "name": "फत्तेपुर",
                                "nameEn": "Phttepura"
                            },
                            {
                                "value": "150786",
                                "name": "बक्सरा",
                                "nameEn": "Bksara"
                            },
                            {
                                "value": "150890",
                                "name": "बगरिया",
                                "nameEn": "Bagariya"
                            },
                            {
                                "value": "150787",
                                "name": "बदलेसिमनापुर",
                                "nameEn": "Badalesimanapura"
                            },
                            {
                                "value": "150607",
                                "name": "बम्बुराहा",
                                "nameEn": "Bmburaha"
                            },
                            {
                                "value": "150853",
                                "name": "बम्हनटिकरी",
                                "nameEn": "Bmhanatikaree"
                            },
                            {
                                "value": "150644",
                                "name": "बम्हौरा",
                                "nameEn": "Bmhaura"
                            },
                            {
                                "value": "150872",
                                "name": "बम्हौरी",
                                "nameEn": "Bmhauree"
                            },
                            {
                                "value": "150610",
                                "name": "बरनॉव",
                                "nameEn": "Baranaova"
                            },
                            {
                                "value": "150880",
                                "name": "बरीपाल",
                                "nameEn": "Bareepala"
                            },
                            {
                                "value": "150756",
                                "name": "बरी महतैन",
                                "nameEn": "Baree Mahataina"
                            },
                            {
                                "value": "150600",
                                "name": "बरौली",
                                "nameEn": "Baraulee"
                            },
                            {
                                "value": "150617",
                                "name": "बलरामपुर",
                                "nameEn": "Balaramapura"
                            },
                            {
                                "value": "150614",
                                "name": "बलहापाराकलाँ",
                                "nameEn": "Balahaparakalan"
                            },
                            {
                                "value": "150615",
                                "name": "बलहापारा खुर्द",
                                "nameEn": "Balahapara Khurd"
                            },
                            {
                                "value": "900868",
                                "name": "बसन्त विहार",
                                "nameEn": "Basnta Vihara"
                            },
                            {
                                "value": "150768",
                                "name": "बसौरा",
                                "nameEn": "Basaura"
                            },
                            {
                                "value": "150850",
                                "name": "बहरौली",
                                "nameEn": "Baharaulee"
                            },
                            {
                                "value": "150887",
                                "name": "बांध",
                                "nameEn": "Bandha"
                            },
                            {
                                "value": "150584",
                                "name": "बारा दौलतपुर",
                                "nameEn": "Bara Daulatapura"
                            },
                            {
                                "value": "150876",
                                "name": "बावन",
                                "nameEn": "Bavana"
                            },
                            {
                                "value": "150878",
                                "name": "बिरिया",
                                "nameEn": "Biriya"
                            },
                            {
                                "value": "150873",
                                "name": "बिलगवाँ",
                                "nameEn": "Bilagavan"
                            },
                            {
                                "value": "150775",
                                "name": "बीछीपुर",
                                "nameEn": "Beechheepura"
                            },
                            {
                                "value": "150862",
                                "name": "बीबीपुर",
                                "nameEn": "Beebeepura"
                            },
                            {
                                "value": "150822",
                                "name": "बीरपुर",
                                "nameEn": "Beerapura"
                            },
                            {
                                "value": "150739",
                                "name": "बीहूपुर",
                                "nameEn": "Beehoopura"
                            },
                            {
                                "value": "220810",
                                "name": "बुढ़ानपुर",
                                "nameEn": "Burhanapura"
                            },
                            {
                                "value": "150808",
                                "name": "बेंन्दा",
                                "nameEn": "Bennda"
                            },
                            {
                                "value": "150603",
                                "name": "बेहुँटा",
                                "nameEn": "Behunta"
                            },
                            {
                                "value": "150753",
                                "name": "बैरीपुर",
                                "nameEn": "Baireepura"
                            },
                            {
                                "value": "150835",
                                "name": "भटपुरवा",
                                "nameEn": "Bhatapurava"
                            },
                            {
                                "value": "150819",
                                "name": "भदरस",
                                "nameEn": "Bhadarasa"
                            },
                            {
                                "value": "150746",
                                "name": "भदवारा",
                                "nameEn": "Bhadavara"
                            },
                            {
                                "value": "150635",
                                "name": "भदेवना",
                                "nameEn": "Bhadevana"
                            },
                            {
                                "value": "150858",
                                "name": "मऊनखत",
                                "nameEn": "Maoonakhata"
                            },
                            {
                                "value": "150798",
                                "name": "मकरंदपुर बांगर",
                                "nameEn": "Makarndapura Bangara"
                            },
                            {
                                "value": "150799",
                                "name": "मकरन्दपुर कछार",
                                "nameEn": "Makarndapura Kachhara"
                            },
                            {
                                "value": "150771",
                                "name": "मखौली",
                                "nameEn": "Makhaulee"
                            },
                            {
                                "value": "150581",
                                "name": "मछैला",
                                "nameEn": "Machhaila"
                            },
                            {
                                "value": "150802",
                                "name": "मढ.ा",
                                "nameEn": "Madha.a"
                            },
                            {
                                "value": "150776",
                                "name": "मदनपुर",
                                "nameEn": "Madanapura"
                            },
                            {
                                "value": "150879",
                                "name": "मदुरी",
                                "nameEn": "Maduree"
                            },
                            {
                                "value": "150767",
                                "name": "मनिहारपुर",
                                "nameEn": "Maniharapura"
                            },
                            {
                                "value": "150852",
                                "name": "मया का पुरवा",
                                "nameEn": "Maya Ka Purava"
                            },
                            {
                                "value": "150827",
                                "name": "मवई भच्छन",
                                "nameEn": "Mavaee Bhchchhana"
                            },
                            {
                                "value": "150774",
                                "name": "मवई माधौ",
                                "nameEn": "Mavaee Madhau"
                            },
                            {
                                "value": "150639",
                                "name": "मिजर्ापुर",
                                "nameEn": "Mijrapura"
                            },
                            {
                                "value": "150606",
                                "name": "मिरानपुर",
                                "nameEn": "Miranapura"
                            },
                            {
                                "value": "150741",
                                "name": "मिलकिनपुर",
                                "nameEn": "Milakinapura"
                            },
                            {
                                "value": "150795",
                                "name": "मुइय्या",
                                "nameEn": "Muiyya"
                            },
                            {
                                "value": "150810",
                                "name": "मुस्तफाबाद",
                                "nameEn": "Mustaphabada"
                            },
                            {
                                "value": "150757",
                                "name": "मुहम्मदपुर घाटमपुर",
                                "nameEn": "Muhmmadapura Ghatamapura"
                            },
                            {
                                "value": "150587",
                                "name": "मूसेपुर",
                                "nameEn": "Moosepura"
                            },
                            {
                                "value": "150833",
                                "name": "मेहरअलीपुर",
                                "nameEn": "Meharaaleepura"
                            },
                            {
                                "value": "150886",
                                "name": "मैधरी",
                                "nameEn": "Maidharee"
                            },
                            {
                                "value": "150602",
                                "name": "मोतीपुर",
                                "nameEn": "Moteepura"
                            },
                            {
                                "value": "150889",
                                "name": "मोहटा",
                                "nameEn": "Mohata"
                            },
                            {
                                "value": "150738",
                                "name": "रक्शा",
                                "nameEn": "Rksha"
                            },
                            {
                                "value": "220811",
                                "name": "रठिगाँव",
                                "nameEn": "RathiGanw"
                            },
                            {
                                "value": "150842",
                                "name": "रडौली",
                                "nameEn": "Radaulee"
                            },
                            {
                                "value": "150616",
                                "name": "रतनपुर",
                                "nameEn": "Ratanapura"
                            },
                            {
                                "value": "150781",
                                "name": "रहती एमा",
                                "nameEn": "Rahatee Ema"
                            },
                            {
                                "value": "150779",
                                "name": "रहती खालसा",
                                "nameEn": "Rahatee Khalasa"
                            },
                            {
                                "value": "150888",
                                "name": "रामपुर",
                                "nameEn": "Ramapura"
                            },
                            {
                                "value": "150812",
                                "name": "रामपुर निहुरा",
                                "nameEn": "Ramapura Nihura"
                            },
                            {
                                "value": "150638",
                                "name": "रामसारी",
                                "nameEn": "Ramasaree"
                            },
                            {
                                "value": "150629",
                                "name": "रायपुर",
                                "nameEn": "Rayapura"
                            },
                            {
                                "value": "150737",
                                "name": "रार",
                                "nameEn": "Rara"
                            },
                            {
                                "value": "150807",
                                "name": "राहा",
                                "nameEn": "Raha"
                            },
                            {
                                "value": "150772",
                                "name": "रेवना",
                                "nameEn": "Revana"
                            },
                            {
                                "value": "150844",
                                "name": "रैपुरा",
                                "nameEn": "Raipura"
                            },
                            {
                                "value": "220813",
                                "name": "लहुरीमऊ कासिमपुर",
                                "nameEn": "Lahureemaoo Kasimapura"
                            },
                            {
                                "value": "150817",
                                "name": "लौकहा",
                                "nameEn": "Laukaha"
                            },
                            {
                                "value": "150758",
                                "name": "लौली",
                                "nameEn": "Laulee"
                            },
                            {
                                "value": "220814",
                                "name": "वनहरी",
                                "nameEn": "Vanaharee"
                            },
                            {
                                "value": "900862",
                                "name": "शास्त्री नगर",
                                "nameEn": "Shastree Nagara"
                            },
                            {
                                "value": "900877",
                                "name": "शिवपुरी पश्चिमी",
                                "nameEn": "Shivapuree Pshchimee"
                            },
                            {
                                "value": "900874",
                                "name": "शिवपुरी पूर्वी",
                                "nameEn": "Shivapuree Poorvee"
                            },
                            {
                                "value": "150834",
                                "name": "शेखपुर",
                                "nameEn": "Shekhapura"
                            },
                            {
                                "value": "900872",
                                "name": "शेखवाडा",
                                "nameEn": "Shekhavada"
                            },
                            {
                                "value": "150782",
                                "name": "श्रीनगर",
                                "nameEn": "Shreenagara"
                            },
                            {
                                "value": "150621",
                                "name": "संचितपुर",
                                "nameEn": "Snchitapura"
                            },
                            {
                                "value": "150870",
                                "name": "सजेती",
                                "nameEn": "Sajetee"
                            },
                            {
                                "value": "150736",
                                "name": "सण्डौली",
                                "nameEn": "Sndaulee"
                            },
                            {
                                "value": "150632",
                                "name": "सतरहुली",
                                "nameEn": "Satarahulee"
                            },
                            {
                                "value": "150894",
                                "name": "समुही",
                                "nameEn": "Samuhee"
                            },
                            {
                                "value": "150595",
                                "name": "सरखेलपुर",
                                "nameEn": "Sarakhelapura"
                            },
                            {
                                "value": "150590",
                                "name": "सरगवाँ",
                                "nameEn": "Saragavan"
                            },
                            {
                                "value": "150845",
                                "name": "सरगाँव",
                                "nameEn": "SaraGanw"
                            },
                            {
                                "value": "150633",
                                "name": "सरांय",
                                "nameEn": "Saranya"
                            },
                            {
                                "value": "150780",
                                "name": "सरैंया",
                                "nameEn": "Sarainya"
                            },
                            {
                                "value": "150778",
                                "name": "साखा जनवारा",
                                "nameEn": "Sakha Janavara"
                            },
                            {
                                "value": "150759",
                                "name": "साखाहारी",
                                "nameEn": "Sakhaharee"
                            },
                            {
                                "value": "150720",
                                "name": "सिकहुला",
                                "nameEn": "Sikahula"
                            },
                            {
                                "value": "150891",
                                "name": "सिधौल",
                                "nameEn": "Sidhaula"
                            },
                            {
                                "value": "150594",
                                "name": "सिमौर",
                                "nameEn": "Simaura"
                            },
                            {
                                "value": "150883",
                                "name": "सिरसा",
                                "nameEn": "Sirasa"
                            },
                            {
                                "value": "150626",
                                "name": "सिरोमनपुर",
                                "nameEn": "Siromanapura"
                            },
                            {
                                "value": "150634",
                                "name": "सिरोह",
                                "nameEn": "Siroha"
                            },
                            {
                                "value": "150593",
                                "name": "सिल्हौली",
                                "nameEn": "Silhaulee"
                            },
                            {
                                "value": "900886",
                                "name": "सिहारी",
                                "nameEn": "Siharee"
                            },
                            {
                                "value": "220407",
                                "name": "सिहारी देहात क्षेत्र",
                                "nameEn": "Siharee Dehata Kshetr"
                            },
                            {
                                "value": "220408",
                                "name": "सिहारी नगर क्षे",
                                "nameEn": "Siharee Nagara Kshe"
                            },
                            {
                                "value": "150743",
                                "name": "सीहूपुर",
                                "nameEn": "Seehoopura"
                            },
                            {
                                "value": "150814",
                                "name": "सूखापुर",
                                "nameEn": "Sookhapura"
                            },
                            {
                                "value": "150601",
                                "name": "स्योढ़ारी",
                                "nameEn": "Syorharee"
                            },
                            {
                                "value": "150840",
                                "name": "स्योदी ललईपुर",
                                "nameEn": "Syodee Lalaeepura"
                            },
                            {
                                "value": "150813",
                                "name": "हथेरुवा",
                                "nameEn": "Hatheruva"
                            },
                            {
                                "value": "150588",
                                "name": "हथेही",
                                "nameEn": "Hathehee"
                            },
                            {
                                "value": "150860",
                                "name": "हमिरामऊ",
                                "nameEn": "Hamiramaoo"
                            },
                            {
                                "value": "150863",
                                "name": "हरदौली",
                                "nameEn": "Haradaulee"
                            },
                            {
                                "value": "150765",
                                "name": "हरवसपुर",
                                "nameEn": "Haravasapura"
                            },
                            {
                                "value": "900883",
                                "name": "हाफिजपुर",
                                "nameEn": "Haphijapura"
                            },
                            {
                                "value": "150628",
                                "name": "हिरनी",
                                "nameEn": "Hiranee"
                            },
                            {
                                "value": "150740",
                                "name": "हुसेना",
                                "nameEn": "Husena"
                            }
                        ],
                        "370": [
                            {
                                "value": "150707",
                                "name": "अकबरपुर बरुई",
                                "nameEn": "Akbarpur Baruee"
                            },
                            {
                                "value": "150564",
                                "name": "अखरी",
                                "nameEn": "Akharee"
                            },
                            {
                                "value": "150500",
                                "name": "अमौली",
                                "nameEn": "Amaulee"
                            },
                            {
                                "value": "150699",
                                "name": "अरंज बनकट",
                                "nameEn": "Arnja Banakata"
                            },
                            {
                                "value": "150704",
                                "name": "अरंजराम",
                                "nameEn": "Arnjarama"
                            },
                            {
                                "value": "150703",
                                "name": "अरंजराय",
                                "nameEn": "Arnjaraya"
                            },
                            {
                                "value": "150700",
                                "name": "अरंजहामी",
                                "nameEn": "Arnjahamee"
                            },
                            {
                                "value": "150716",
                                "name": "असेनियाँ",
                                "nameEn": "Aseniyan"
                            },
                            {
                                "value": "150680",
                                "name": "ईटारोरा",
                                "nameEn": "Eetarora"
                            },
                            {
                                "value": "150469",
                                "name": "ईश्वरी खेडा",
                                "nameEn": "Eeshvaree Kheda"
                            },
                            {
                                "value": "220302",
                                "name": "उचटी",
                                "nameEn": "Uchatee"
                            },
                            {
                                "value": "150730",
                                "name": "उदईपुर",
                                "nameEn": "Udaeepura"
                            },
                            {
                                "value": "150514",
                                "name": "उमरना",
                                "nameEn": "Umarana"
                            },
                            {
                                "value": "150734",
                                "name": "उमरी",
                                "nameEn": "Umaree"
                            },
                            {
                                "value": "150494",
                                "name": "ऐमा",
                                "nameEn": "Aima"
                            },
                            {
                                "value": "150472",
                                "name": "ककराली",
                                "nameEn": "Kakaralee"
                            },
                            {
                                "value": "150516",
                                "name": "कटरी उमरना",
                                "nameEn": "Kataree Umarana"
                            },
                            {
                                "value": "150509",
                                "name": "कटरी जमदा",
                                "nameEn": "Kataree Jamada"
                            },
                            {
                                "value": "150533",
                                "name": "कटरी डोमनपुर",
                                "nameEn": "Kataree Domanapura"
                            },
                            {
                                "value": "150495",
                                "name": "कटरी ढोढीं",
                                "nameEn": "Kataree Dhodheen"
                            },
                            {
                                "value": "150519",
                                "name": "कटरी नरायनपुर",
                                "nameEn": "Kataree Narayanapura"
                            },
                            {
                                "value": "150530",
                                "name": "कटरी नागापुर",
                                "nameEn": "Kataree Nagapura"
                            },
                            {
                                "value": "150522",
                                "name": "कटरी बगहा",
                                "nameEn": "Kataree Bagaha"
                            },
                            {
                                "value": "150508",
                                "name": "कटरी भिटारा",
                                "nameEn": "Kataree Bhitara"
                            },
                            {
                                "value": "150515",
                                "name": "कटरी राजापुर",
                                "nameEn": "Kataree Rajapura"
                            },
                            {
                                "value": "150523",
                                "name": "कटरी विपौसी",
                                "nameEn": "Kataree Vipausee"
                            },
                            {
                                "value": "150518",
                                "name": "कटरी सफीपुर नर्वल",
                                "nameEn": "Kataree Sapheepura Nrvala"
                            },
                            {
                                "value": "150510",
                                "name": "कटरी सैदलीपुर",
                                "nameEn": "Kataree Saidaleepura"
                            },
                            {
                                "value": "150441",
                                "name": "कठोंगर",
                                "nameEn": "Kathongara"
                            },
                            {
                                "value": "220806",
                                "name": "कन्हरा",
                                "nameEn": "Knhara"
                            },
                            {
                                "value": "150525",
                                "name": "कमालपुर नर्वल",
                                "nameEn": "Kamalapura Nrvala"
                            },
                            {
                                "value": "150682",
                                "name": "करचुलीपुर",
                                "nameEn": "Karachuleepura"
                            },
                            {
                                "value": "150493",
                                "name": "करबी गाँव सलेमपुर",
                                "nameEn": "Karabee Ganw Salemapura"
                            },
                            {
                                "value": "150570",
                                "name": "करविगवाँ साढ़",
                                "nameEn": "Karavigavan Sarh"
                            },
                            {
                                "value": "150660",
                                "name": "कलेका पुरवा",
                                "nameEn": "Kaleka Purava"
                            },
                            {
                                "value": "150443",
                                "name": "कसिगवाँ",
                                "nameEn": "Kasigavan"
                            },
                            {
                                "value": "150664",
                                "name": "काजीखेड़ा",
                                "nameEn": "Kajeekhera"
                            },
                            {
                                "value": "150697",
                                "name": "कीसाखेडा",
                                "nameEn": "Keesakheda"
                            },
                            {
                                "value": "150665",
                                "name": "कुटिया रामपुर",
                                "nameEn": "Kutiya Ramapura"
                            },
                            {
                                "value": "150701",
                                "name": "कुड़नी",
                                "nameEn": "Kurnee"
                            },
                            {
                                "value": "150450",
                                "name": "कुढ़गांव",
                                "nameEn": "KurhGanw"
                            },
                            {
                                "value": "150452",
                                "name": "कुढ़वा",
                                "nameEn": "Kurhva"
                            },
                            {
                                "value": "150668",
                                "name": "कुन्दौली",
                                "nameEn": "Kundaulee"
                            },
                            {
                                "value": "150722",
                                "name": "कुम्हऊपुर",
                                "nameEn": "Kumhaoopura"
                            },
                            {
                                "value": "150444",
                                "name": "कुम्हऊपुर",
                                "nameEn": "Kumhaoopura"
                            },
                            {
                                "value": "150793",
                                "name": "कुरथा",
                                "nameEn": "Kuratha"
                            },
                            {
                                "value": "150559",
                                "name": "कुरियानी",
                                "nameEn": "Kuriyanee"
                            },
                            {
                                "value": "150537",
                                "name": "कुशमरा",
                                "nameEn": "Kushamara"
                            },
                            {
                                "value": "150447",
                                "name": "कोरियां",
                                "nameEn": "Koriyan"
                            },
                            {
                                "value": "150528",
                                "name": "खरौटी",
                                "nameEn": "Kharautee"
                            },
                            {
                                "value": "150492",
                                "name": "खुजऊपुर",
                                "nameEn": "Khujaoopura"
                            },
                            {
                                "value": "150470",
                                "name": "खुजौली",
                                "nameEn": "Khujaulee"
                            },
                            {
                                "value": "150483",
                                "name": "ख्वाजगीपुर",
                                "nameEn": "Khvajageepura"
                            },
                            {
                                "value": "150484",
                                "name": "गंगभेव",
                                "nameEn": "Gngabheva"
                            },
                            {
                                "value": "150473",
                                "name": "गढ़ी नर्वल",
                                "nameEn": "Garhee Nrvala"
                            },
                            {
                                "value": "150698",
                                "name": "गाजीपुर",
                                "nameEn": "Gajeepura"
                            },
                            {
                                "value": "150729",
                                "name": "गुगुरा",
                                "nameEn": "Gugura"
                            },
                            {
                                "value": "150681",
                                "name": "गोपालपुर नर्वल",
                                "nameEn": "Gopalapura Nrvala"
                            },
                            {
                                "value": "220327",
                                "name": "गौरिया",
                                "nameEn": "Gauriya"
                            },
                            {
                                "value": "150666",
                                "name": "गौरी ककरा",
                                "nameEn": "Gauree Kakara"
                            },
                            {
                                "value": "150708",
                                "name": "गौरी नर्वल",
                                "nameEn": "Gauree Nrvala"
                            },
                            {
                                "value": "150694",
                                "name": "चतुरीखेड़ा",
                                "nameEn": "Chatureekhera"
                            },
                            {
                                "value": "150554",
                                "name": "चन्दनपुर",
                                "nameEn": "Chndanapura"
                            },
                            {
                                "value": "150507",
                                "name": "चाँदनपुर",
                                "nameEn": "Chandanapura"
                            },
                            {
                                "value": "150693",
                                "name": "चिरला",
                                "nameEn": "Chirala"
                            },
                            {
                                "value": "150671",
                                "name": "चिरली",
                                "nameEn": "Chiralee"
                            },
                            {
                                "value": "220333",
                                "name": "छतमरा",
                                "nameEn": "Chhatamara"
                            },
                            {
                                "value": "150657",
                                "name": "छतरापुर",
                                "nameEn": "Chhatarapura"
                            },
                            {
                                "value": "150688",
                                "name": "छतेरुवा",
                                "nameEn": "Chhateruva"
                            },
                            {
                                "value": "150505",
                                "name": "जमदा",
                                "nameEn": "Jamada"
                            },
                            {
                                "value": "150451",
                                "name": "जरकला",
                                "nameEn": "Jarakala"
                            },
                            {
                                "value": "150705",
                                "name": "जरसरा",
                                "nameEn": "Jarasara"
                            },
                            {
                                "value": "150556",
                                "name": "टिकरा चौहान",
                                "nameEn": "Tikara Chauhana"
                            },
                            {
                                "value": "220381",
                                "name": "टिकरा पैगम्बरपुर",
                                "nameEn": "Tikara Paigmbarapura"
                            },
                            {
                                "value": "220382",
                                "name": "टिकरिया",
                                "nameEn": "Tikariya"
                            },
                            {
                                "value": "150543",
                                "name": "टीकर कान्ह",
                                "nameEn": "Teekara Kanha"
                            },
                            {
                                "value": "150553",
                                "name": "टीकरभाऊ",
                                "nameEn": "Teekarabhaoo"
                            },
                            {
                                "value": "150486",
                                "name": "टौस",
                                "nameEn": "Tausa"
                            },
                            {
                                "value": "150534",
                                "name": "डोमनपुर",
                                "nameEn": "Domanapura"
                            },
                            {
                                "value": "150687",
                                "name": "ढूहरपुर",
                                "nameEn": "Dhooharapura"
                            },
                            {
                                "value": "150496",
                                "name": "ढ़ोढ़ी",
                                "nameEn": "Rhorhee"
                            },
                            {
                                "value": "150670",
                                "name": "तरगाँव नर्बल",
                                "nameEn": "TaraGanw Nrbala"
                            },
                            {
                                "value": "150475",
                                "name": "ताजपुर",
                                "nameEn": "Tajapura"
                            },
                            {
                                "value": "150719",
                                "name": "ताजपुर",
                                "nameEn": "Tajapura"
                            },
                            {
                                "value": "150550",
                                "name": "ताहरपुर",
                                "nameEn": "Taharapura"
                            },
                            {
                                "value": "150466",
                                "name": "तिरमा",
                                "nameEn": "Tirama"
                            },
                            {
                                "value": "150474",
                                "name": "तिलसहरी खुर्द",
                                "nameEn": "Tilasaharee Khurd"
                            },
                            {
                                "value": "150498",
                                "name": "तिलसहरी बुजुर्ग",
                                "nameEn": "Tilasaharee Bujurga"
                            },
                            {
                                "value": "150546",
                                "name": "तिवारीपुर सलेमपुर",
                                "nameEn": "Tivareepura Salemapura"
                            },
                            {
                                "value": "150655",
                                "name": "तिवारीपुर साढ.",
                                "nameEn": "Tivareepura Sadha."
                            },
                            {
                                "value": "150476",
                                "name": "तुसौरा",
                                "nameEn": "Tusaura"
                            },
                            {
                                "value": "150672",
                                "name": "तेलियावर",
                                "nameEn": "Teliyavara"
                            },
                            {
                                "value": "150542",
                                "name": "थरेपाह",
                                "nameEn": "Tharepaha"
                            },
                            {
                                "value": "150541",
                                "name": "दीपापुर",
                                "nameEn": "Deepapura"
                            },
                            {
                                "value": "150709",
                                "name": "देवपुरा",
                                "nameEn": "Devapura"
                            },
                            {
                                "value": "150658",
                                "name": "देवसढ.",
                                "nameEn": "Devasadha."
                            },
                            {
                                "value": "150677",
                                "name": "दौलतपुर नर्बल",
                                "nameEn": "Daulatapura Nrbala"
                            },
                            {
                                "value": "150551",
                                "name": "धरमंगदपुर नर्वल",
                                "nameEn": "Dharamngadapura Nrvala"
                            },
                            {
                                "value": "150663",
                                "name": "धरमपुर नर्बल",
                                "nameEn": "Dharamapura Nrbala"
                            },
                            {
                                "value": "150446",
                                "name": "धुरूवा खेड़ा",
                                "nameEn": "Dhuroova Khera"
                            },
                            {
                                "value": "150440",
                                "name": "नंगवा",
                                "nameEn": "Nngava"
                            },
                            {
                                "value": "150520",
                                "name": "नरायनपुर सलेमपुर",
                                "nameEn": "Narayanapura Salemapura"
                            },
                            {
                                "value": "150702",
                                "name": "नरायनपुर साढ़",
                                "nameEn": "Narayanapura Sarh"
                            },
                            {
                                "value": "150548",
                                "name": "नरौरा",
                                "nameEn": "Naraura"
                            },
                            {
                                "value": "150561",
                                "name": "नर्वल",
                                "nameEn": "Nrvala"
                            },
                            {
                                "value": "150552",
                                "name": "नसड़ा",
                                "nameEn": "Nasara"
                            },
                            {
                                "value": "150529",
                                "name": "नागापुर",
                                "nameEn": "Nagapura"
                            },
                            {
                                "value": "150685",
                                "name": "निवादा उजागर",
                                "nameEn": "Nivada Ujagara"
                            },
                            {
                                "value": "150724",
                                "name": "निविया",
                                "nameEn": "Niviya"
                            },
                            {
                                "value": "150540",
                                "name": "नेबादा वौसर",
                                "nameEn": "Nebada Vausara"
                            },
                            {
                                "value": "150714",
                                "name": "नेवादाभरथुबा",
                                "nameEn": "Nevadabharathuba"
                            },
                            {
                                "value": "150539",
                                "name": "नौगवाँ गौतम",
                                "nameEn": "Naugavan Gautama"
                            },
                            {
                                "value": "150557",
                                "name": "पनौरी",
                                "nameEn": "Panauree"
                            },
                            {
                                "value": "150648",
                                "name": "परौरी",
                                "nameEn": "Parauree"
                            },
                            {
                                "value": "150549",
                                "name": "पारा",
                                "nameEn": "Para"
                            },
                            {
                                "value": "150679",
                                "name": "पालपुर",
                                "nameEn": "Palapura"
                            },
                            {
                                "value": "150477",
                                "name": "पालीखुर्द",
                                "nameEn": "PaleeKhurd"
                            },
                            {
                                "value": "150478",
                                "name": "पालीभोगीपुर",
                                "nameEn": "Paleebhogeepura"
                            },
                            {
                                "value": "150547",
                                "name": "पाल्हेपुर",
                                "nameEn": "Palhepura"
                            },
                            {
                                "value": "150448",
                                "name": "पिपरगवां",
                                "nameEn": "Piparagavan"
                            },
                            {
                                "value": "150538",
                                "name": "पुरवामीर",
                                "nameEn": "Puravameera"
                            },
                            {
                                "value": "150544",
                                "name": "पूरनपुर",
                                "nameEn": "Pooranapura"
                            },
                            {
                                "value": "150568",
                                "name": "पौहार",
                                "nameEn": "Pauhara"
                            },
                            {
                                "value": "150563",
                                "name": "प्रतापपुर नर्वल",
                                "nameEn": "Pratapapura Nrvala"
                            },
                            {
                                "value": "150488",
                                "name": "फुफवार राजथोक",
                                "nameEn": "Phuphavara Rajathoka"
                            },
                            {
                                "value": "150489",
                                "name": "फुफुवार सुईथोक",
                                "nameEn": "Phuphuvara Sueethoka"
                            },
                            {
                                "value": "150733",
                                "name": "फैजुल्लापुर",
                                "nameEn": "Phaijullapura"
                            },
                            {
                                "value": "150521",
                                "name": "बगहा",
                                "nameEn": "Bagaha"
                            },
                            {
                                "value": "150445",
                                "name": "बघारा",
                                "nameEn": "Baghara"
                            },
                            {
                                "value": "150659",
                                "name": "बंजारी",
                                "nameEn": "Bnjaree"
                            },
                            {
                                "value": "150545",
                                "name": "बड़ा गाँव",
                                "nameEn": "Bara Ganw"
                            },
                            {
                                "value": "150684",
                                "name": "बरईगढ.",
                                "nameEn": "Baraeegadha."
                            },
                            {
                                "value": "150481",
                                "name": "बाँबी चिनगी",
                                "nameEn": "Banbee Chinagee"
                            },
                            {
                                "value": "150482",
                                "name": "बांबी भितरी",
                                "nameEn": "Banbee Bhitaree"
                            },
                            {
                                "value": "150485",
                                "name": "बाराधरी",
                                "nameEn": "Baradharee"
                            },
                            {
                                "value": "150652",
                                "name": "बारीगॉव",
                                "nameEn": "Bareegaova"
                            },
                            {
                                "value": "150650",
                                "name": "बिरसिंहपुर",
                                "nameEn": "Birasinhapura"
                            },
                            {
                                "value": "150712",
                                "name": "बिरहर",
                                "nameEn": "Birahara"
                            },
                            {
                                "value": "220362",
                                "name": "बुघेड़ा",
                                "nameEn": "Bughera"
                            },
                            {
                                "value": "150711",
                                "name": "बेरीखेड़ा",
                                "nameEn": "Bereekhera"
                            },
                            {
                                "value": "150662",
                                "name": "बेहटा गम्भीरपुर",
                                "nameEn": "Behata Gmbheerapura"
                            },
                            {
                                "value": "150723",
                                "name": "बेहटा बुजुर्ग",
                                "nameEn": "Behata Bujurga"
                            },
                            {
                                "value": "150479",
                                "name": "बेहटा सकत",
                                "nameEn": "Behata Sakata"
                            },
                            {
                                "value": "150487",
                                "name": "बौसर",
                                "nameEn": "Bausara"
                            },
                            {
                                "value": "150717",
                                "name": "बौहार",
                                "nameEn": "Bauhara"
                            },
                            {
                                "value": "150560",
                                "name": "भगुवाखेड़ा",
                                "nameEn": "Bhaguvakhera"
                            },
                            {
                                "value": "150503",
                                "name": "भदासा",
                                "nameEn": "Bhadasa"
                            },
                            {
                                "value": "150506",
                                "name": "भिटारा",
                                "nameEn": "Bhitara"
                            },
                            {
                                "value": "150654",
                                "name": "भीतरगॉव",
                                "nameEn": "Bheetaragaova"
                            },
                            {
                                "value": "150467",
                                "name": "भुकनाई",
                                "nameEn": "Bhukanaee"
                            },
                            {
                                "value": "150721",
                                "name": "भेलसा",
                                "nameEn": "Bhelasa"
                            },
                            {
                                "value": "150558",
                                "name": "मडिलवा",
                                "nameEn": "Madilava"
                            },
                            {
                                "value": "150744",
                                "name": "मडेपुर",
                                "nameEn": "Madepura"
                            },
                            {
                                "value": "150513",
                                "name": "मथुरा खेड़ा",
                                "nameEn": "Mathura Khera"
                            },
                            {
                                "value": "150480",
                                "name": "मन्धना",
                                "nameEn": "Mndhana"
                            },
                            {
                                "value": "150656",
                                "name": "मलखानपुर",
                                "nameEn": "Malakhanapura"
                            },
                            {
                                "value": "150501",
                                "name": "महाराजपुर",
                                "nameEn": "Maharajapura"
                            },
                            {
                                "value": "150532",
                                "name": "महुवागाँव",
                                "nameEn": "MahuvaGanw"
                            },
                            {
                                "value": "150715",
                                "name": "महोलिया",
                                "nameEn": "Maholiya"
                            },
                            {
                                "value": "150535",
                                "name": "महोली",
                                "nameEn": "Maholee"
                            },
                            {
                                "value": "150686",
                                "name": "मेहरौली",
                                "nameEn": "Meharaulee"
                            },
                            {
                                "value": "150690",
                                "name": "मोहम्मदपुर नर्वल",
                                "nameEn": "Mohmmadapura Nrvala"
                            },
                            {
                                "value": "150678",
                                "name": "मोहीपुर",
                                "nameEn": "Moheepura"
                            },
                            {
                                "value": "150706",
                                "name": "मौहसिनपुर",
                                "nameEn": "Mauhasinapura"
                            },
                            {
                                "value": "150683",
                                "name": "रसूलपुर उमरा",
                                "nameEn": "Rasoolapura Umara"
                            },
                            {
                                "value": "220812",
                                "name": "रसूलपुर जाजमऊ",
                                "nameEn": "Rasoolapura Jajamaoo"
                            },
                            {
                                "value": "150526",
                                "name": "रहनस",
                                "nameEn": "Rahanasa"
                            },
                            {
                                "value": "150512",
                                "name": "राजापुर",
                                "nameEn": "Rajapura"
                            },
                            {
                                "value": "150669",
                                "name": "राजेपुर",
                                "nameEn": "Rajepura"
                            },
                            {
                                "value": "150689",
                                "name": "रातेपुर",
                                "nameEn": "Ratepura"
                            },
                            {
                                "value": "150566",
                                "name": "रायपुर नर्बल",
                                "nameEn": "Rayapura Nrbala"
                            },
                            {
                                "value": "150649",
                                "name": "रावतपुर",
                                "nameEn": "Ravatapura"
                            },
                            {
                                "value": "150667",
                                "name": "लक्षिमनखेड.ा",
                                "nameEn": "Lakshimanakheda.a"
                            },
                            {
                                "value": "150725",
                                "name": "लाखनखेड़ा",
                                "nameEn": "Lakhanakhera"
                            },
                            {
                                "value": "150504",
                                "name": "लाहौरपुर",
                                "nameEn": "Lahaurapura"
                            },
                            {
                                "value": "220392",
                                "name": "विपौसी",
                                "nameEn": "Vipausee"
                            },
                            {
                                "value": "150695",
                                "name": "वीरनखेड़ा",
                                "nameEn": "Veeranakhera"
                            },
                            {
                                "value": "220815",
                                "name": "वैजूपुर",
                                "nameEn": "Vaijoopura"
                            },
                            {
                                "value": "150696",
                                "name": "शाह",
                                "nameEn": "Shaha"
                            },
                            {
                                "value": "150731",
                                "name": "शाहपुर",
                                "nameEn": "Shahpur"
                            },
                            {
                                "value": "150569",
                                "name": "शीशूपुर",
                                "nameEn": "Sheeshoopura"
                            },
                            {
                                "value": "150565",
                                "name": "सगुनपुर",
                                "nameEn": "Sagunapura"
                            },
                            {
                                "value": "150674",
                                "name": "सचौली",
                                "nameEn": "Sachaulee"
                            },
                            {
                                "value": "150517",
                                "name": "सफीपुर नर्वल",
                                "nameEn": "Sapheepura Nrvala"
                            },
                            {
                                "value": "150726",
                                "name": "सरवांगपुर",
                                "nameEn": "Saravangapura"
                            },
                            {
                                "value": "220401",
                                "name": "सरसौल 1",
                                "nameEn": "Sarasaula 1"
                            },
                            {
                                "value": "220402",
                                "name": "सरसौल II",
                                "nameEn": "Sarasaula II"
                            },
                            {
                                "value": "150497",
                                "name": "सलेमपुर",
                                "nameEn": "Salemapura"
                            },
                            {
                                "value": "150468",
                                "name": "सवाइजपुर",
                                "nameEn": "Savaijapura"
                            },
                            {
                                "value": "150676",
                                "name": "साढ.",
                                "nameEn": "Sadha."
                            },
                            {
                                "value": "150536",
                                "name": "सिकठिया",
                                "nameEn": "Sikathiya"
                            },
                            {
                                "value": "150710",
                                "name": "सुन्दरपुर",
                                "nameEn": "Sundarapura"
                            },
                            {
                                "value": "150531",
                                "name": "सुन्धैला",
                                "nameEn": "Sundhaila"
                            },
                            {
                                "value": "150491",
                                "name": "सुभौली",
                                "nameEn": "Subhaulee"
                            },
                            {
                                "value": "150749",
                                "name": "सूलपुर",
                                "nameEn": "Soolapura"
                            },
                            {
                                "value": "150555",
                                "name": "सेमरझाल",
                                "nameEn": "Semarajhala"
                            },
                            {
                                "value": "220816",
                                "name": "सेमरा",
                                "nameEn": "Semara"
                            },
                            {
                                "value": "150471",
                                "name": "सेमरुवा",
                                "nameEn": "Semaruva"
                            },
                            {
                                "value": "150511",
                                "name": "सैदलीपुर",
                                "nameEn": "Saidaleepura"
                            },
                            {
                                "value": "150502",
                                "name": "सैबसी",
                                "nameEn": "Saibasee"
                            },
                            {
                                "value": "150562",
                                "name": "हजरतपुर",
                                "nameEn": "Hajaratapura"
                            },
                            {
                                "value": "150567",
                                "name": "हरचन्द्र खेड़ा",
                                "nameEn": "Harachndra Khera"
                            },
                            {
                                "value": "150718",
                                "name": "हसकर",
                                "nameEn": "Hasakara"
                            },
                            {
                                "value": "150691",
                                "name": "हाजीपुर कदीम",
                                "nameEn": "Hajeepura Kadeema"
                            },
                            {
                                "value": "150713",
                                "name": "हाजीपुर पकरा",
                                "nameEn": "Hajeepura Pakara"
                            },
                            {
                                "value": "150490",
                                "name": "हाथीगॉव",
                                "nameEn": "Hatheegaova"
                            },
                            {
                                "value": "150499",
                                "name": "हाथीपुर",
                                "nameEn": "Hatheepura"
                            }
                        ]
        };

        return villageData[tehsilCode] || [];
    };

    // Handle tehsil selection
    const handleTehsilSelect = (tehsil) => {
        setSelectedTehsil(tehsil);
        setSelectedVillage(null);
        const villages = getVillagesByTehsil(tehsil.code);
        setFilteredVillages(villages);
        setSearchTerm('');
    };

    // Handle village selection
    const handleVillageSelect = (village) => {
        setSelectedVillage(village);
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (selectedTehsil) {
            const allVillages = getVillagesByTehsil(selectedTehsil.code);
            const filtered = term
                ? allVillages.filter(village =>
                    language === 'english'
                        ? village.nameEn.toLowerCase().includes(term.toLowerCase())
                        : village.name.toLowerCase().includes(term.toLowerCase()))
                : allVillages;

            setFilteredVillages(filtered);
        }
    };

    // Function to fetch property data
    const fetchPropertyData = async () => {
        if (!selectedTehsil || !selectedVillage) {
            alert('Please select both Tehsil and Village/Mohalla');
            return;
        }

        setFetchStatus('loading');

        try {
            // API call to fetch property data
            const response = await fetch('http://localhost:8000/api/property-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    districtCode: '164', // Hardcoded as per the curl example
                    sroCode: selectedTehsil.code,
                    gaonCode1: selectedVillage.value,
                    propertyId: '',
                    propNEWAddress: '1'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch property data');
            }

            setFetchStatus('success');

            // Show success message for 2 seconds then reset
            setTimeout(() => {
                setFetchStatus(null);
            }, 2000);
        } catch (error) {
            console.error('Error fetching property data:', error);
            setFetchStatus('error');

            // Show error message for 2 seconds then reset
            setTimeout(() => {
                setFetchStatus(null);
            }, 2000);
        }
    };

    // Navigate to saved records page
    const navigateToSavedRecords = () => {
        navigate('/saved-records');
    };

    // Get displayed name based on current language
    const getDisplayName = (item) => {
        return language === 'english' ? item.nameEn : item.name;
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            <header className="text-center mb-8 relative">
                {/* Language toggle button */}
                <button
                    onClick={toggleLanguage}
                    className="absolute right-0 top-0 px-3 py-2 bg-white rounded-full shadow-md flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                >
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">{language === 'english' ? 'हिंदी' : 'English'}</span>
                </button>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">{text.title}</h1>
                <p className="text-gray-600">{text.subtitle}</p>
            </header>

            {/* View Saved Records Button */}
            <div className="mb-8 flex justify-end">
                <button
                    onClick={navigateToSavedRecords}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md flex items-center space-x-2 hover:bg-green-700 transition-colors"
                >
                    <Database className="h-5 w-5" />
                    <span>{text.viewSavedRecords}</span>
                </button>
            </div>

            {/* Tehsil selection */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">{text.selectTehsil}</h2>
                <div className="flex flex-wrap gap-3">
                    {tehsils.map((tehsil) => (
                        <button
                            key={tehsil.code}
                            onClick={() => handleTehsilSelect(tehsil)}
                            className={`px-4 py-2 rounded-full transition-all ${selectedTehsil?.code === tehsil.code
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 shadow hover:shadow-md hover:bg-blue-50'
                                }`}
                        >
                            {getDisplayName(tehsil)} ({tehsil.code})
                        </button>
                    ))}
                </div>
            </section>

            {/* Village selection */}
            {selectedTehsil && (
                <section>
                    <div className="bg-white p-5 rounded-xl shadow-md">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-700">
                                {getDisplayName(selectedTehsil)} {text.mohallasOf}
                            </h2>

                            <div className="flex gap-3">
                                {/* Search box */}
                                <div className="relative w-72">
                                    <input
                                        type="text"
                                        placeholder={text.searchPlaceholder}
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>

                                {/* Fetch Data Button */}
                                <button
                                    onClick={fetchPropertyData}
                                    disabled={!selectedVillage || fetchStatus === 'loading'}
                                    className={`px-4 py-2 rounded-lg shadow flex items-center space-x-2 ${!selectedVillage
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : fetchStatus === 'loading'
                                                ? 'bg-blue-400 text-white cursor-wait'
                                                : fetchStatus === 'success'
                                                    ? 'bg-green-600 text-white'
                                                    : fetchStatus === 'error'
                                                        ? 'bg-red-600 text-white'
                                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                        } transition-colors`}
                                >
                                    <span>
                                        {fetchStatus === 'loading'
                                            ? text.fetchingData
                                            : fetchStatus === 'success'
                                                ? text.fetchSuccess
                                                : fetchStatus === 'error'
                                                    ? text.fetchError
                                                    : text.fetchData}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Village grid */}
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {filteredVillages.map((village) => (
                                <div
                                    key={village.value}
                                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${selectedVillage?.value === village.value
                                            ? 'bg-blue-100 border-blue-400'
                                            : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-200'
                                        }`}
                                    onClick={() => handleVillageSelect(village)}
                                >
                                    <div className="font-medium">{getDisplayName(village)}</div>
                                    <div className="text-sm text-gray-500">{text.code}: {village.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Empty state */}
                        {filteredVillages.length === 0 && (
                            <div className="text-center py-10 text-gray-500">
                                {searchTerm ? text.noResultsSearch : text.noResults}
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default TehsilMohallaDashboard;