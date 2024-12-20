const townBoundingBoxes = {
  Akuressa: { north: 6.25, south: 6.12, west: 80.48, east: 80.58 },
  Athuraliya: { north: 6.22, south: 6.1, west: 80.47, east: 80.57 },
  Devinuwara: { north: 5.98, south: 5.85, west: 80.53, east: 80.65 },
  Dickwella: { north: 5.98, south: 5.87, west: 80.57, east: 80.7 },
  Hakmana: { north: 6.15, south: 6.05, west: 80.55, east: 80.65 },
  Kamburupitiya: { north: 6.2, south: 6.08, west: 80.48, east: 80.58 },
  "Kirinda Puhulwella": { north: 6.12, south: 6.0, west: 80.5, east: 80.6 },
  Kotapola: { north: 6.27, south: 6.12, west: 80.44, east: 80.55 },
  Malimbada: { north: 6.17, south: 6.05, west: 80.48, east: 80.58 },
  Matara: { north: 6.06, south: 5.97, west: 80.49, east: 80.58 },
  Mulatiyana: { north: 6.22, south: 6.1, west: 80.52, east: 80.62 },
  Pasgoda: { north: 6.28, south: 6.15, west: 80.47, east: 80.58 },
  Pitabeddara: { north: 6.25, south: 6.12, west: 80.44, east: 80.54 },
  Thihagoda: { north: 6.17, south: 6.05, west: 80.5, east: 80.6 },
  Weligama: { north: 6.07, south: 5.97, west: 80.42, east: 80.52 },
  Welipitiya: { north: 6.15, south: 6.03, west: 80.5, east: 80.6 },
  Akmeemana: { north: 6.12, south: 6.05, west: 80.2, east: 80.3 },
  Ambalangoda: { north: 6.3, south: 6.23, west: 80.02, east: 80.1 },
  Baddegama: { north: 6.23, south: 6.15, west: 80.12, east: 80.22 },
  Balapitiya: { north: 6.32, south: 6.24, west: 80.0, east: 80.1 },
  Benthota: { north: 6.45, south: 6.35, west: 79.95, east: 80.05 },
  "Bope-Poddala": { north: 6.13, south: 6.05, west: 80.18, east: 80.28 },
  Elpitiya: { north: 6.25, south: 6.15, west: 80.12, east: 80.22 },
  Galle: { north: 6.07, south: 6.0, west: 80.2, east: 80.3 },
  Gonapinuwala: { north: 6.2, south: 6.12, west: 80.08, east: 80.18 },
  Habaraduwa: { north: 6.12, south: 6.05, west: 80.25, east: 80.35 },
  Hikkaduwa: { north: 6.17, south: 6.1, west: 80.03, east: 80.13 },
  Imaduwa: { north: 6.17, south: 6.08, west: 80.28, east: 80.38 },
  Karandeniya: { north: 6.25, south: 6.17, west: 80.02, east: 80.12 },
  Nagoda: { north: 6.22, south: 6.15, west: 80.18, east: 80.28 },
  Neluwa: { north: 6.27, south: 6.18, west: 80.25, east: 80.35 },
  Niyagama: { north: 6.22, south: 6.12, west: 80.22, east: 80.32 },
  Thawalama: { north: 6.28, south: 6.18, west: 80.28, east: 80.38 },
  "Welivitiya-Divithura": {
    north: 6.23,
    south: 6.13,
    west: 80.12,
    east: 80.22,
  },
  Yakkalamulla: { north: 6.2, south: 6.1, west: 80.18, east: 80.28 },
  Ambalantota: { north: 6.18, south: 6.08, west: 81.0, east: 81.12 },
  Angunakolapelessa: { north: 6.3, south: 6.18, west: 80.92, east: 81.05 },
  Beliatta: { north: 6.1, south: 5.98, west: 80.82, east: 80.95 },
  Hambantota: { north: 6.2, south: 6.08, west: 81.0, east: 81.15 },
  Katuwana: { north: 6.32, south: 6.2, west: 80.75, east: 80.88 },
  Lunugamvehera: { north: 6.4, south: 6.28, west: 81.0, east: 81.2 },
  Okewela: { north: 6.25, south: 6.12, west: 80.9, east: 81.02 },
  Sooriyawewa: { north: 6.3, south: 6.15, west: 81.1, east: 81.25 },
  Tangalle: { north: 6.1, south: 5.98, west: 80.75, east: 80.88 },
  Thissamaharama: { north: 6.3, south: 6.15, west: 81.2, east: 81.35 },
  Walasmulla: { north: 6.22, south: 6.1, west: 80.85, east: 81.0 },
  Weeraketiya: { north: 6.28, south: 6.15, west: 80.95, east: 81.1 },
  Akurana: { north: 7.38, south: 7.28, west: 80.58, east: 80.68 },
  Delthota: { north: 7.08, south: 7.0, west: 80.65, east: 80.75 },
  Doluwa: { north: 7.25, south: 7.15, west: 80.6, east: 80.7 },
  "Gangawata Korale": { north: 7.3, south: 7.2, west: 80.58, east: 80.7 },
  "Ganga Ihala Korale": { north: 7.35, south: 7.25, west: 80.55, east: 80.7 },
  Harispattuwa: { north: 7.38, south: 7.28, west: 80.58, east: 80.68 },
  Hatharaliyadda: { north: 7.42, south: 7.32, west: 80.57, east: 80.67 },
  Kundasale: { north: 7.3, south: 7.2, west: 80.68, east: 80.78 },
  Medadumbara: { north: 7.25, south: 7.15, west: 80.75, east: 80.85 },
  Minipe: { north: 7.35, south: 7.25, west: 80.7, east: 80.8 },
  Panvila: { north: 7.22, south: 7.12, west: 80.68, east: 80.78 },
  "Pasbage Korale": { north: 7.45, south: 7.35, west: 80.55, east: 80.65 },
  Pathadumbara: { north: 7.35, south: 7.25, west: 80.6, east: 80.7 },
  Pathahewaheta: { north: 7.22, south: 7.12, west: 80.6, east: 80.7 },
  Poojapitiya: { north: 7.38, south: 7.28, west: 80.55, east: 80.65 },
  Thumpane: { north: 7.42, south: 7.32, west: 80.52, east: 80.62 },
  Udadumbara: { north: 7.32, south: 7.22, west: 80.75, east: 80.85 },
  Udapalatha: { north: 7.25, south: 7.15, west: 80.6, east: 80.7 },
  Udunuwara: { north: 7.35, south: 7.25, west: 80.55, east: 80.65 },
  Yatinuwara: { north: 7.35, south: 7.25, west: 80.55, east: 80.65 },
  "Ambanganga Korale": { north: 7.6, south: 7.5, west: 80.7, east: 80.8 },
  Dambulla: { north: 7.9, south: 7.7, west: 80.55, east: 80.75 },
  Galewela: { north: 7.8, south: 7.65, west: 80.6, east: 80.75 },
  "Laggala-Pallegama": { north: 7.65, south: 7.5, west: 80.8, east: 80.95 },
  Matale: { north: 7.55, south: 7.4, west: 80.6, east: 80.75 },
  Naula: { north: 7.75, south: 7.65, west: 80.55, east: 80.7 },
  Pallepola: { north: 7.6, south: 7.45, west: 80.55, east: 80.7 },
  Rattota: { north: 7.45, south: 7.35, west: 80.65, east: 80.8 },
  Ukuwela: { north: 7.6, south: 7.45, west: 80.6, east: 80.75 },
  Wilgamuwa: { north: 7.7, south: 7.55, west: 80.75, east: 80.9 },
  Yatawatta: { north: 7.55, south: 7.45, west: 80.55, east: 80.7 },
  Ambagamuwa: { north: 7.0, south: 6.85, west: 80.55, east: 80.75 },
  Hanguranketha: { north: 7.1, south: 6.95, west: 80.7, east: 80.9 },
  Kothmale: { north: 7.15, south: 7.0, west: 80.55, east: 80.75 },
  "Nuwara Eliya": { north: 6.97, south: 6.85, west: 80.75, east: 80.92 },
  Walapane: { north: 7.1, south: 6.95, west: 80.8, east: 81.0 },
  Norwood: { north: 6.95, south: 6.8, west: 80.6, east: 80.8 },
  "Kothmale West": { north: 7.1, south: 7.0, west: 80.55, east: 80.7 },
  Nildandahinna: { north: 7.05, south: 6.92, west: 80.85, east: 81.0 },
  Thalawakale: { north: 7.0, south: 6.85, west: 80.6, east: 80.75 },
  Mathurata: { north: 7.05, south: 6.95, west: 80.65, east: 80.8 },
  Addalachchenai: { north: 7.25, south: 7.15, west: 81.8, east: 81.9 },
  Akkaraipattu: { north: 7.23, south: 7.13, west: 81.75, east: 81.85 },
  Alayadiwembu: { north: 7.2, south: 7.1, west: 81.7, east: 81.8 },
  Ampara: { north: 7.3, south: 7.15, west: 81.5, east: 81.65 },
  Damana: { north: 7.2, south: 7.1, west: 81.55, east: 81.7 },
  Dehiattakandiya: { north: 7.35, south: 7.2, west: 81.4, east: 81.55 },
  Eragama: { north: 7.3, south: 7.2, west: 81.65, east: 81.75 },
  "Kalmunai Muslim": { north: 7.25, south: 7.15, west: 81.75, east: 81.85 },
  "Kalmunai Tamil": { north: 7.23, south: 7.13, west: 81.7, east: 81.8 },
  Karaitivu: { north: 7.28, south: 7.18, west: 81.7, east: 81.8 },
  Lahugala: { north: 7.25, south: 7.15, west: 81.6, east: 81.7 },
  Mahaoya: { north: 7.35, south: 7.25, west: 81.3, east: 81.45 },
  Navithanveli: { north: 7.23, south: 7.13, west: 81.6, east: 81.75 },
  Ninthavur: { north: 7.28, south: 7.18, west: 81.8, east: 81.9 },
  Padiyathalawa: { north: 7.38, south: 7.28, west: 81.3, east: 81.45 },
  Pothuvil: { north: 7.22, south: 7.12, west: 81.6, east: 81.75 },
  Sainthamaruthu: { north: 7.25, south: 7.15, west: 81.7, east: 81.85 },
  Samanthurai: { north: 7.28, south: 7.18, west: 81.65, east: 81.8 },
  Thirukkovil: { north: 7.2, south: 7.1, west: 81.6, east: 81.75 },
  Uhana: { north: 7.35, south: 7.25, west: 81.5, east: 81.65 },
  "Eravur Pattu": { north: 7.88, south: 7.78, west: 81.6, east: 81.75 },
  "Eravur Town": { north: 7.85, south: 7.75, west: 81.65, east: 81.8 },
  Kattankudy: { north: 7.75, south: 7.65, west: 81.65, east: 81.8 },
  "Koralai Pattu": { north: 7.9, south: 7.8, west: 81.55, east: 81.7 },
  "Koralai Pattu Central": {
    north: 7.88,
    south: 7.78,
    west: 81.55,
    east: 81.7,
  },
  "Koralai Pattu North": {
    north: 7.95,
    south: 7.85,
    west: 81.5,
    east: 81.65,
  },
  "Koralai Pattu South": { north: 7.8, south: 7.7, west: 81.6, east: 81.75 },
  "Koralai Pattu West": { north: 7.85, south: 7.75, west: 81.55, east: 81.7 },
  "Manmunai North": { north: 7.75, south: 7.65, west: 81.6, east: 81.75 },
  "Manmunai Pattu": { north: 7.78, south: 7.68, west: 81.55, east: 81.7 },
  "Manmunai South and Eruvil Pattu": {
    north: 7.7,
    south: 7.6,
    west: 81.6,
    east: 81.75,
  },
  "Manmunai South West": {
    north: 7.72,
    south: 7.62,
    west: 81.55,
    east: 81.7,
  },
  "Manmunai West": { north: 7.75, south: 7.65, west: 81.5, east: 81.65 },
  "Porativu Pattu": { north: 7.82, south: 7.72, west: 81.6, east: 81.75 },
  Gomarankadawala: { north: 8.85, south: 8.75, west: 80.85, east: 81.05 },
  Kantalai: { north: 8.58, south: 8.48, west: 80.85, east: 81.05 },
  Kinniya: { north: 8.63, south: 8.53, west: 81.05, east: 81.25 },
  Kuchchaveli: { north: 8.8, south: 8.7, west: 80.98, east: 81.18 },
  Morawewa: { north: 8.65, south: 8.55, west: 80.95, east: 81.15 },
  Muttur: { north: 8.5, south: 8.4, west: 81.1, east: 81.3 },
  "Padavi Sri Pura": { north: 8.85, south: 8.75, west: 80.75, east: 80.95 },
  Seruvila: { north: 8.45, south: 8.35, west: 81.1, east: 81.3 },
  Thambalagamuwa: { north: 8.68, south: 8.58, west: 81.0, east: 81.2 },
  Trincomalee: { north: 8.6, south: 8.5, west: 81.18, east: 81.38 },
  Verugal: { north: 8.4, south: 8.3, west: 81.15, east: 81.35 },
  Galnewa: { north: 8.25, south: 8.15, west: 80.45, east: 80.6 },
  Galenbindunuwewa: { north: 8.5, south: 8.4, west: 80.5, east: 80.65 },
  Horowpothana: { north: 8.85, south: 8.75, west: 80.85, east: 81.05 },
  Ipalogama: { north: 8.2, south: 8.1, west: 80.45, east: 80.6 },
  Kahatagasdigiliya: { north: 8.45, south: 8.35, west: 80.65, east: 80.8 },
  Kebithigollewa: { north: 8.7, south: 8.6, west: 80.65, east: 80.85 },
  Kekirawa: { north: 8.1, south: 8.0, west: 80.45, east: 80.6 },
  Mahavilachchiya: { north: 8.6, south: 8.5, west: 80.2, east: 80.35 },
  Medawachchiya: { north: 8.5, south: 8.4, west: 80.4, east: 80.55 },
  Mihinthale: { north: 8.35, south: 8.25, west: 80.45, east: 80.6 },
  Nachchadoowa: { north: 8.35, south: 8.25, west: 80.3, east: 80.45 },
  Nochchiyagama: { north: 8.3, south: 8.2, west: 80.2, east: 80.35 },
  "Nuwaragam Palatha Central": {
    north: 8.35,
    south: 8.25,
    west: 80.4,
    east: 80.55,
  },
  "Nuwaragam Palatha East": {
    north: 8.35,
    south: 8.25,
    west: 80.45,
    east: 80.6,
  },
  Padaviya: { north: 8.9, south: 8.8, west: 80.75, east: 80.95 },
  Palagala: { north: 8.25, south: 8.15, west: 80.55, east: 80.7 },
  Palugaswewa: { north: 8.3, south: 8.2, west: 80.45, east: 80.6 },
  Rajanganaya: { north: 8.25, south: 8.15, west: 80.25, east: 80.4 },
  Rambewa: { north: 8.4, south: 8.3, west: 80.55, east: 80.7 },
  Thalawa: { north: 8.25, south: 8.15, west: 80.3, east: 80.45 },
  Thambuttegama: { north: 8.2, south: 8.1, west: 80.3, east: 80.45 },
  Thirappane: { north: 8.35, south: 8.25, west: 80.6, east: 80.75 },
  Dimbulagala: { north: 7.85, south: 7.75, west: 80.95, east: 81.15 },
  Elahera: { north: 7.75, south: 7.65, west: 80.75, east: 80.95 },
  Hingurakgoda: { north: 8.05, south: 7.95, west: 80.95, east: 81.15 },
  Lankapura: { north: 8.0, south: 7.9, west: 80.95, east: 81.15 },
  Medirigiriya: { north: 8.05, south: 7.95, west: 80.9, east: 81.1 },
  Thamankaduwa: { north: 8.1, south: 8.0, west: 80.95, east: 81.15 },
  Welikanda: { north: 7.8, south: 7.7, west: 81.0, east: 81.2 },
  Delft: { north: 9.55, south: 9.45, west: 79.65, east: 79.75 },
  "Island North": { north: 9.85, south: 9.75, west: 79.9, east: 80.1 },
  "Island South": { north: 9.75, south: 9.65, west: 79.9, east: 80.1 },
  Jaffna: { north: 9.7, south: 9.6, west: 80.0, east: 80.15 },
  Karainagar: { north: 9.75, south: 9.65, west: 79.9, east: 80.0 },
  Nallur: { north: 9.7, south: 9.6, west: 80.0, east: 80.1 },
  Thenmaradchi: { north: 9.75, south: 9.65, west: 80.1, east: 80.2 },
  "Vadamaradchi East": { north: 9.8, south: 9.7, west: 80.1, east: 80.2 },
  "Vadamaradchi North": { north: 9.85, south: 9.75, west: 80.1, east: 80.2 },
  "Vadamaradchi South-West": {
    north: 9.7,
    south: 9.6,
    west: 80.0,
    east: 80.15,
  },
  "Valikamam East": { north: 9.75, south: 9.65, west: 80.0, east: 80.15 },
  "Valikamam North": { north: 9.8, south: 9.7, west: 80.0, east: 80.15 },
  "Valikamam South": { north: 9.65, south: 9.55, west: 80.0, east: 80.15 },
  "Valikamam South-West": { north: 9.6, south: 9.5, west: 80.0, east: 80.15 },
  "Valikamam West": { north: 9.7, south: 9.6, west: 79.95, east: 80.1 },
  Madhu: { north: 8.7, south: 8.6, west: 80.0, east: 80.15 },
  Mannar: { north: 9.0, south: 8.9, west: 79.9, east: 80.05 },
  "Manthai West": { north: 8.95, south: 8.85, west: 79.85, east: 80.0 },
  Musalai: { north: 8.85, south: 8.75, west: 79.75, east: 79.9 },
  Nanaddan: { north: 8.8, south: 8.7, west: 79.8, east: 79.95 },
  "Manthai East": { north: 9.25, south: 9.15, west: 80.65, east: 80.85 },
  Maritimepattu: { north: 9.3, south: 9.2, west: 80.75, east: 80.95 },
  Oddusuddan: { north: 9.35, south: 9.25, west: 80.8, east: 81.0 },
  Puthukudiyiruppu: { north: 9.35, south: 9.25, west: 80.85, east: 81.05 },
  Thunukkai: { north: 9.4, south: 9.3, west: 80.75, east: 80.95 },
  Welioya: { north: 9.25, south: 9.15, west: 80.85, east: 81.05 },
  Vavuniya: { north: 9.0, south: 8.9, west: 80.45, east: 80.65 },
  "Vavuniya North": { north: 9.1, south: 9.0, west: 80.55, east: 80.75 },
  "Vavuniya South": { north: 8.9, south: 8.8, west: 80.5, east: 80.7 },
  Vengalacheddikulam: { north: 8.95, south: 8.85, west: 80.4, east: 80.6 },
  Alawwa: { north: 7.38, south: 7.28, west: 80.05, east: 80.2 },
  Ambanpola: { north: 8.0, south: 7.9, west: 80.25, east: 80.4 },
  Bamunakotuwa: { north: 7.55, south: 7.45, west: 80.2, east: 80.35 },
  Bingiriya: { north: 7.55, south: 7.45, west: 79.95, east: 80.1 },
  Ehetuwewa: { north: 8.05, south: 7.95, west: 80.3, east: 80.45 },
  Galgamuwa: { north: 7.95, south: 7.85, west: 80.35, east: 80.5 },
  Ganewatta: { north: 7.75, south: 7.65, west: 80.3, east: 80.45 },
  Giribawa: { north: 8.0, south: 7.9, west: 80.35, east: 80.5 },
  Ibbagamuwa: { north: 7.7, south: 7.6, west: 80.4, east: 80.55 },
  Katupotha: { north: 7.5, south: 7.4, west: 80.0, east: 80.15 },
  Kobeigane: { north: 7.6, south: 7.5, west: 79.95, east: 80.1 },
  Kotavehera: { north: 7.85, south: 7.75, west: 80.1, east: 80.25 },
  "Kuliyapitiya East": { north: 7.55, south: 7.45, west: 80.15, east: 80.3 },
  "Kuliyapitiya West": { north: 7.55, south: 7.45, west: 80.1, east: 80.25 },
  Kurunegala: { north: 7.6, south: 7.5, west: 80.2, east: 80.35 },
  Mahawa: { north: 7.85, south: 7.75, west: 80.3, east: 80.45 },
  Mallawapitiya: { north: 7.65, south: 7.55, west: 80.25, east: 80.4 },
  Maspotha: { north: 7.7, south: 7.6, west: 80.2, east: 80.35 },
  Mawathagama: { north: 7.6, south: 7.5, west: 80.25, east: 80.4 },
  Narammala: { north: 7.45, south: 7.35, west: 80.1, east: 80.25 },
  Nikaweratiya: { north: 7.8, south: 7.7, west: 80.05, east: 80.2 },
  Panduwasnuwara: { north: 7.55, south: 7.45, west: 80.0, east: 80.15 },
  Pannala: { north: 7.4, south: 7.3, west: 80.1, east: 80.25 },
  Polgahawela: { north: 7.35, south: 7.25, west: 80.1, east: 80.25 },
  Polpithigama: { north: 7.95, south: 7.85, west: 80.2, east: 80.35 },
  Rasnayakapura: { north: 7.85, south: 7.75, west: 80.05, east: 80.2 },
  Rideegama: { north: 7.5, south: 7.4, west: 80.25, east: 80.4 },
  Udubaddawa: { north: 7.5, south: 7.4, west: 80.05, east: 80.2 },
  Wariyapola: { north: 7.7, south: 7.6, west: 80.1, east: 80.25 },
  Weerambugedara: { north: 7.55, south: 7.45, west: 80.0, east: 80.15 },
  Anamaduwa: { north: 8.1, south: 8.0, west: 79.9, east: 80.05 },
  Arachchikattuwa: { north: 7.8, south: 7.7, west: 79.75, east: 79.9 },
  Chilaw: { north: 7.65, south: 7.55, west: 79.75, east: 79.9 },
  Dankotuwa: { north: 7.45, south: 7.35, west: 79.85, east: 80.0 },
  Kalpitiya: { north: 8.3, south: 8.2, west: 79.6, east: 79.75 },
  Karuwalagaswewa: { north: 8.15, south: 8.05, west: 79.85, east: 80.0 },
  Madampe: { north: 7.6, south: 7.5, west: 79.8, east: 79.95 },
  Mahakumbukkadawala: { north: 8.25, south: 8.15, west: 79.85, east: 80.0 },
  Mahawewa: { north: 7.55, south: 7.45, west: 79.75, east: 79.9 },
  Mundalama: { north: 8.05, south: 7.95, west: 79.75, east: 79.9 },
  Nattandiya: { north: 7.45, south: 7.35, west: 79.8, east: 79.95 },
  Nawagattegama: { north: 8.2, south: 8.1, west: 79.9, east: 80.05 },
  Pallama: { north: 7.85, south: 7.75, west: 79.8, east: 79.95 },
  Puttalam: { north: 8.0, south: 7.9, west: 79.8, east: 79.95 },
  Vanathavilluwa: { north: 8.25, south: 8.15, west: 79.75, east: 79.9 },
  Wennappuwa: { north: 7.5, south: 7.4, west: 79.8, east: 79.95 },
  Aranayaka: { north: 7.2, south: 7.1, west: 80.4, east: 80.55 },
  Bulathkohupitiya: { north: 7.15, south: 7.05, west: 80.35, east: 80.5 },
  Dehiowita: { north: 7.05, south: 6.95, west: 80.3, east: 80.45 },
  Deraniyagala: { north: 6.95, south: 6.85, west: 80.35, east: 80.5 },
  Galigamuwa: { north: 7.15, south: 7.05, west: 80.3, east: 80.45 },
  Kegalle: { north: 7.25, south: 7.15, west: 80.3, east: 80.45 },
  Mawanella: { north: 7.2, south: 7.1, west: 80.35, east: 80.5 },
  Rambukkana: { north: 7.3, south: 7.2, west: 80.3, east: 80.45 },
  Ruwanwella: { north: 7.05, south: 6.95, west: 80.25, east: 80.4 },
  Warakapola: { north: 7.25, south: 7.15, west: 80.2, east: 80.35 },
  Yatiyanthota: { north: 7.1, south: 7.0, west: 80.25, east: 80.4 },
  Ayagama: { north: 6.8, south: 6.7, west: 80.35, east: 80.5 },
  Balangoda: { north: 6.75, south: 6.65, west: 80.6, east: 80.75 },
  Eheliyagoda: { north: 6.95, south: 6.85, west: 80.25, east: 80.4 },
  Elapattha: { north: 6.8, south: 6.7, west: 80.5, east: 80.65 },
  Embilipitiya: { north: 6.45, south: 6.35, west: 80.85, east: 81.0 },
  Godakawela: { north: 6.6, south: 6.5, west: 80.65, east: 80.8 },
  Imbulpe: { north: 6.75, south: 6.65, west: 80.55, east: 80.7 },
  Kahawatta: { north: 6.75, south: 6.65, west: 80.4, east: 80.55 },
  Kalawana: { north: 6.85, south: 6.75, west: 80.4, east: 80.55 },
  Kiriella: { north: 6.95, south: 6.85, west: 80.3, east: 80.45 },
  Kolonna: { north: 6.5, south: 6.4, west: 80.75, east: 80.9 },
  Kuruvita: { north: 6.9, south: 6.8, west: 80.4, east: 80.55 },
  Nivithigala: { north: 6.85, south: 6.75, west: 80.35, east: 80.5 },
  Opanayaka: { north: 6.7, south: 6.6, west: 80.5, east: 80.65 },
  Pelmadulla: { north: 6.8, south: 6.7, west: 80.55, east: 80.7 },
  Ratnapura: { north: 6.8, south: 6.7, west: 80.35, east: 80.5 },
  Weligepola: { north: 6.6, south: 6.5, west: 80.5, east: 80.65 },
  Badulla: { north: 7.05, south: 6.95, west: 80.7, east: 80.85 },
  Bandarawela: { north: 6.92, south: 6.82, west: 80.95, east: 81.1 },
  Ella: { north: 6.9, south: 6.8, west: 81.0, east: 81.15 },
  Haldummulla: { north: 6.85, south: 6.75, west: 80.95, east: 81.1 },
  "Hali-Ela": { north: 7.0, south: 6.9, west: 80.8, east: 80.95 },
  Haputale: { north: 6.85, south: 6.75, west: 80.9, east: 81.05 },
  Kandaketiya: { north: 7.1, south: 7.0, west: 80.8, east: 80.95 },
  Lunugala: { north: 7.25, south: 7.15, west: 81.0, east: 81.15 },
  Mahiyanganaya: { north: 7.35, south: 7.25, west: 80.9, east: 81.05 },
  Meegahakivula: { north: 7.2, south: 7.1, west: 80.95, east: 81.1 },
  Passara: { north: 7.15, south: 7.05, west: 81.0, east: 81.15 },
  Rideemaliyadda: { north: 7.35, south: 7.25, west: 81.0, east: 81.15 },
  Soranathota: { north: 7.1, south: 7.0, west: 80.85, east: 81.0 },
  "Uva-Paranagama": { north: 6.95, south: 6.85, west: 80.8, east: 80.95 },
  Welimada: { north: 6.95, south: 6.85, west: 80.9, east: 81.05 },
  Badalkumbura: { north: 6.95, south: 6.85, west: 81.2, east: 81.35 },
  Bibile: { north: 7.1, south: 7.0, west: 81.2, east: 81.35 },
  Buttala: { north: 6.85, south: 6.75, west: 81.2, east: 81.35 },
  Katharagama: { north: 6.4, south: 6.3, west: 81.35, east: 81.5 },
  Madulla: { north: 7.05, south: 6.95, west: 81.25, east: 81.4 },
  Medagama: { north: 7.15, south: 7.05, west: 81.15, east: 81.3 },
  Moneragala: { north: 6.9, south: 6.8, west: 81.25, east: 81.4 },
  Sevanagala: { north: 6.6, south: 6.5, west: 81.15, east: 81.3 },
  Siyambalanduwa: { north: 7.0, south: 6.9, west: 81.35, east: 81.5 },
  Thanamalvila: { north: 6.6, south: 6.5, west: 81.25, east: 81.4 },
  Wellawaya: { north: 6.8, south: 6.7, west: 81.1, east: 81.25 },
  Colombo: { north: 6.95, south: 6.85, west: 79.85, east: 80.0 },
  Dehiwala: { north: 6.88, south: 6.8, west: 79.85, east: 79.95 },
  Homagama: { north: 6.87, south: 6.75, west: 79.95, east: 80.05 },
  Kaduwela: { north: 6.95, south: 6.85, west: 79.95, east: 80.1 },
  Kesbewa: { north: 6.85, south: 6.75, west: 79.9, east: 80.0 },
  Kolonnawa: { north: 6.95, south: 6.85, west: 79.9, east: 80.0 },
  Kotte: { north: 6.92, south: 6.82, west: 79.9, east: 80.0 },
  Maharagama: { north: 6.87, south: 6.77, west: 79.9, east: 80.0 },
  Moratuwa: { north: 6.83, south: 6.73, west: 79.88, east: 79.98 },
  Padukka: { north: 6.85, south: 6.75, west: 80.0, east: 80.1 },
  Ratmalana: { north: 6.85, south: 6.75, west: 79.9, east: 79.98 },
  Seethawaka: { north: 6.95, south: 6.85, west: 80.05, east: 80.15 },
  Thimbirigasyaya: { north: 6.92, south: 6.85, west: 79.9, east: 80.0 },
  Attanagalla: { north: 7.15, south: 7.05, west: 80.05, east: 80.2 },
  Biyagama: { north: 6.95, south: 6.85, west: 79.95, east: 80.1 },
  Divulapitiya: { north: 7.3, south: 7.2, west: 79.85, east: 80.0 },
  Dompe: { north: 7.0, south: 6.9, west: 80.0, east: 80.15 },
  Gampaha: { north: 7.1, south: 7.0, west: 79.95, east: 80.1 },
  "Ja-Ela": { north: 7.1, south: 7.0, west: 79.85, east: 80.0 },
  Katana: { north: 7.25, south: 7.15, west: 79.85, east: 80.0 },
  Kelaniya: { north: 6.98, south: 6.88, west: 79.9, east: 80.0 },
  Mahara: { north: 7.05, south: 6.95, west: 79.95, east: 80.1 },
  Minuwangoda: { north: 7.2, south: 7.1, west: 79.95, east: 80.1 },
  Mirigama: { north: 7.3, south: 7.2, west: 80.0, east: 80.15 },
  Negombo: { north: 7.25, south: 7.15, west: 79.85, east: 79.98 },
  Wattala: { north: 7.0, south: 6.9, west: 79.85, east: 80.0 },
  Agalawatta: { north: 6.65, south: 6.55, west: 80.1, east: 80.25 },
  Bandaragama: { north: 6.75, south: 6.65, west: 79.95, east: 80.1 },
  Beruwala: { north: 6.5, south: 6.4, west: 79.95, east: 80.1 },
  Bulathsinhala: { north: 6.65, south: 6.55, west: 80.05, east: 80.2 },
  Dodangoda: { north: 6.6, south: 6.5, west: 80.0, east: 80.15 },
  Horana: { north: 6.75, south: 6.65, west: 80.0, east: 80.15 },
  Ingiriya: { north: 6.75, south: 6.65, west: 80.05, east: 80.2 },
  Kalutara: { north: 6.6, south: 6.5, west: 79.95, east: 80.1 },
  Madurawela: { north: 6.7, south: 6.6, west: 80.0, east: 80.15 },
  Mathugama: { north: 6.55, south: 6.45, west: 80.05, east: 80.2 },
  Millaniya: { north: 6.7, south: 6.6, west: 80.0, east: 80.15 },
  Palindanuwara: { north: 6.65, south: 6.55, west: 80.1, east: 80.25 },
  Panadura: { north: 6.75, south: 6.65, west: 79.9, east: 80.05 },
  Walallavita: { north: 6.55, south: 6.45, west: 80.1, east: 80.25 },
  Peradeniya: { north: 7.272, south: 7.254, west: 80.591, east: 80.606 },
  Kadugannawa: { north: 7.289, south: 7.274, west: 80.512, east: 80.531 },
  Pilimathalawa: { north: 7.263, south: 7.249, west: 80.53, east: 80.544 },
  Gelioya: { north: 7.216, south: 7.2, west: 80.579, east: 80.595 },
};

export default townBoundingBoxes;
