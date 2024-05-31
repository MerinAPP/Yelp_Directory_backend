export function generateRandom4DigitString() {
  const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
  return String(random4DigitNumber);
}
export function generateRandomNumber(length: number) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10); // generates a random digit (0-9)
  }
  return result;
}

export function getRandomValueFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function formatPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.startsWith("+251")) {
    return phoneNumber;
  } else if (phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
    return "+251" + phoneNumber.substring(1);
  } else {
    return phoneNumber;
  }
}



export function generateUniqueID() {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
  const randomChars = Math.random().toString(36).substring(2, 8); // Generate random characters
  return timestamp + randomChars; // Combine timestamp and random characters
}