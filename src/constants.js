export const SURPRISE_DATA = {
    // Date format: YYYY-MM-DD
    startDate: "2026-01-10",

    // Jornada (Timeline)
    timeline: [
        { date: "10/01/2026", title: "O começo do sonho", description: "O dia que decidimos passar a vida juntos e o começo da nossa história.", icon: "Star" },
        { date: "10/02/2026", title: "1 mês juntos", description: "Nossa primeira comemoração de infinitas outras que virão.", icon: "Heart" },
    ],

    // Polaroids para "Sobre Nós"
    polaroids: [
        { url: "/assets/foto9.jpeg", caption: "Eu te amo", rotate: -5 },
        { url: "/assets/foto7.jpeg", caption: "O grande dia", rotate: 3 },
        { url: "/assets/foto6.jpeg", caption: "Felicidade", rotate: -3 },
        { url: "/assets/foto5.jpeg", caption: "Bobos", rotate: 5 },
    ],

    images: [
        "/assets/foto1.jpeg",
        "/assets/foto2.jpeg",
        "/assets/foto3.jpeg",
    ],

    // Mensagem principal
    message: "O amor é paciente, o amor é bondoso. Tudo sofre, tudo crê, tudo espera, tudo suporta. ✨",

    // Configuração da Música
    musicSettings: {
        type: 'local',
        url: "/assets/Aliança - Tribalistas (clipe oficial) - MARISAMONTE (youtube).mp3",
        startOffset: 5, // Pula os primeiros 5 segundos (ajustado para sincronia)
        spotifyUrl: "https://open.spotify.com/embed/track/1DLKuppSYytOuxhtI6KBGu?si=f4341373c4c9447e"
    },

    // Tópico 2: Sobre Nós
    aboutUs: {
        title: "Nós Dois",
        description: "Você e eu, somos mais do que namorados. Você é minha amiga, minha companheira e minha futura esposa, seu sorriso é o mais lindo e seu perfume é o mais doces. O jeito que nos conhecemos parecia ser o acaso, mas com o tempo eu percebi que você é uma promessa de Deus para minha vida.",
        content: "Desde o dia que nos conhecemos, minha vida ganhou mais cor. Você trouxe paz pros meus dias ruins e alegria dobrada pros dias bons. Que nossos filhos sejam abençoados pela sua beleza e pelo seu jeito carinhoso."
    },

    // Tópico 3: Motivos para te Amar
    reasons: [
        "Seu sorriso sincero, que dá a razão para minha felicidade.",
        "Seu jeito incrível de me escutar e acalmar meus pensamentos.",
        "Sua inteligência e dedicação, minha preta cursa direito.",
        "O jeito que você tem de valorizar o nosso relacionamento.",
        "A maneira que você apoia os meus projetos para o nosso futuro."
    ],

    // Tópico 4: Nosso Futuro
    future: {
        title: "Sonhos",
        description: "Meu sonho é ter um futuro lindo pela frente. Viagens, conquistas e, acima de tudo, nós dois formando a nossa família feliz.",
        goals: ["Viajar o mundo juntos", "Ter nossa casa dos sonhos", "Construir uma família linda", "Ser feliz todos os dias"]
    },

    // Cartas "Abra Quando..."
    capsules: [
        {
            id: 1,
            title: "Quando estiver triste",
            emoji: "😢",
            color: "from-blue-500 to-indigo-600",
            content: "Lembre-se que você é a pessoa mais forte que eu conheço. E que não importa o quão difícil seja o dia, eu estarei lá torcendo por você e te amando a cada segundo dele. Tudo vai ficar bem!",
            image: "https://placehold.co/400x300/1e1e2e/FFF?text=Nosso+Abraco"
        },
        {
            id: 2,
            title: "Quando sentir saudades",
            emoji: "🥺",
            color: "from-pink-500 to-rose-600",
            content: "Lembre-se dos nossos momentos juntos. Eu estou pensando em você exatamente agora. A distância é apenas um detalhe perto do que ainda vamos viver meu amor, você é tudo pra mim e eu te amo muito.",
            image: "https://placehold.co/400x300/1e1e2e/FFF?text=Vamos+Ficar+Juntos+Para+Sempre"
        },
        {
            id: 3,
            title: "Quando quiser rir",
            emoji: "😂",
            color: "from-yellow-400 to-orange-500",
            content: "Lembre de todos os momentos que nos pegamos dando risada a toa juntos, das nossas piadas, das nossas conversas, e de quando você me pega olhando pra você e sorrindo sem motivo. Você é a minha felicidade.",
            image: "https://placehold.co/400x300/1e1e2e/FFF?text=Seu+Sorriso+Lindo"
        },
        {
            id: 4,
            title: "Para saber o quanto te amo",
            emoji: "💖",
            color: "from-red-500 to-rose-600",
            content: "Eu te amo mais do que ontem e menos do que amanhã. Você é o amor da minha vida, minha melhor amiga e lembre-se você não é minha namorada, é a minha futura esposa.",
            image: "https://placehold.co/400x300/1e1e2e/FFF?text=Eu+Te+Amo"
        }
    ],

    // Desafio / Quiz do Casal
    quiz: {
        title: "Quem sabe mais?",
        reward: {
            title: "Parabéns, Amor!",
            description: "Você acertou tudo! Ganhou um vale massagem!",
            image: "https://placehold.co/400x300/1e1e2e/FFF?text=Vale+Massagem"
        },
        questions: [
            {
                text: "Pergunta 1: (O que eu amo em você?)",
                options: ["Seu sorriso", "TUDO, você é a minha princesa", "Seu cabelo", "Seu gosto musical incrível 😢"],
                correct: 1
            },
            {
                text: "Pergunta 2: (Qual o nosso lugar favorito?)",
                options: ["Qualquer lugar que estejamos juntos", "Cinema", "Restaurante", "Casa"],
                correct: 0
            },
            {
                text: "Pergunta 3: Quantos filhos vamos ter?",
                options: ["1", "2", "3", "Um time de futebol"],
                correct: 1,
                trick: {
                    triggerIndex: 1,
                    changeTo: "Quantos Deus mandar"
                }
            },
            {
                text: "Pergunta 4: Quem ama mais?",
                options: ["EU", "EU", "EU", "EU"],
                correct: [0, 1, 2, 3]
            }
        ]
    },

    // Surpresa do Futuro
    surprise: {
        title: "Uma Surpresa para o Futuro",
        targetDate: "2029-12-25T00:00:00",
        lockedMessage: "Esta surpresa está guardada para um momento especial. Aguarde...",
        unlockedMessage: "Chegou o momento! Clique para revelar.",
        buttonTextLocked: "Trancado a 7 Chaves",
        buttonTextUnlocked: "Abrir Surpresa",
        envelope: {
            from: "De: Seu Amor",
            to: "Para: O Amor da Minha Vida",
            version: 1, // Aumentar o número da versão, para notificar atualizações de cartas
            pages: [
                "Essa cartinha vai funcionar assim: \n\nSempre que eu quiser te mandar um recadinho especial, vou atualizar aqui. \n\nQuando tiver novidade, aquele pontinho vermelho vai aparecer no envelope pra te avisar! 💌",
                "Minha preta, \n\nMe apaixonei pelo seu jeito de me tratar e tratar o nosso relacionamento. Nunca tenha vergonha de demonstrar o amor que temos um pelo outro. \n\nTe amo mais que tudo minha princesa! ❤️",

            ]
        }
    }
};
