export type ChapterSlug = "love" | "longing" | "heartbreak" | "the-self" | "hope" | "tribute";
export type Script = "latin" | "devanagari" | "telugu";

export interface Chapter {
  slug: ChapterSlug;
  numeral: string;
  title: string;
  epigraph: string;
  /** Primary, secondary and deep tones used by shaders and gradients. */
  palette: [string, string, string];
  glyph: string;
}

export interface Poem {
  slug: string;
  title: string;
  /** English rendering of a non-English title. */
  translation?: string;
  note?: string;
  language: "English" | "Hindi / Urdu" | "Telugu";
  script: Script;
  chapter: ChapterSlug;
  text: string;
  unfinished?: boolean;
}

export const chapters: Chapter[] = [
  {
    slug: "love",
    numeral: "I",
    title: "Love",
    epigraph: "First glances, quiet devotion, and the madness of loving someone.",
    palette: ["#f2b8a2", "#c9546a", "#2a0b16"],
    glyph: "❦",
  },
  {
    slug: "longing",
    numeral: "II",
    title: "Longing",
    epigraph: "Waiting, remembering, and the ache of what might have been.",
    palette: ["#b8c7f2", "#5a6fb8", "#0a1030"],
    glyph: "☾",
  },
  {
    slug: "heartbreak",
    numeral: "III",
    title: "Heartbreak",
    epigraph: "Loss, silence, and a love that never learned how to die.",
    palette: ["#e8848a", "#8e1b2a", "#1a0406"],
    glyph: "✕",
  },
  {
    slug: "the-self",
    numeral: "IV",
    title: "The Self",
    epigraph: "Who am I — the monster, the morning, and the one who stands alone.",
    palette: ["#cfd2d8", "#6d7280", "#0d0e12"],
    glyph: "◐",
  },
  {
    slug: "hope",
    numeral: "V",
    title: "Hope",
    epigraph: "Rain or sky, rise and reach.",
    palette: ["#ffd9a0", "#e08a3c", "#2a1406"],
    glyph: "☀",
  },
  {
    slug: "tribute",
    numeral: "VI",
    title: "Tribute",
    epigraph: "For Mahanati Savitri — a memory that time cannot erase.",
    palette: ["#f3e4b5", "#b8973f", "#1c1608"],
    glyph: "✦",
  },
];

