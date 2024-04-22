import axios from "axios";


export const transalte = async (originalObject: Object) => {
    const Amharic = await transalteOneLanguage(originalObject, 'am');
    const Oromifa = await transalteOneLanguage(originalObject, 'om');
    const Arabic = await transalteOneLanguage(originalObject, 'ar');
    const French = await transalteOneLanguage(originalObject, 'fr');
    const Chinese = await transalteOneLanguage(originalObject, 'zh-CN');

    return { Amharic, Oromifa, Arabic, French, Chinese }
}
const transalteOneLanguage = async function translateText(originalObject: Object, targetLanguage: string) {

    const translatedObject = {};
    for (const key in originalObject) {
        if (originalObject.hasOwnProperty(key)) {
            if (key == "_id" || key == "email" || key == 'photo' ||
                key == 'phoneNumber' || key == 'phone' || key == 'price'
                || key == 'facebook' || key == 'linkedin' || key == 'website' || key == 'x' || key == 'telegram' || key == 'instagram'
                || key == 'mapLink' || key == 'logo' || key == 'coverPhoto' || key == 'removeImages' || key == "gallery" ||
                key == "hour" || key == 'categories' || key == "accountNumber" || key == 'tinNumber' || key == "minPrice"
            ) {
                translatedObject[key] = originalObject[key];
            } else {
                const textToTranslate = originalObject[key];
                try {
                    const response = await axios.get(`https://translation.googleapis.com/language/translate/v2?target=${targetLanguage}&key=${process.env.TRANSLATION_APIKEY}&q=${textToTranslate}`)
                    const translation = response?.data?.data?.translations?.[0]?.translatedText
                    translatedObject[key] = translation;
                } catch (error) {
                    console.error(`Error translating ${key}: ${error.message}`);
                }
            }
        }
    }
    return translatedObject;
}


export const translateText = async (text: string) => {
    const Amharic = await translateTextOnly(text, 'am');
    const Oromifa = await translateTextOnly(text, 'om');
    const Arabic = await translateTextOnly(text, 'ar');
    const French = await translateTextOnly(text, 'fr');
    const Chinese = await translateTextOnly(text, 'zh-CN');
    return { Amharic, Oromifa, Arabic, French, Chinese }
}
const translateTextOnly = async function translateText(text: string, targetLanguage: string) {
    try {
        const response = await axios.get(`https://translation.googleapis.com/language/translate/v2?target=${targetLanguage}&key=${process.env.TRANSLATION_APIKEY}&q=${text}`)
        const translation = response?.data?.data?.translations?.[0]?.translatedText
        return translation
    } catch (error) {
        console.error('Error during translation:', error.message);
    }

}