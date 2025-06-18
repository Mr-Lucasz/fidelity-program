const admin = require('firebase-admin');
console.log('1. Admin SDK imported.'); // Adicione este log
const serviceAccount = require('./fidelity-program-bf5fe-firebase-adminsdk-86wjd-344d211d1e.json'); // ajuste o caminho
console.log('2. Service account key loaded.'); // Adicione este log

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
console.log('3. Firebase Admin app initialized.'); // Adicione este log


const db = admin.firestore();
console.log('4. Firestore instance obtained.'); // Adicione este log


async function seedDatabase() {
  console.log('5. seedDatabase function started.'); // Adicione este log
  try {
    // Rewards
    console.log('6. Attempting to insert Reward rewardId1...'); // Adicione este log
    await db.collection('rewards').doc('rewardId1').set({
      name: "Desconto de 10%",
      points: 50,
      used: false
    });
    console.log('7. Reward rewardId1 inserido'); // Este você já tem

    console.log('8. Attempting to insert Reward rewardId2...'); // Adicione este log
    await db.collection('rewards').doc('rewardId2').set({
      name: "Sobremesa Grátis",
      points: 100,
      used: false
    });
    console.log('9. Reward rewardId2 inserido'); // Este você já tem

    // Restaurants
    console.log('10. Attempting to insert Restaurante restauranteId1...'); // Adicione este log
    await db.collection('restaurants').doc('restauranteId1').set({
      name: "Sushi CEAVI"
    });
    console.log('11. Restaurante restauranteId1 inserido'); // Este você já tem

    // QR Codes (sem userId/timestamp)
    console.log('12. Attempting to insert QR Code qrCodeId1...'); // Adicione este log
    await db.collection('qrCodes').doc('qrCodeId1').set({
      restaurantId: "restauranteId1",
      pointsRedeem: 50
    });
    console.log('13. QR Code qrCodeId1 inserido'); // Este você já tem


    console.log('14. Database seeded!'); // Este você já tem
    process.exit(0);
  } catch (error) {
    console.error('15. Erro ao popular o banco:', error); // Adicione um marcador aqui
    process.exit(1);
  }
}

console.log('16. Calling seedDatabase function...'); // Adicione este log
seedDatabase();
console.log('17. seedDatabase function called. Script is now waiting for async operations...'); // Adicione este log