export const poems: Poem[] = [
  // ─────────────────────────────── I · LOVE
  {
    slug: "she-shines",
    title: "She Shines",
    language: "English",
    script: "latin",
    chapter: "love",
    text: `She shines like the moon, so bright and fair,
Her voice is like a melody, floating in the air,
Her fragrance is like flowers in full bloom,
Every smile of hers lights up the room.

Without her, my world feels tight and small,
With her presence, I feel I have it all.
Her laughter, so sweet, fills my heart with cheer,
In her smile, my happiness is always near.

She is a beauty like none before,
A symphony of grace, forevermore.
Her voice, a melody, soft and true,
Echoes in my heart, a love that grew.

Each sorrow she carries, a whisper of pain,
Yet in her embrace, I find peace again.
Her smile, a beacon and a guiding light,
Gives purpose to my days, and makes them bright.

Her energy flows, a wave so serene,
Her presence, a calm like I’ve never seen.
Her eyes, like stars, in the darkest night,
Sparkle with love, a radiant light.

Her gaze, a caress, tender and sweet,
A touch that makes my world complete.
Her love fills my heart with endless grace,
A unique tenderness, none can replace.`,
  },
  {
    slug: "thousands-see-her",
    title: "Thousands See Her",
    language: "English",
    script: "latin",
    chapter: "love",
    text: `Thousands see her, yet none perceive,
The way her presence makes me believe.
To them, she’s just a fleeting sight,
To me, she’s the sun, the stars, the night.

In crowds, she walks with effortless grace,
Yet I alone know what lies beneath that face.
The depth of kindness in her eyes so deep,
The gentle promises she makes and keeps.

She lights the world with her mere presence,
Yet remains humble, a quiet essence.
While others chase what glitters and gleams,
She fills the silence with whispered dreams.

A thousand hearts may see her beauty true,
But none will ever feel what I feel for you.`,
  },
  {
    slug: "unseen-yet-infinite",
    title: "Unseen, Yet Infinite",
    note: "A second telling of “Thousands See Her”",
    language: "English",
    script: "latin",
    chapter: "love",
    text: `They speak to her with borrowed lines,
I carve my love in endless rhymes.
Many may chase, may long, may yearn,
But my heart for her will forever burn.

She’s not just beauty, she’s the air I breathe,
The sky I paint, the fate I weave.
They may admire, they may fall,
But my madness outshines them all.`,
  },
  {
    slug: "it-began-with-a-glance",
    title: "It Began with a Glance",
    language: "English",
    script: "latin",
    chapter: "love",
    text: `It began with a glance so rare,
A spark of charm hung in the air.
In whispers soft, the rains did fall,
And love embraced us—heart and all.

A moment froze, a breath suspended,
Where two souls perfectly blended.
Your eyes held stories yet untold,
A warmth that put away the cold.

In that instant, time stood still,
Your presence bent my very will.
A glance transformed into a flame,
Nothing would ever be the same.

What started as a fleeting sight,
Became my guiding star, my light.`,
  },
  {
    slug: "in-her-eyes",
    title: "In Her Eyes",
    language: "English",
    script: "latin",
    chapter: "love",
    text: `In her eyes, I saw the sky so bright,
Her voice was soft, a sweet delight.
Her hair flowed gently, dark as night,
A smile so warm, it felt just right.

Every time her name came up, I’d blush and turn red,
Thinking of her, the warmth in me spread.
Every time she spoke, my heart would explode,
I wished it never ended, in that moment, I glowed.

She was sweet, caring, like a soft embrace,
Though the love I felt, she never could trace.
For unspoken feelings, deep and true,
Were the things I wished she only knew.`,
  },
  {
    slug: "wo-ladki",
    title: "Woh Ladki",
    translation: "That girl",
    language: "Hindi / Urdu",
    script: "latin",
    chapter: "love",
    text: `Woh ladki… ek khwab thi, jo meri tanhaayi ka sach ban gayi,
Main uske husn ka qaid hoon, aur yeh qaid meri azaadi ban gayi,
Uski hansi mein chhupa hai mera saara khauf, mera saara sukoon,
Aur main… bas ek shayar, jo uske naam se apni umr likh raha hai.`,
  },
  {
    slug: "junoon-ka-aisa-aalam",
    title: "Junoon Ka Aisa Aalam",
    translation: "The seven stages of love — from a glance to annihilation",
    language: "Hindi / Urdu",
    script: "latin",
    chapter: "love",
    text: `Dilkashi se hui shuruaat, ek nazar mein kho gaye,
Uns ki baarish mein bheege, har lamha Mohabbat ho gaye.
Mohabbat ne rukh badla, ab Aqeedat ki raah chali,
Ibadat ban gaya har ehsaas, har saans mein tera naam basi.

Junoon ka aisa aalam, khud se begaane ho gaye,
Maut bhi muskura uthi, jab tujhmein fana ho gaye.`,
  },
  {
    slug: "pal-pal",
    title: "Pal Pal",
    translation: "Moment by moment",
    language: "Hindi / Urdu",
    script: "latin",
    chapter: "love",
    text: `Pal pal mere chain ko yun churaya aapne,
Ki na paas aaye, na hi door gaye.

Meri aankhon pe aisa jaadu chha gaya,
Ki aapko na chhod sakta hoon, na bhool sakta hoon.

Aise mere dil mein base ho aap,
Jaise Shyam mein basi ho Radha.`,
  },
  {
    slug: "milo-ya-na-milo",
    title: "Milo Ya Na Milo",
    translation: "Whether we meet or not",
    language: "Hindi / Urdu",
    script: "devanagari",
    chapter: "love",
    text: `मिलो या न मिलो तुम मेरे दिल में हमेशा बस जाओगे,
मेरी हर ख़ुशी और हर गम में तुम्ही रहोगे।
तुम्हारी यादों में मैं रात भर जागता हूँ,
और तुम्हारी ख़ुशी की ख़ातिर सब कुछ भूल जाता हूँ।

तुम्हारी मुस्कुराहट ही मेरी ज़िंदगी है,
तुम्हारी गर्मा गर्मी में ही मेरी क़िस्मत है।
मिलो या न मिलो, पर मेरे साथ हमेशा रहना,
क्योंकि तुम मेरी साँसों में, मेरी हर धड़कन में हो।`,
  },

  // ─────────────────────────────── II · LONGING
  {
    slug: "i-miss-you",
    title: "I Miss You",
    language: "English",
    script: "latin",
    chapter: "longing",
    text: `I miss you when the sun shines bright,
And even more in silent night.
I miss the thought of seeing you the next day,
The little things I used to do to make you stay.

I miss the way I would search around,
Hoping you were to be found.
The silly reasons I would make,
Just to talk, for my heart’s sake.

I walked behind, yet stayed unseen,
Imagining things that might have been.
The way you smiled, the way you stared,
Moments I wished that you had cared.

But now the days feel cold and long,
Without you here, it all feels wrong.
I miss it all, the thrill, the cheer,
And most of all, I miss you near.`,
  },
  {
    slug: "the-night-goes-on",
    title: "The Night Goes On",
    language: "English",
    script: "latin",
    chapter: "longing",
    text: `I count the stars, one by one,
The night is long, but sleep won’t come.
I close my eyes, but all I see,
Are memories of you and me.

I miss your voice, I miss your smile,
I wish you’d stay, just for a while.
My heart feels lost, my world is blue,
I don’t know how to live without you.

The night goes on, but time stands still,
I miss you more, I always will.
I hope one day, you will miss me too,
And find your way back, like I want you to.`,
  },
  {
    slug: "echoes-of-you",
    title: "Echoes of You",
    language: "English",
    script: "latin",
    chapter: "longing",
    text: `The stars above still spell your name,
Though time has blurred the burning flame.
I trace the sky and wish you knew,
That every echo leads to you.`,
  },
  {
    slug: "fading-footsteps",
    title: "Fading Footsteps",
    language: "English",
    script: "latin",
    chapter: "longing",
    text: `The paths we walked now stand so still,
The echoes lost against my will.
Each step we took, so full of light,
Now fades into the endless night.`,
  },
  {
    slug: "mere-intezaar-ka-diya",
    title: "Mere Intezaar Ka Diya",
    translation: "The lamp of my waiting",
    language: "Hindi / Urdu",
    script: "devanagari",
    chapter: "longing",
    text: `न चाँद का छाँव मिला, न सूरज की धूप मिली,
मैं तो बस साँझ की हल्की रोशनी में तेरा इंतेज़ार किए बैठा हूँ।
मैंने तेरा इंतेज़ार किया है, कर रहा हूँ और करता रहूँगा,
चाहे तू आए या न आए, मेरे इंतेज़ार का दिया यूँही जलता रहेगा।

तेरे आने की बाट जोहता हूँ हर पल,
तेरी यादों में बिताता हूँ हर लम्हा, हर पल।
हज़ार बार हार मान लेता हूँ, पर फिर से उठ जाता हूँ,
क्योंकि तुम ही मेरी ज़िंदगी हो, तुम ही मेरी मुराद हो।`,
  },
  {
    slug: "jo-socha-tha",
    title: "Jo Socha Tha",
    translation: "What I had imagined",
    language: "Hindi / Urdu",
    script: "devanagari",
    chapter: "longing",
    text: `जो सोचा था, वो बन न सका,
जो चाहा था, वो पास न रहा।
हर राह में बस अँधेरा मिला,
धड़कन में एक तन्हा सवेरा मिला।

तुम्हारी राह में सब कुछ खोया,
पर तुम्हारी यादों में सब कुछ पाया।
तुम्हारे बिना ज़िंदगी सूनी है,
पर तुम्हारे साथ ज़िंदगी पूरी है।

इस साहिल पर अकेले खड़े हैं,
तुम्हारी आहट का इंतेज़ार है।
जब तक तुम न आओ, यह दिल न रुकेगा,
तुम्हारे आने का ख़्वाब न टूटेगा।`,
  },
  {
    slug: "woh-chaandni-thi",
    title: "Woh Chaandni Thi",
    translation: "She was moonlight",
    language: "Hindi / Urdu",
    script: "devanagari",
    chapter: "longing",
    text: `वह चाँदनी थी, जो मेरी ज़िंदगी में रोशनी लाई,
और मैं एक था जो उनके ख्वाब लेकर रह गया।
उसने दोस्ती के अरमान लेकर दिल में बस गई,
और मैंने उसका मोहब्बत का जहान खुद में बसाया।

हर पल उसके साथ एक ख्वाब था,
हर बात उसकी ज़िंदगी का खिताब था।
पर क़िस्मत ने कुछ और ही सोचा था,
और वह दूर चली गई, पर दिल में रह गई।`,
  },
  {
    slug: "zamana-chod-diya",
    title: "Zamana Chhod Diya",
    translation: "The world let go of me",
    language: "Hindi / Urdu",
    script: "devanagari",
    chapter: "longing",
    text: `ज़माना छोड़ दिया मेरा साथ,
शाम-ए-ग़म ने दिया मुझे हाथ।
क़िस्मत यूँ बदल गई मेरी,
जब देखी मैंने चेहरा तेरी।

तेरी मुस्कुराहट ने सदा सुनाई,
तेरे प्यार में हर रात लगाई।
तेरी याद में रातें हों बिताई,
तेरी ख़ुशी ही मेरी ख़ुशी आई।`,
  },
  {
    slug: "purani-aadat",
    title: "Purani Aadat",
    translation: "An old habit",
    language: "Hindi / Urdu",
    script: "latin",
    chapter: "longing",
    text: `Teri khamoshi mein ab meri awaaz kyun nahi rehti…
Kya main ab bhi teri zindagi ka hissa hoon,
Ya sirf ek purani aadat?`,
  },
  {
    slug: "she-stood-like-the-sun",
    title: "She Stood Like the Sun",
    language: "English",
    script: "latin",
    chapter: "longing",
    unfinished: true,
    text: `She stood like the sun, steady and bright,
While I, a dreamer, lost in my night.
Her words were simple, her heart was kind,
But I wove stories within my mind.

She offered friendship, a bond so pure,
Yet I dreamed of a life, of something more.
Her laughter, her presence, a gentle breeze,
But I chased horizons she…`,
  },
  {
    slug: "a-love-unsaid",
    title: "A Love Unsaid",
    language: "English",
    script: "latin",
    chapter: "longing",
    unfinished: true,
    text: `The words I never dared to tell,
Still linger where my heart once fell.
If time could give a second chance,
I…`,
  },

  // ─────────────────────────────── III · HEARTBREAK
  {
    slug: "if-i-see-you-again",
    title: "If I See You Again",
    language: "English",
    script: "latin",
    chapter: "heartbreak",
    text: `If I see you again,
will I be the storm that learned your name,
or the silence that forgot your face?

Will I hate you
for the nights that stitched loneliness into my skin,
or love you harder
because some wounds bloom instead of fade?

Will I fight you
with every shattered promise we left behind,
or fight for you
like a fool chasing a sunrise that never waits?

Perhaps I’ll walk away,
leaving your shadow to haunt empty streets,
while my heart lingers behind,
still calling yours in a language broken by goodbye.

I want you.
That is my sweetest tragedy.

I fear you.
That is my cruelest truth.

Because loving you
felt like holding a flame in winter.
It kept me alive
while quietly turning me to ash.

So if fate is reckless enough
to let our eyes meet again,

don’t ask what I’ll choose.

My heart has buried you a thousand times,
yet every lonely night
it still kneels beside your memory,
placing fresh flowers
on a love that never learned how to die.`,
  },
  {
    slug: "mohabbat-ka-ilzaam",
    title: "Mohabbat Ka Ilzaam",
    translation: "The charge of love",
    language: "Hindi / Urdu",
    script: "latin",
    chapter: "heartbreak",
    text: `Mohabbat ka ilzaam sab seh liya,
Dil bechara khud hi lut gaya.
Jis haath ne ujaale diye the mujhe,
Ussi haath ne aag bhi laga diya.

Ek pal mein sajaya tha jo dil ka shehar,
Wohi pal mein usne mita bhi diya.
Wafa ki raahon mein chhod kar mujhe,
Woh khud hi khuda ban gaya.`,
  },
  {
    slug: "dawa-se-bhi-darta-hoon",
    title: "Dawa Se Bhi Darta Hoon",
    translation: "Now I fear even the cure",
    language: "Hindi / Urdu",
    script: "latin",
    chapter: "heartbreak",
    text: `Dard aisa zehar diya mujhe,
Ke ab dawa se bhi darta hoon.
Shab-e-gham mein tanha bhatakta hoon,
Ke ab har nayi subah se darta hoon.

Bhool jaane ka waqt aaya,
To sajdon mein usi ko yaad karta hoon.
Jise kab ka kho chuka hoon,
Aaj bhi usi pe marta hoon.`,
  },
  {
    slug: "yehi-meri-wafa-hai",
    title: "Yehi Meri Wafa Hai",
    translation: "This is my faithfulness",
    language: "Hindi / Urdu",
    script: "latin",
    chapter: "heartbreak",
    text: `Pyaar mein Khuda jo dekh liya maine,
Har sajde mein tera noor dekh liya maine.

Jaane waalon ko na roka,
Lekin unki khushiyon ki hifazat ki maine.
Apni hasraton ko dafan karke,
Unki muskurahat ki ibaadat ki maine.

Ishq agar yehi hai…
To yehi meri dua hai…
Dard agar yehi hai…
To yehi meri wafa hai…

Har din aur har raat,
Yunhi jee liya maine.
Har saans mein uska naam,
Khamoshi se le liya maine.

Ye kaisi mohabbat likhi tune…
Jeete ji qabr dikha di tune…

Na usse shikayat hai,
Na tujhe ilzaam deta hoon.
Bas itna samajh na paaya,
Mohabbat ka anjaam kyun deta hoon.

Log kehte hain,
Waqt sab kuch bhula deta hai.
Mujhe to har guzarta lamha,
Uski yaad aur gehri kar deta hai.`,
  },
  {
    slug: "khamoshi-hi-meri-zubaan",
    title: "Khamoshi Hi Meri Zubaan",
    translation: "Silence is my only language",
    language: "Hindi / Urdu",
    script: "latin",
    chapter: "heartbreak",
    text: `Main ab unhe awaaz nahin deta hoon…
Kyun? Kyunki agar woh mud kar aa gaye,
To main unki khushi ka qaatil ban jaunga.
Aur agar na aaye…
To qayamat tak aise hi bikhar jaunga.

Isliye…
Ab yeh khamoshi hi meri zubaan hai…
Intezaar hi meri zindagi…
Aur dard hi meri pehchaan…`,
  },
  {
    slug: "aansuon-se-likha",
    title: "Aansuon Se Likha",
    translation: "Written in tears",
    language: "Hindi / Urdu",
    script: "latin",
    chapter: "heartbreak",
    text: `Main usko aansuon se likh raha hoon,
Taaki mere baad koi aur na padh paaye.`,
  },

  // ─────────────────────────────── IV · THE SELF
  {
    slug: "main-hoon-kaun",
    title: "Main Hoon Kaun",
    translation: "Who am I",
    language: "Hindi / Urdu",
    script: "latin",
    chapter: "the-self",
    text: `Aakhir main hoon kaun, sab karne ki zid pe ada hua bachcha,
Ya waqt ke haathon haar gaya, khud se hi lada hua bachcha.
Khwahishein toh hazaar hain, par haathon mein kuch bhi nahi,
Main woh insaan hoon jo jeena chahta hai… par jee nahi raha kabhi.`,
  },
  {
    slug: "the-monster",
    title: "The Monster",
    language: "English",
    script: "latin",
    chapter: "the-self",
    text: `I was never the monster they painted in flame,
Just a whisper of truth with a villain’s name.
In shadows I walked where their judgments grew,
But the darkness they feared was the light I knew.`,
  },
  {
    slug: "the-morning",
    title: "The Morning",
    language: "English",
    script: "latin",
    chapter: "the-self",
    text: `Each morning I wake with a weight on my chest,
A life still breathing, a heart laid to rest.
The sun drags the day through a colorless sky,
While something inside me quietly dies.

The hours crawl past like a slow bleeding wound,
A life half-lived in a hollow cocoon.
No scream, no fire, no thunder to prove,
Just time carving pieces of me as it moves.

And night always comes like a cold, final thief,
Counting the ruins of another day’s grief.
Then sleep takes the rest of whatever was left,
So morning can wake me… a little more dead.`,
  },
  {
    slug: "alone-i-stand",
    title: "Alone I Stand",
    language: "English",
    script: "latin",
    chapter: "the-self",
    text: `Alone I stand, with heart in hand,
Hoping someone will understand.
A quiet soul, a silent plea,
To see the real side of me.

In crowds of many, I feel so lost,
The price of solitude, that I paid the cost.
Looking for a soul who cares so deep,
Someone to hold me, to make me weep.

With joy, not sorrow, but from the core,
Someone who will love me forevermore.
A companion, a friend, a soulmate true,
Someone to turn my grey skies blue.

Until that day, I’ll wait and see,
If someone’s out there meant for me.`,
  },
  {
    slug: "main-duniya-ko-samajh-chuka-hoon",
    title: "Main Duniya Ko Samajh Chuka Hoon",
    translation: "I have understood the world",
    language: "Hindi / Urdu",
    script: "latin",
    chapter: "the-self",
    text: `Main duniya ko samajh chuka hoon,
Har raaz, har kahani jaan chuka hoon.
Phir bhi dhokha khaakar haar gaya hoon.`,
  },
  {
    slug: "the-pursuit",
    title: "The Pursuit",
    language: "English",
    script: "latin",
    chapter: "the-self",
    unfinished: true,
    text: `We chase the horizon, forever seeking the new,
Never satisfied with the beauty we…`,
  },

  // ─────────────────────────────── V · HOPE
  {
    slug: "rise-and-reach",
    title: "Rise and Reach",
    language: "English",
    script: "latin",
    chapter: "hope",
    text: `Rain or sky, don’t let a day slip by,
Keep moving forward, reach for what’s high.
Through every challenge, through every fight,
Push ahead—chase and embrace the light.

When clouds hang low and the world feels slow,
Rise above, let your spirit glow.
No day is wasted, no time stands still,
Keep climbing higher and trust your will.

When shadows linger and winds grow strong,
Stand your ground for you’ve been brave all along.
No time is lost, no dream will fade,
Rise with courage and be unafraid.

So keep on going, reach for the height,
For rain or sky, never let a day slip by.`,
  },
  {
    slug: "i-was-in-darkness",
    title: "I Was in Darkness",
    language: "English",
    script: "latin",
    chapter: "hope",
    unfinished: true,
    text: `I was in darkness, wanted to be alone,
But by your light, a warmth was shown.
You…`,
  },

  // ─────────────────────────────── VI · TRIBUTE
  {
    slug: "mahanati",
    title: "తను ఆకాశ వీధిలో అందాల జాబిలి",
    translation: "Anaganaga oka Mahanati — a tribute to Savitri",
    language: "Telugu",
    script: "telugu",
    chapter: "tribute",
    text: `ఒక పాత్రతో వర్ణించలేము...
ఒక మాటతో చెప్పలేము...
ఆమె గురించి రాయాలంటే
జ్ఞాపకాలే కలం పట్టాలి.

నవ్వితే వెన్నెల కూడా
తన వెలుగును మరిచిపోయేది.
ఏడిస్తే తెర ముందు కూర్చున్న
ప్రతి హృదయం తడిసిపోయేది.

ఆమె కళ్లలో మాటలుండేవి,
ఆమె మౌనంలో కథలుండేవి.
ఆమె తెరపై కనిపిస్తే
ఒక పాత్ర కాదు...
ఒక జీవితం కనిపించేది.

ఆమె అందాన్ని వర్ణించడానికి
కవులకు పదాలు చాలలేదు.
ఆమెను గానంలో బంధించడానికి
గాయకులకు పాటలు చాలలేదు.
ఆమె నటనను కొలవడానికి
కాలానికి సంవత్సరాలు చాలలేదు.

ఎన్నో పేర్లు
కాలనదిలో అలలా వచ్చి వెళ్లిపోయాయి...
కానీ కొన్ని పేర్లు మాత్రమే
కాలం అనే పుస్తకంలో
చెరిగిపోని అక్షరాలవుతాయి.

ఎప్పుడు ఎక్కడ పాత సినిమా చూసినా
ఒక జ్ఞాపకమై వస్తుంది.
పాత పాట వినిపించినా
ఒక రూపమై కళ్లముందు నిలుస్తుంది.

ఆమెను తలుచుకుంటే అనిపిస్తుంది...
కొంతమంది మనుషులు
భూమిపై కొన్నేళ్లు మాత్రమే ఉంటారు,
కానీ మనసుల్లో మాత్రం
శాశ్వతంగా ఉండిపోతారు అని.

బిరుదులు ఎన్ని వచ్చినా,
గౌరవాలు ఎన్ని దక్కినా,
కథను పైవాడు ఎలా రాసినా,
జీవితాన్ని కాలం ఎలా మలిచినా,
తను మాత్రం
మర్చిపోలేని ఒక అందమైన స్మృతి.

దేవదాసులో పార్వతిగా,
మిస్సమ్మలో మేరీగా,
మాయాబజార్‌లో సుందరిగా,
ప్రతి హృదయంలో చిరస్థాయిగా.

తను ఆకాశ వీధిలో అందాల జాబిలి...
అనగనగా ఒక మహానటి.`,
  },
];

