// src/data/itemFields.js

export const itemFields = {
  "mobile-phones": {
    fields: [
      {
        name: "Brand",
        type: "select",
        options: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Oppo", "Vivo", "Realme", "Google", "Motorola"],
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
          Motorola: ["Moto G60", "Moto Edge 20", "Moto G71"],
        },
      },
      { name: "Storage", type: "select", options: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
      { name: "Year", type: "number" },
      { name: "Price", type: "number" },
    ],
  },

  "laptops": {
    fields: [
      {
        name: "Brand",
        type: "select",
        options: ["Dell", "HP", "Apple", "Lenovo", "Asus", "Acer", "MSI", "Microsoft"],
      },
      {
        name: "Model",
        type: "select",
        dependsOn: "Brand",
        options: {
          Dell: ["Inspiron 15", "XPS 13", "XPS 15", "Latitude 5420"],
          HP: ["Pavilion 15", "Spectre x360", "Envy 13", "Omen 16"],
          Apple: ["MacBook Air M1", "MacBook Air M2", "MacBook Pro 13", "MacBook Pro 16"],
          Lenovo: ["ThinkPad X1", "Yoga Slim 7", "IdeaPad 3", "Legion 5"],
          Asus: ["ZenBook 14", "ROG Strix G15", "VivoBook S14"],
          Acer: ["Aspire 5", "Swift 3", "Predator Helios 300"],
          MSI: ["GF63 Thin", "Stealth 15M", "Pulse GL66"],
          Microsoft: ["Surface Laptop 4", "Surface Laptop Studio"],
        },
      },
      { name: "RAM", type: "select", options: ["4GB", "8GB", "16GB", "32GB"] },
      { name: "Storage", type: "select", options: ["256GB", "512GB", "1TB", "2TB"] },
      { name: "Year", type: "number" },
      { name: "Price", type: "number" },
    ],
  },
};
