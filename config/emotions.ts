import angry from "../assets/images/angry.png"
import happy from "../assets/images/happy.png"
import sad from "../assets/images/sad.png"
import anxiety from "../assets/images/anxiety.png"
import lonely from "../assets/images/lonely.png"
import thankful from "../assets/images/thankful.png"

interface EmotionItem {
    name: string;
    image: string;
}

interface EmotionsInterface {
    lists: EmotionItem[];
}

export const Emotions: EmotionsInterface = {
    lists: [
        {
            name: "MARAH",
            image: angry.src
        },
        {
            name: "SENANG",
            image: happy.src
        },
        {
            name: "SEDIH",
            image: sad.src
        },
        {
            name: "CEMAS",
            image: anxiety.src
        },
        {
            name: "KESEPIAN",
            image: lonely.src
        },
        {
            name: "BERSYUKUR",
            image: thankful.src
        },
    ]
};