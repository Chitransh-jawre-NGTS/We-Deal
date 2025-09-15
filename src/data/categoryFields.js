// src/data/categoryFields.js
export const categoryData = {
  cars: {
    fields: [
      { 
        name: "Brand", 
        type: "select", 
        options: ["Maruti", "Hyundai", "Tata", "Honda", "Mahindra", "Toyota", "Kia", "Ford", "BMW", "Mercedes"]
      },
      { 
        name: "Model", 
        type: "select", 
        dependsOn: "Brand", 
        options: {
          Maruti: ["Swift", "Baleno", "Dzire", "WagonR", "Ertiga", "Brezza"],
          Hyundai: ["i20", "Creta", "Venue", "Verna", "i10", "Alcazar"],
          Tata: ["Nexon", "Altroz", "Harrier", "Safari", "Punch", "Tiago"],
          Honda: ["City", "Amaze", "WRV", "Jazz", "Civic"],
          Mahindra: ["Scorpio", "XUV500", "Bolero", "Thar", "XUV700"],
          Toyota: ["Fortuner", "Innova Crysta", "Glanza", "Camry", "Corolla"],
          Kia: ["Seltos", "Sonet", "Carens"],
          Ford: ["EcoSport", "Endeavour", "Figo"],
          BMW: ["X1", "X5", "3 Series", "5 Series", "7 Series"],
          Mercedes: ["C-Class", "E-Class", "GLA", "GLC", "GLE"]
        }
      },
      { name: "Year", type: "text" },
      { name: "Price", type: "text" }
    ]
  },

  motorcycles: {
    fields: [
      { 
        name: "Brand", 
        type: "select", 
        options: ["Hero", "Honda", "Yamaha", "Bajaj", "Royal Enfield", "KTM", "Suzuki", "TVS"]
      },
      { 
        name: "Model", 
        type: "select", 
        dependsOn: "Brand", 
        options: {
          Hero: ["Splendor", "HF Deluxe", "Glamour", "Passion Pro"],
          Honda: ["Shine", "Unicorn", "Activa", "Hornet 2.0"],
          Yamaha: ["R15", "FZ", "MT-15", "Fascino"],
          Bajaj: ["Pulsar 150", "Pulsar NS200", "Dominar 400", "Platina"],
          RoyalEnfield: ["Classic 350", "Bullet 350", "Himalayan", "Meteor 350"],
          KTM: ["Duke 200", "Duke 390", "RC 200", "RC 390"],
          Suzuki: ["Gixxer", "Access 125", "Burgman Street"],
          TVS: ["Apache RTR 160", "Apache RR310", "Jupiter", "Ntorq"]
        }
      },
      { name: "Year", type: "text" },
      { name: "Price", type: "text" }
    ]
  },

  "mobile-phones": {
    fields: [
      { 
        name: "Brand", 
        type: "select", 
        options: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Oppo", "Vivo", "Realme", "Google", "Motorola"]
      },
      { 
        name: "Model", 
        type: "select", 
        dependsOn: "Brand", 
        options: {
          Apple: ["iPhone 13", "iPhone 13 Pro", "iPhone 14", "iPhone 14 Pro", "iPhone 15"],
          Samsung: ["Galaxy S22", "Galaxy S23", "Galaxy A52", "Galaxy A73", "Galaxy M33", "Galaxy Z Fold 4"],
          OnePlus: ["OnePlus 9", "OnePlus 9 Pro", "OnePlus 10T", "OnePlus Nord 2", "OnePlus Nord CE 2"],
          Xiaomi: ["Redmi Note 10", "Redmi Note 11", "Mi 11X", "Mi 12 Pro"],
          Oppo: ["Reno 6", "Reno 7", "F19 Pro", "A74"],
          Vivo: ["V21", "V23", "Y20", "Y21"],
          Realme: ["Realme 8", "Realme 9 Pro", "Realme GT Master"],
          Google: ["Pixel 6", "Pixel 6a", "Pixel 7", "Pixel 7 Pro"],
          Motorola: ["Moto G60", "Moto Edge 20", "Moto G71"]
        }
      },
      { name: "Storage", type: "select", options: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
      { name: "Price", type: "text" }
    ]
  }
};