/** Lines that drift through the hero sky and the marquee. */
export const fragments: { line: string; slug: string }[] = [
  { line: "some wounds bloom instead of fade", slug: "if-i-see-you-again" },
  { line: "The stars above still spell your name", slug: "echoes-of-you" },
  { line: "a love that never learned how to die", slug: "if-i-see-you-again" },
  { line: "To me, she’s the sun, the stars, the night.", slug: "thousands-see-her" },
  { line: "the darkness they feared was the light I knew", slug: "the-monster" },
  { line: "Main usko aansuon se likh raha hoon", slug: "aansuon-se-likha" },
  { line: "I miss you more, I always will.", slug: "the-night-goes-on" },
  { line: "like holding a flame in winter", slug: "if-i-see-you-again" },
  { line: "Ya sirf ek purani aadat?", slug: "purani-aadat" },
  { line: "Maut bhi muskura uthi, jab tujhmein fana ho gaye", slug: "junoon-ka-aisa-aalam" },
  { line: "Rise with courage and be unafraid.", slug: "rise-and-reach" },
  { line: "So morning can wake me… a little more dead.", slug: "the-morning" },
  { line: "Now fades into the endless night.", slug: "fading-footsteps" },
  { line: "Khamoshi hi meri zubaan hai", slug: "khamoshi-hi-meri-zubaan" },
];

export const getChapter = (slug: string) => chapters.find((c) => c.slug === slug);
export const getPoem = (slug: string) => poems.find((p) => p.slug === slug);
export const poemsIn = (chapter: ChapterSlug) => poems.filter((p) => p.chapter === chapter);

export function neighbours(slug: string) {
  const i = poems.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? poems[i - 1] : poems[poems.length - 1],
    next: i < poems.length - 1 ? poems[i + 1] : poems[0],
  };
}

export const stanzas = (text: string) => text.split(/\n\s*\n/).map((s) => s.split("\n"));

export const firstLine = (p: Poem) => p.text.split("\n")[0];

export const stats = {
  poems: poems.length,
  languages: new Set(poems.map((p) => p.language)).size,
  chapters: chapters.length,
  unfinished: poems.filter((p) => p.unfinished).length,
  lines: poems.reduce((n, p) => n + p.text.split("\n").filter(Boolean).length, 0),
};
