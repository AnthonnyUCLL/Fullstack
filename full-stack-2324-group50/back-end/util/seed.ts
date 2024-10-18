
import { PrismaClient } from "@prisma/client";
import { set } from "date-fns";
import userService from "../service/user.service";
import personService from "../service/person.service";
import chatService from "../service/chat.service";
import messageService from "../service/message.service";

require('dotenv').config();
const prisma = new PrismaClient();

const main = async () => {
    await prisma.message.deleteMany();
    await prisma.chat.deleteMany();
    await prisma.person.deleteMany();
    await prisma.user.deleteMany();

    //Maak User Greetje aan met haar Person

    const user_greetje = await userService.addUser({
        rnummer: "r0123456",
        password: "greetjej123",
        email: "Greetjej@ucll.be",
        role: "User"
    });

    const person_greetje = await personService.addPerson({
        username: "greetjej",
        age: 45,
        nationality: "Belgisch",
        userId: 1
    });

    const id_greetje = 1

    //Maak User Elke aan met haar Person

    const user_elke = await userService.addUser({
        rnummer: "r0234567",
        password: "elkes123",
        email: "Elkes@ucll.be",
        role: "Admin"
    });

    const person_elke = await personService.addPerson({
        username: "elkes",
        age: 35,
        nationality: "Belgisch",
        userId: 2
    });

    const id_elke = 2 

    //Maak User Johan aan met zijn Person

    const user_johan = await userService.addUser({
        rnummer: "r0345678",
        password: "johanp123",
        email: "Johanp@ucll.be",
        role: "User"
    });

    const person_johan = await personService.addPerson({
        username: "Johanp",
        age: 35,
        nationality: "Belgisch",
        userId: 3
    });

    const id_johan = 3

    // Maak User Admin aan 

    const user_Admin = await userService.addUser({
        rnummer: "r0886633",
        password: "admin123",
        email: "Admin@ucll.be",
        role: "Admin"
    });

    const person_Admin = await personService.addPerson({
        username: "admin",
        age: 20,
        nationality: "Belgisch",
        userId: 4
    });

    // Maak een user nikolai aan

    const user_nikolai = await userService.addUser({
        rnummer: "r0775522",
        password: "nikolai123",
        email: "Nikolai@ucll.be",
        role: "User"
    });

    const person_nikolai = await personService.addPerson({
        username: "Nikolai",
        age: 21,
        nationality: "Luxemburg",
        userId: 5
    });

    //Maak de verschillende chats aan

    const chat_1 = await chatService.addChat()

    const id_chat_1 = 1

    const chat_2 = await chatService.addChat()

    const id_chat_2 = 2

    const chat_3 = await chatService.addChat()

    const id_chat_3 = 3

    const chat_4 = await chatService.addChat()

    //Link personen aan de chats
    const linked_greetje_to_chat_1 = await personService.linkPersonToChat(id_greetje, id_chat_1);
    const linked_greetje_to_chat_2 = await personService.linkPersonToChat(id_greetje, id_chat_2);

    const linked_elke_to_chat_1 = await personService.linkPersonToChat(id_elke, id_chat_1);
    const linked_elke_to_chat_3 = await personService.linkPersonToChat(id_elke, id_chat_3);

    const linked_johan_to_chat_2 = await personService.linkPersonToChat(id_johan, id_chat_2);
    const linked_johan_to_chat_3 = await personService.linkPersonToChat(id_johan, id_chat_3);

    //Conversatie 1 tussen Greetje en Elke 

    const message_greetje_to_elke_1 = await messageService.addMessage({
        text: "Hey hoe gaat het Elke ?",
        chatId: id_chat_1,
        personId: id_greetje
    })

    const message_elke_to_greetje_1 = await messageService.addMessage({
        text: "Goed en jij ?",
        chatId: id_chat_1,
        personId: id_elke
    })

    const message_greetje_to_elke_2 = await messageService.addMessage({
        text: "Ook goed, wat zijt ge bezig?",
        chatId: id_chat_1,
        personId: id_greetje
    })

    const message_elke_to_greetje_2 = await messageService.addMessage({
        text: "Ik ben het fullstack project van 2 studenten aan het verbeteren. Echt heel goed gemaakt.",
        chatId: id_chat_1,
        personId: id_elke
    })

    const message_elke_to_greetje_3 = await messageService.addMessage({
        text: "Ik ga hun sowieso een goed resultaat geven",
        chatId: id_chat_1,
        personId: id_elke
    })

//Conversatie 2 tussen Greetje en Johan     

    const message_johan_to_greetje_1 = await messageService.addMessage({
        text: "Goedemorgen! Heb je de nieuwe ontwikkelingen in JavaScript gezien? Die kunnen echt van invloed zijn op ons curriculum.",
        chatId: id_chat_2,
        personId: id_johan
    })

    const message_johan_to_greetje_2 = await messageService.addMessage({
        text: "Wat denk je ervan om de focus te verschuiven naar de nieuwste features, of moeten we nog steeds de nadruk leggen op de basisprincipes?",
        chatId: id_chat_2,
        personId: id_johan
    })

    const message_greetje_to_johan_1 = await messageService.addMessage({
        text: "Goedemorgen! Ja, ik heb de updates bekeken. Het is een interessant punt. Ik denk dat we een goede balans moeten vinden. Laten we de studenten de fundamenten leren, maar ook ruimte laten voor geavanceerdere onderwerpen om ze up-to-date te houden met de industrie.",
        chatId: id_chat_2,
        personId: id_greetje
    })

    const message_johan_to_greetje_3 = await messageService.addMessage({
        text: "Dat klinkt als een verstandige aanpak. Misschien kunnen we overwegen een extra module toe te voegen voor geavanceerde JavaScript-concepten en frameworks. Wat vind je daarvan?",
        chatId: id_chat_2,
        personId: id_johan
    })

    const message_greetje_to_johan_2 = await messageService.addMessage({
        text: "Zeker, laten we dat doen. Ik denk dat het ook waardevol zou zijn om gastdocenten uit de industrie uit te nodigen. Ze kunnen de studenten inzicht geven in real-world toepassingen. Wat denk je daarvan?",
        chatId: id_chat_2,
        personId: id_greetje
    })

    const message_johan_to_greetje_4 = await messageService.addMessage({
        text: "Dat is een uitstekend idee. Laten we volgende week een vergadering plannen om dit verder te bespreken en ons curriculum bij te werken.",
        chatId: id_chat_2,
        personId: id_johan
    })

//Conversatie 3 tussen Greetje en Johan 

    const message_elke_to_johan_1 = await messageService.addMessage({
        text: "Hey, bellen we morgen voor het fullstack project ?",
        chatId: id_chat_3,
        personId: id_greetje
    })

    const message_johan_to_elke_1 = await messageService.addMessage({
        text: "Ik heb je bericht ontvangen, maar ik denk dat het voor iemand anders was. ",
        chatId: id_chat_3,
        personId: id_elke
    })

    const message_elke_to_johan_2 = await messageService.addMessage({
        text: "Oh ja inderdaad, excuseer voor de storing",
        chatId: id_chat_3,
        personId: id_greetje
    })
}

main();