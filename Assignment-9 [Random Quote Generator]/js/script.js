const qoute = {
    quotes: [
        {
            quote: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            quote: "Believe you can and you're halfway there.",
            author: "Theodore Roosevelt"
        },
        {
            quote: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt"
        },
        {
            quote: "The best way to predict the future is to invent it.",
            author: "Alan Kay"
        },
        {
            quote: "It's so easy to sit up and take notice, what's difficult is getting up and taking action.",
            author: "John F. Kennedy"
        },
        {
            quote: "Be yourself; everyone else is already taken",
            author:"Oscar Wilde"
        },
        {
            quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
            author: "Albert Einstein"
        },
        {
            quote: "Be the change that you wish to see in the world.",
            author: "Mahatma Gandhi"
        },
        {
            quote: "You are in danger of living a life so comfortable and soft, that you will die without ever realizing your true potential.",
            author: "David Goggins"
        },
        {
            quote: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
            author: "Dr. Seuss"
        },
        {
            quote: "To live is the rarest thing in the world. Most people exist, that is all",
            author: "Oscar Wilde"
        },
        {
            quote: "The biggest adventure you can take is to live the life of your dreams.",
            author: "Oprah Winfrey"
        },
        {
            quote: "In the end, we will remember not the words of our enemies, but the silence of our friends",
            author: "Martin Luther King Jr."
        },
        {
            quote:"A room without books is like a body without a soul.",
            author: "Marcus Tullius Cicero"
        },
    ]
};

const btn = document.getElementById('generate-btn');
const qouteText = document.getElementById('qoute-text');
const authorText = document.getElementById('author-text');

let lastIndex = -1;

btn.onclick = function() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * qoute.quotes.length);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;
    const randomQuote = qoute.quotes[randomIndex];
    qouteText.textContent = randomQuote.quote;
    authorText.textContent = randomQuote.author;
    console.log(randomQuote); // for testing and debugging
};

