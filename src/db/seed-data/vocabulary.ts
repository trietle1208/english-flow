import type { difficultyEnum, partOfSpeechEnum } from "@/db/schema/enums";

export type VocabularySeed = {
  word: string;
  /** Syllable-spelled pronunciation for learners who don't read IPA, e.g. "im-PROOV". */
  pronunciation: string;
  /** IPA transcription, e.g. "/ɪmˈpruːv/". */
  phonetic: string;
  partOfSpeech: (typeof partOfSpeechEnum.enumValues)[number];
  meaning: string;
  exampleSentence: string;
  difficulty: (typeof difficultyEnum.enumValues)[number];
};

/**
 * Real vocabulary content (CLAUDE.md "No fake content"): real IPA, real
 * Vietnamese meanings, real example sentences. Grouped by theme in comments
 * only — the flat array is what `seed.ts` reads; lessons pick words out of
 * it by `word` when building their `vocabulary` content blocks.
 */
export const vocabularySeed: VocabularySeed[] = [
  // --- Daily routine (Everyday English) ---
  { word: "wake up", pronunciation: "WAYK-uhp", phonetic: "/weɪk ʌp/", partOfSpeech: "phrasal_verb", meaning: "thức dậy", exampleSentence: "I wake up at six every morning.", difficulty: "easy" },
  { word: "get up", pronunciation: "GET-uhp", phonetic: "/ɡet ʌp/", partOfSpeech: "phrasal_verb", meaning: "ra khỏi giường", exampleSentence: "She gets up early to catch the bus.", difficulty: "easy" },
  { word: "brush", pronunciation: "BRUHSH", phonetic: "/brʌʃ/", partOfSpeech: "verb", meaning: "đánh (răng), chải (tóc)", exampleSentence: "He brushes his teeth twice a day.", difficulty: "easy" },
  { word: "shower", pronunciation: "SHOW-er", phonetic: "/ˈʃaʊ.ər/", partOfSpeech: "verb", meaning: "tắm vòi sen", exampleSentence: "I shower before breakfast.", difficulty: "easy" },
  { word: "breakfast", pronunciation: "BREK-fuhst", phonetic: "/ˈbrek.fəst/", partOfSpeech: "noun", meaning: "bữa sáng", exampleSentence: "She has breakfast at seven.", difficulty: "easy" },
  { word: "commute", pronunciation: "kuh-MYOOT", phonetic: "/kəˈmjuːt/", partOfSpeech: "verb", meaning: "đi làm/đi học hằng ngày", exampleSentence: "He commutes to work by train.", difficulty: "medium" },
  { word: "routine", pronunciation: "roo-TEEN", phonetic: "/ruːˈtiːn/", partOfSpeech: "noun", meaning: "thói quen hằng ngày", exampleSentence: "My morning routine never changes.", difficulty: "easy" },
  { word: "chore", pronunciation: "CHOR", phonetic: "/tʃɔːr/", partOfSpeech: "noun", meaning: "việc vặt trong nhà", exampleSentence: "Washing dishes is my least favorite chore.", difficulty: "medium" },
  { word: "nap", pronunciation: "NAP", phonetic: "/næp/", partOfSpeech: "noun", meaning: "giấc ngủ ngắn", exampleSentence: "I usually take a nap after lunch.", difficulty: "easy" },
  { word: "exhausted", pronunciation: "ig-ZAW-stid", phonetic: "/ɪɡˈzɔː.stɪd/", partOfSpeech: "adjective", meaning: "kiệt sức", exampleSentence: "I was exhausted after the long shift.", difficulty: "medium" },
  { word: "errand", pronunciation: "ER-uhnd", phonetic: "/ˈer.ənd/", partOfSpeech: "noun", meaning: "việc lặt vặt cần đi làm bên ngoài", exampleSentence: "I need to run a few errands this afternoon.", difficulty: "medium" },
  { word: "schedule", pronunciation: "SKED-yool", phonetic: "/ˈskedʒ.uːl/", partOfSpeech: "noun", meaning: "lịch trình", exampleSentence: "My schedule is full on Mondays.", difficulty: "medium" },

  // --- Family & home ---
  { word: "sibling", pronunciation: "SIB-ling", phonetic: "/ˈsɪb.lɪŋ/", partOfSpeech: "noun", meaning: "anh chị em ruột", exampleSentence: "I have two siblings, a brother and a sister.", difficulty: "easy" },
  { word: "spouse", pronunciation: "SPOWS", phonetic: "/spaʊs/", partOfSpeech: "noun", meaning: "vợ hoặc chồng", exampleSentence: "She introduced me to her spouse.", difficulty: "medium" },
  { word: "relative", pronunciation: "REL-uh-tiv", phonetic: "/ˈrel.ə.tɪv/", partOfSpeech: "noun", meaning: "người họ hàng", exampleSentence: "We invited all our relatives to the wedding.", difficulty: "easy" },
  { word: "household", pronunciation: "HOWS-hohld", phonetic: "/ˈhaʊs.hoʊld/", partOfSpeech: "noun", meaning: "hộ gia đình", exampleSentence: "There are four people in my household.", difficulty: "medium" },
  { word: "neighbor", pronunciation: "NAY-ber", phonetic: "/ˈneɪ.bər/", partOfSpeech: "noun", meaning: "hàng xóm", exampleSentence: "Our neighbor is very friendly.", difficulty: "easy" },
  { word: "furniture", pronunciation: "FUR-ni-cher", phonetic: "/ˈfɜːr.nɪ.tʃər/", partOfSpeech: "noun", meaning: "đồ nội thất", exampleSentence: "We bought new furniture for the living room.", difficulty: "easy" },
  { word: "tidy", pronunciation: "TY-dee", phonetic: "/ˈtaɪ.di/", partOfSpeech: "adjective", meaning: "gọn gàng", exampleSentence: "Please keep your room tidy.", difficulty: "easy" },
  { word: "landlord", pronunciation: "LAND-lord", phonetic: "/ˈlænd.lɔːrd/", partOfSpeech: "noun", meaning: "chủ nhà (cho thuê)", exampleSentence: "The landlord fixed the broken window.", difficulty: "medium" },
  { word: "rent", pronunciation: "RENT", phonetic: "/rent/", partOfSpeech: "verb", meaning: "thuê (nhà)", exampleSentence: "We rent a small apartment downtown.", difficulty: "easy" },
  { word: "appliance", pronunciation: "uh-PLY-uhns", phonetic: "/əˈplaɪ.əns/", partOfSpeech: "noun", meaning: "thiết bị gia dụng", exampleSentence: "The washing machine is a useful appliance.", difficulty: "medium" },

  // --- Food & drink ---
  { word: "ingredient", pronunciation: "in-GREE-dee-uhnt", phonetic: "/ɪnˈɡriː.di.ənt/", partOfSpeech: "noun", meaning: "nguyên liệu", exampleSentence: "Flour is the main ingredient in bread.", difficulty: "medium" },
  { word: "recipe", pronunciation: "RES-uh-pee", phonetic: "/ˈres.ə.pi/", partOfSpeech: "noun", meaning: "công thức nấu ăn", exampleSentence: "Can you send me the recipe for this soup?", difficulty: "easy" },
  { word: "leftover", pronunciation: "LEFT-oh-ver", phonetic: "/ˈleft.oʊ.vər/", partOfSpeech: "noun", meaning: "đồ ăn thừa", exampleSentence: "We had the leftovers for dinner.", difficulty: "medium" },
  { word: "flavor", pronunciation: "FLAY-ver", phonetic: "/ˈfleɪ.vər/", partOfSpeech: "noun", meaning: "hương vị", exampleSentence: "This ice cream has a strong chocolate flavor.", difficulty: "easy" },
  { word: "appetite", pronunciation: "AP-uh-tyt", phonetic: "/ˈæp.ə.taɪt/", partOfSpeech: "noun", meaning: "khẩu vị, cảm giác thèm ăn", exampleSentence: "Exercise gives me a big appetite.", difficulty: "medium" },
  { word: "grocery", pronunciation: "GROH-suh-ree", phonetic: "/ˈɡroʊ.sər.i/", partOfSpeech: "noun", meaning: "hàng tạp hóa", exampleSentence: "I need to buy some groceries after work.", difficulty: "easy" },
  { word: "beverage", pronunciation: "BEV-rij", phonetic: "/ˈbev.rɪdʒ/", partOfSpeech: "noun", meaning: "đồ uống", exampleSentence: "The menu offers a variety of beverages.", difficulty: "medium" },
  { word: "reservation", pronunciation: "rez-er-VAY-shuhn", phonetic: "/ˌrez.ərˈveɪ.ʃən/", partOfSpeech: "noun", meaning: "sự đặt chỗ (nhà hàng, khách sạn)", exampleSentence: "I made a reservation for two at eight.", difficulty: "medium" },
  { word: "delicious", pronunciation: "dih-LISH-uhs", phonetic: "/dɪˈlɪʃ.əs/", partOfSpeech: "adjective", meaning: "ngon", exampleSentence: "This cake is absolutely delicious.", difficulty: "easy" },
  { word: "spicy", pronunciation: "SPY-see", phonetic: "/ˈspaɪ.si/", partOfSpeech: "adjective", meaning: "cay", exampleSentence: "Vietnamese food can be quite spicy.", difficulty: "easy" },

  // --- Conversation & feelings (English Conversation) ---
  { word: "opinion", pronunciation: "uh-PIN-yuhn", phonetic: "/əˈpɪn.jən/", partOfSpeech: "noun", meaning: "ý kiến", exampleSentence: "In my opinion, this book is excellent.", difficulty: "easy" },
  { word: "agree", pronunciation: "uh-GREE", phonetic: "/əˈɡriː/", partOfSpeech: "verb", meaning: "đồng ý", exampleSentence: "I agree with you completely.", difficulty: "easy" },
  { word: "disagree", pronunciation: "dis-uh-GREE", phonetic: "/ˌdɪs.əˈɡriː/", partOfSpeech: "verb", meaning: "không đồng ý", exampleSentence: "I'm afraid I disagree with that plan.", difficulty: "easy" },
  { word: "suggest", pronunciation: "suhg-JEST", phonetic: "/səɡˈdʒest/", partOfSpeech: "verb", meaning: "đề nghị, gợi ý", exampleSentence: "I suggest we leave early tomorrow.", difficulty: "medium" },
  { word: "assume", pronunciation: "uh-SOOM", phonetic: "/əˈsuːm/", partOfSpeech: "verb", meaning: "cho rằng, giả định", exampleSentence: "I assumed you already knew the news.", difficulty: "medium" },
  { word: "curious", pronunciation: "KYOOR-ee-uhs", phonetic: "/ˈkjʊr.i.əs/", partOfSpeech: "adjective", meaning: "tò mò", exampleSentence: "She was curious about his new job.", difficulty: "easy" },
  { word: "nervous", pronunciation: "NUR-vuhs", phonetic: "/ˈnɜːr.vəs/", partOfSpeech: "adjective", meaning: "lo lắng, hồi hộp", exampleSentence: "I always feel nervous before an interview.", difficulty: "easy" },
  { word: "confident", pronunciation: "KON-fi-duhnt", phonetic: "/ˈkɒn.fɪ.dənt/", partOfSpeech: "adjective", meaning: "tự tin", exampleSentence: "She spoke confidently in front of the class.", difficulty: "medium" },
  { word: "embarrassed", pronunciation: "im-BAR-uhst", phonetic: "/ɪmˈbær.əst/", partOfSpeech: "adjective", meaning: "xấu hổ, ngượng", exampleSentence: "He felt embarrassed after forgetting her name.", difficulty: "medium" },
  { word: "relieved", pronunciation: "rih-LEEVD", phonetic: "/rɪˈliːvd/", partOfSpeech: "adjective", meaning: "nhẹ nhõm", exampleSentence: "I was relieved to hear the good news.", difficulty: "medium" },
  { word: "frustrated", pronunciation: "FRUHS-tray-tid", phonetic: "/ˈfrʌs.treɪ.tɪd/", partOfSpeech: "adjective", meaning: "bực bội, thất vọng", exampleSentence: "He got frustrated when the internet stopped working.", difficulty: "medium" },
  { word: "apologize", pronunciation: "uh-POL-uh-jyz", phonetic: "/əˈpɒl.ə.dʒaɪz/", partOfSpeech: "verb", meaning: "xin lỗi", exampleSentence: "I want to apologize for being late.", difficulty: "medium" },
  { word: "compliment", pronunciation: "KOM-pli-muhnt", phonetic: "/ˈkɒm.plɪ.mənt/", partOfSpeech: "noun", meaning: "lời khen", exampleSentence: "Thank you for the compliment.", difficulty: "medium" },
  { word: "interrupt", pronunciation: "in-tuh-RUHPT", phonetic: "/ˌɪn.təˈrʌpt/", partOfSpeech: "verb", meaning: "ngắt lời, làm gián đoạn", exampleSentence: "Sorry to interrupt, but you have a phone call.", difficulty: "medium" },
  { word: "mention", pronunciation: "MEN-shuhn", phonetic: "/ˈmen.ʃən/", partOfSpeech: "verb", meaning: "đề cập tới", exampleSentence: "She mentioned that she might move to Hanoi.", difficulty: "easy" },

  // --- Travel (English for Travel) ---
  { word: "itinerary", pronunciation: "eye-TIN-uh-rer-ee", phonetic: "/aɪˈtɪn.ə.rer.i/", partOfSpeech: "noun", meaning: "lịch trình du lịch", exampleSentence: "Our itinerary includes three cities.", difficulty: "hard" },
  { word: "luggage", pronunciation: "LUHG-ij", phonetic: "/ˈlʌɡ.ɪdʒ/", partOfSpeech: "noun", meaning: "hành lý", exampleSentence: "Please keep your luggage with you at all times.", difficulty: "easy" },
  { word: "boarding pass", pronunciation: "BOR-ding pas", phonetic: "/ˈbɔːr.dɪŋ pæs/", partOfSpeech: "noun", meaning: "thẻ lên máy bay", exampleSentence: "Show your boarding pass at the gate.", difficulty: "medium" },
  { word: "customs", pronunciation: "KUHS-tuhmz", phonetic: "/ˈkʌs.təmz/", partOfSpeech: "noun", meaning: "hải quan", exampleSentence: "We had to go through customs at the airport.", difficulty: "medium" },
  { word: "departure", pronunciation: "dih-PAR-cher", phonetic: "/dɪˈpɑːr.tʃər/", partOfSpeech: "noun", meaning: "sự khởi hành", exampleSentence: "The departure time is 9 a.m.", difficulty: "medium" },
  { word: "arrival", pronunciation: "uh-RY-vuhl", phonetic: "/əˈraɪ.vəl/", partOfSpeech: "noun", meaning: "sự đến nơi", exampleSentence: "Check the arrival board for your flight.", difficulty: "easy" },
  { word: "accommodation", pronunciation: "uh-kom-uh-DAY-shuhn", phonetic: "/əˌkɒm.əˈdeɪ.ʃən/", partOfSpeech: "noun", meaning: "chỗ ở", exampleSentence: "We booked our accommodation online.", difficulty: "hard" },
  { word: "vacancy", pronunciation: "VAY-kuhn-see", phonetic: "/ˈveɪ.kən.si/", partOfSpeech: "noun", meaning: "phòng trống (khách sạn)", exampleSentence: "The hotel has no vacancy this weekend.", difficulty: "hard" },
  { word: "checkout", pronunciation: "CHEK-owt", phonetic: "/ˈtʃek.aʊt/", partOfSpeech: "noun", meaning: "trả phòng", exampleSentence: "Checkout time is noon.", difficulty: "easy" },
  { word: "currency", pronunciation: "KUR-uhn-see", phonetic: "/ˈkɜːr.ən.si/", partOfSpeech: "noun", meaning: "tiền tệ", exampleSentence: "I need to exchange my currency.", difficulty: "medium" },
  { word: "fare", pronunciation: "FAIR", phonetic: "/fer/", partOfSpeech: "noun", meaning: "giá vé", exampleSentence: "The bus fare is two dollars.", difficulty: "easy" },
  { word: "platform", pronunciation: "PLAT-form", phonetic: "/ˈplæt.fɔːrm/", partOfSpeech: "noun", meaning: "sân ga, sân ke", exampleSentence: "The train leaves from platform 4.", difficulty: "easy" },
  { word: "souvenir", pronunciation: "soo-vuh-NEER", phonetic: "/ˌsuː.vəˈnɪr/", partOfSpeech: "noun", meaning: "quà lưu niệm", exampleSentence: "I bought a souvenir for my sister.", difficulty: "medium" },
  { word: "landmark", pronunciation: "LAND-mark", phonetic: "/ˈlænd.mɑːrk/", partOfSpeech: "noun", meaning: "địa danh, mốc nổi tiếng", exampleSentence: "The Eiffel Tower is a famous landmark.", difficulty: "medium" },
  { word: "delay", pronunciation: "dih-LAY", phonetic: "/dɪˈleɪ/", partOfSpeech: "noun", meaning: "sự trì hoãn", exampleSentence: "Our flight had a two-hour delay.", difficulty: "easy" },
  { word: "detour", pronunciation: "DEE-toor", phonetic: "/ˈdiː.tʊr/", partOfSpeech: "noun", meaning: "đường vòng", exampleSentence: "We took a detour to avoid traffic.", difficulty: "medium" },
  { word: "roundtrip", pronunciation: "ROWND-trip", phonetic: "/ˈraʊnd.trɪp/", partOfSpeech: "noun", meaning: "vé khứ hồi", exampleSentence: "A roundtrip ticket is cheaper than two one-way tickets.", difficulty: "medium" },

  // --- General verbs & connectors (Essential Grammar) ---
  { word: "improve", pronunciation: "im-PROOV", phonetic: "/ɪmˈpruːv/", partOfSpeech: "verb", meaning: "cải thiện", exampleSentence: "She wants to improve her English.", difficulty: "easy" },
  { word: "achieve", pronunciation: "uh-CHEEV", phonetic: "/əˈtʃiːv/", partOfSpeech: "verb", meaning: "đạt được", exampleSentence: "He achieved his goal of running a marathon.", difficulty: "medium" },
  { word: "although", pronunciation: "awl-THOH", phonetic: "/ɔːlˈðoʊ/", partOfSpeech: "conjunction", meaning: "mặc dù", exampleSentence: "Although it was raining, we went for a walk.", difficulty: "medium" },
  { word: "however", pronunciation: "how-EV-er", phonetic: "/haʊˈev.ər/", partOfSpeech: "adverb", meaning: "tuy nhiên", exampleSentence: "The plan sounded good; however, it was too expensive.", difficulty: "medium" },
  { word: "therefore", pronunciation: "THAIR-for", phonetic: "/ˈðer.fɔːr/", partOfSpeech: "adverb", meaning: "vì vậy", exampleSentence: "It was late; therefore, we took a taxi home.", difficulty: "medium" },
  { word: "unless", pronunciation: "uhn-LES", phonetic: "/ənˈles/", partOfSpeech: "conjunction", meaning: "trừ khi", exampleSentence: "I won't go unless you come with me.", difficulty: "medium" },
  { word: "despite", pronunciation: "dih-SPYT", phonetic: "/dɪˈspaɪt/", partOfSpeech: "preposition", meaning: "mặc dù (bất chấp)", exampleSentence: "Despite the rain, the match continued.", difficulty: "medium" },
  { word: "increase", pronunciation: "in-KREES", phonetic: "/ɪnˈkriːs/", partOfSpeech: "verb", meaning: "tăng lên", exampleSentence: "Prices increased last month.", difficulty: "easy" },
  { word: "decrease", pronunciation: "dih-KREES", phonetic: "/dɪˈkriːs/", partOfSpeech: "verb", meaning: "giảm xuống", exampleSentence: "The company's profits decreased this year.", difficulty: "easy" },
  { word: "consider", pronunciation: "kuhn-SID-er", phonetic: "/kənˈsɪd.ər/", partOfSpeech: "verb", meaning: "xem xét, cân nhắc", exampleSentence: "Please consider my proposal carefully.", difficulty: "medium" },
  { word: "require", pronunciation: "rih-KWY-er", phonetic: "/rɪˈkwaɪ.ər/", partOfSpeech: "verb", meaning: "yêu cầu, đòi hỏi", exampleSentence: "The job requires three years of experience.", difficulty: "medium" },
  { word: "provide", pronunciation: "pruh-VYD", phonetic: "/prəˈvaɪd/", partOfSpeech: "verb", meaning: "cung cấp", exampleSentence: "The hotel provides free breakfast.", difficulty: "easy" },
  { word: "avoid", pronunciation: "uh-VOYD", phonetic: "/əˈvɔɪd/", partOfSpeech: "verb", meaning: "tránh", exampleSentence: "You should avoid too much sugar.", difficulty: "easy" },
  { word: "manage", pronunciation: "MAN-ij", phonetic: "/ˈmæn.ɪdʒ/", partOfSpeech: "verb", meaning: "quản lý, xoay xở", exampleSentence: "She manages a team of ten people.", difficulty: "medium" },
  { word: "prevent", pronunciation: "prih-VENT", phonetic: "/prɪˈvent/", partOfSpeech: "verb", meaning: "ngăn ngừa", exampleSentence: "Regular exercise can prevent many illnesses.", difficulty: "medium" },
  { word: "regularly", pronunciation: "REG-yuh-ler-lee", phonetic: "/ˈreɡ.jə.lər.li/", partOfSpeech: "adverb", meaning: "một cách đều đặn", exampleSentence: "He exercises regularly every morning.", difficulty: "medium" },

  // --- Academic English ---
  { word: "analyze", pronunciation: "AN-uh-lyz", phonetic: "/ˈæn.ə.laɪz/", partOfSpeech: "verb", meaning: "phân tích", exampleSentence: "Researchers analyzed the survey results.", difficulty: "hard" },
  { word: "hypothesis", pronunciation: "hy-POTH-uh-sis", phonetic: "/haɪˈpɒθ.ə.sɪs/", partOfSpeech: "noun", meaning: "giả thuyết", exampleSentence: "The scientist tested her hypothesis in the lab.", difficulty: "hard" },
  { word: "evidence", pronunciation: "EV-uh-duhns", phonetic: "/ˈev.ɪ.dəns/", partOfSpeech: "noun", meaning: "bằng chứng", exampleSentence: "There is strong evidence to support this theory.", difficulty: "medium" },
  { word: "significant", pronunciation: "sig-NIF-i-kuhnt", phonetic: "/sɪɡˈnɪf.ɪ.kənt/", partOfSpeech: "adjective", meaning: "đáng kể, quan trọng", exampleSentence: "There was a significant improvement in her grades.", difficulty: "hard" },
  { word: "sufficient", pronunciation: "suh-FISH-uhnt", phonetic: "/səˈfɪʃ.ənt/", partOfSpeech: "adjective", meaning: "đủ, đầy đủ", exampleSentence: "We don't have sufficient data yet.", difficulty: "hard" },
  { word: "furthermore", pronunciation: "FUR-ther-mor", phonetic: "/ˈfɜːr.ðər.mɔːr/", partOfSpeech: "adverb", meaning: "hơn nữa", exampleSentence: "The plan is expensive; furthermore, it is risky.", difficulty: "hard" },
  { word: "assessment", pronunciation: "uh-SES-muhnt", phonetic: "/əˈses.mənt/", partOfSpeech: "noun", meaning: "sự đánh giá", exampleSentence: "The final assessment counts for 40% of the grade.", difficulty: "hard" },
  { word: "methodology", pronunciation: "meth-uh-DOL-uh-jee", phonetic: "/ˌmeθ.əˈdɒl.ə.dʒi/", partOfSpeech: "noun", meaning: "phương pháp luận", exampleSentence: "The paper explains its research methodology in detail.", difficulty: "hard" },
  { word: "objective", pronunciation: "uhb-JEK-tiv", phonetic: "/əbˈdʒek.tɪv/", partOfSpeech: "noun", meaning: "mục tiêu", exampleSentence: "The main objective of the study is to reduce costs.", difficulty: "medium" },
  { word: "outcome", pronunciation: "OWT-kuhm", phonetic: "/ˈaʊt.kʌm/", partOfSpeech: "noun", meaning: "kết quả", exampleSentence: "The outcome of the experiment was unexpected.", difficulty: "medium" },
  { word: "contradict", pronunciation: "kon-truh-DIKT", phonetic: "/ˌkɒn.trəˈdɪkt/", partOfSpeech: "verb", meaning: "mâu thuẫn với", exampleSentence: "His second statement contradicts the first.", difficulty: "hard" },
  { word: "emphasize", pronunciation: "EM-fuh-syz", phonetic: "/ˈem.fə.saɪz/", partOfSpeech: "verb", meaning: "nhấn mạnh", exampleSentence: "The teacher emphasized the importance of practice.", difficulty: "hard" },
  { word: "controversial", pronunciation: "kon-truh-VUR-shuhl", phonetic: "/ˌkɒn.trəˈvɜːr.ʃəl/", partOfSpeech: "adjective", meaning: "gây tranh cãi", exampleSentence: "It was a controversial decision.", difficulty: "hard" },
  { word: "criteria", pronunciation: "kry-TEER-ee-uh", phonetic: "/kraɪˈtɪr.i.ə/", partOfSpeech: "noun", meaning: "tiêu chí", exampleSentence: "The criteria for the award are strict.", difficulty: "hard" },
  { word: "conclude", pronunciation: "kuhn-KLOOD", phonetic: "/kənˈkluːd/", partOfSpeech: "verb", meaning: "kết luận", exampleSentence: "The report concludes that more funding is needed.", difficulty: "medium" },

  // --- More everyday vocabulary to reach the ≥100 target ---
  { word: "borrow", pronunciation: "BOR-oh", phonetic: "/ˈbɒr.oʊ/", partOfSpeech: "verb", meaning: "mượn", exampleSentence: "Can I borrow your pen?", difficulty: "easy" },
  { word: "lend", pronunciation: "LEND", phonetic: "/lend/", partOfSpeech: "verb", meaning: "cho mượn", exampleSentence: "Could you lend me some money?", difficulty: "easy" },
  { word: "return", pronunciation: "rih-TURN", phonetic: "/rɪˈtɜːrn/", partOfSpeech: "verb", meaning: "trả lại, quay về", exampleSentence: "Please return the book by Friday.", difficulty: "easy" },
  { word: "apologetic", pronunciation: "uh-pol-uh-JET-ik", phonetic: "/əˌpɒl.əˈdʒet.ɪk/", partOfSpeech: "adjective", meaning: "hối lỗi, áy náy", exampleSentence: "He was apologetic about the mistake.", difficulty: "hard" },
  { word: "punctual", pronunciation: "PUHNGK-choo-uhl", phonetic: "/ˈpʌŋk.tʃu.əl/", partOfSpeech: "adjective", meaning: "đúng giờ", exampleSentence: "She is always punctual for meetings.", difficulty: "medium" },
  { word: "convenient", pronunciation: "kuhn-VEEN-yuhnt", phonetic: "/kənˈviːn.jənt/", partOfSpeech: "adjective", meaning: "thuận tiện", exampleSentence: "Is it convenient for you to meet at 3 p.m.?", difficulty: "medium" },
  { word: "reliable", pronunciation: "rih-LY-uh-buhl", phonetic: "/rɪˈlaɪ.ə.bəl/", partOfSpeech: "adjective", meaning: "đáng tin cậy", exampleSentence: "He's a reliable friend.", difficulty: "medium" },
  { word: "generous", pronunciation: "JEN-er-uhs", phonetic: "/ˈdʒen.ər.əs/", partOfSpeech: "adjective", meaning: "hào phóng", exampleSentence: "It was generous of you to help.", difficulty: "medium" },
  { word: "polite", pronunciation: "puh-LYT", phonetic: "/pəˈlaɪt/", partOfSpeech: "adjective", meaning: "lịch sự", exampleSentence: "It's polite to say thank you.", difficulty: "easy" },
  { word: "rude", pronunciation: "ROOD", phonetic: "/ruːd/", partOfSpeech: "adjective", meaning: "thô lỗ", exampleSentence: "It was rude of him to interrupt.", difficulty: "easy" },
  { word: "encourage", pronunciation: "in-KUR-ij", phonetic: "/ɪnˈkɜːr.ɪdʒ/", partOfSpeech: "verb", meaning: "khuyến khích", exampleSentence: "My teacher encouraged me to keep practicing.", difficulty: "medium" },
  { word: "discourage", pronunciation: "dis-KUR-ij", phonetic: "/dɪsˈkɜːr.ɪdʒ/", partOfSpeech: "verb", meaning: "làm nản lòng", exampleSentence: "Don't let one failure discourage you.", difficulty: "medium" },
  { word: "afford", pronunciation: "uh-FORD", phonetic: "/əˈfɔːrd/", partOfSpeech: "verb", meaning: "có đủ khả năng (tiền, thời gian)", exampleSentence: "We can't afford a new car this year.", difficulty: "medium" },
  { word: "budget", pronunciation: "BUHJ-it", phonetic: "/ˈbʌdʒ.ɪt/", partOfSpeech: "noun", meaning: "ngân sách", exampleSentence: "We need to stick to our budget.", difficulty: "medium" },
  { word: "purchase", pronunciation: "PUR-chuhs", phonetic: "/ˈpɜːr.tʃəs/", partOfSpeech: "verb", meaning: "mua", exampleSentence: "She purchased a new laptop.", difficulty: "medium" },
  { word: "refund", pronunciation: "REE-fuhnd", phonetic: "/ˈriː.fʌnd/", partOfSpeech: "noun", meaning: "khoản hoàn tiền", exampleSentence: "I asked for a refund on the broken item.", difficulty: "medium" },
  { word: "receipt", pronunciation: "rih-SEET", phonetic: "/rɪˈsiːt/", partOfSpeech: "noun", meaning: "hóa đơn, biên lai", exampleSentence: "Keep your receipt in case you need to return it.", difficulty: "medium" },
  { word: "appointment", pronunciation: "uh-POYNT-muhnt", phonetic: "/əˈpɔɪnt.mənt/", partOfSpeech: "noun", meaning: "cuộc hẹn", exampleSentence: "I have a doctor's appointment tomorrow.", difficulty: "easy" },
  { word: "postpone", pronunciation: "pohst-POHN", phonetic: "/poʊstˈpoʊn/", partOfSpeech: "verb", meaning: "hoãn lại", exampleSentence: "We had to postpone the meeting.", difficulty: "medium" },
  { word: "cancel", pronunciation: "KAN-suhl", phonetic: "/ˈkæn.səl/", partOfSpeech: "verb", meaning: "hủy bỏ", exampleSentence: "The flight was canceled due to weather.", difficulty: "easy" },
  { word: "confirm", pronunciation: "kuhn-FURM", phonetic: "/kənˈfɜːrm/", partOfSpeech: "verb", meaning: "xác nhận", exampleSentence: "Please confirm your reservation by email.", difficulty: "medium" },
  { word: "opportunity", pronunciation: "op-er-TOO-ni-tee", phonetic: "/ˌɒp.əˈtuː.nə.ti/", partOfSpeech: "noun", meaning: "cơ hội", exampleSentence: "This job is a great opportunity for her.", difficulty: "medium" },
  { word: "challenge", pronunciation: "CHAL-inj", phonetic: "/ˈtʃæl.ɪndʒ/", partOfSpeech: "noun", meaning: "thử thách", exampleSentence: "Learning a new language is a big challenge.", difficulty: "easy" },
  { word: "solution", pronunciation: "suh-LOO-shuhn", phonetic: "/səˈluː.ʃən/", partOfSpeech: "noun", meaning: "giải pháp", exampleSentence: "We need to find a solution quickly.", difficulty: "easy" },
  { word: "advantage", pronunciation: "uhd-VAN-tij", phonetic: "/ədˈvæn.tɪdʒ/", partOfSpeech: "noun", meaning: "lợi thế", exampleSentence: "Speaking two languages is a big advantage.", difficulty: "medium" },
  { word: "disadvantage", pronunciation: "dis-uhd-VAN-tij", phonetic: "/ˌdɪs.ədˈvæn.tɪdʒ/", partOfSpeech: "noun", meaning: "bất lợi", exampleSentence: "One disadvantage of the plan is the cost.", difficulty: "medium" },
  { word: "similar", pronunciation: "SIM-uh-ler", phonetic: "/ˈsɪm.ə.lər/", partOfSpeech: "adjective", meaning: "tương tự", exampleSentence: "These two dresses look similar.", difficulty: "easy" },
  { word: "unique", pronunciation: "yoo-NEEK", phonetic: "/juˈniːk/", partOfSpeech: "adjective", meaning: "độc đáo, duy nhất", exampleSentence: "Every snowflake is unique.", difficulty: "medium" },
  { word: "explore", pronunciation: "ik-SPLOR", phonetic: "/ɪkˈsplɔːr/", partOfSpeech: "verb", meaning: "khám phá", exampleSentence: "We spent the weekend exploring the old town.", difficulty: "easy" },
  { word: "discover", pronunciation: "dih-SKUHV-er", phonetic: "/dɪˈskʌv.ər/", partOfSpeech: "verb", meaning: "khám phá ra, phát hiện", exampleSentence: "Scientists discovered a new species of frog.", difficulty: "easy" },
  { word: "success", pronunciation: "SUHK-ses", phonetic: "/səkˈses/", partOfSpeech: "noun", meaning: "sự thành công", exampleSentence: "Hard work is the key to success.", difficulty: "easy" },
  { word: "failure", pronunciation: "FAYL-yer", phonetic: "/ˈfeɪl.jər/", partOfSpeech: "noun", meaning: "sự thất bại", exampleSentence: "He learned a lot from that failure.", difficulty: "medium" },
  { word: "ambitious", pronunciation: "am-BISH-uhs", phonetic: "/æmˈbɪʃ.əs/", partOfSpeech: "adjective", meaning: "tham vọng, có chí lớn", exampleSentence: "She is ambitious and works very hard.", difficulty: "hard" },
  { word: "patient", pronunciation: "PAY-shuhnt", phonetic: "/ˈpeɪ.ʃənt/", partOfSpeech: "adjective", meaning: "kiên nhẫn", exampleSentence: "You need to be patient with beginners.", difficulty: "medium" },
  { word: "flexible", pronunciation: "FLEK-suh-buhl", phonetic: "/ˈflek.sə.bəl/", partOfSpeech: "adjective", meaning: "linh hoạt", exampleSentence: "My work schedule is quite flexible.", difficulty: "medium" },
  { word: "independent", pronunciation: "in-dih-PEN-duhnt", phonetic: "/ˌɪn.dɪˈpen.dənt/", partOfSpeech: "adjective", meaning: "độc lập", exampleSentence: "She became independent after moving abroad.", difficulty: "medium" },
  { word: "responsible", pronunciation: "rih-SPON-suh-buhl", phonetic: "/rɪˈspɒn.sə.bəl/", partOfSpeech: "adjective", meaning: "có trách nhiệm", exampleSentence: "He is responsible for the whole project.", difficulty: "medium" },
  { word: "efficient", pronunciation: "ih-FISH-uhnt", phonetic: "/ɪˈfɪʃ.ənt/", partOfSpeech: "adjective", meaning: "hiệu quả", exampleSentence: "The new system is much more efficient.", difficulty: "hard" },
  { word: "accurate", pronunciation: "AK-yer-it", phonetic: "/ˈæk.jər.ət/", partOfSpeech: "adjective", meaning: "chính xác", exampleSentence: "Please give me an accurate estimate.", difficulty: "medium" },
];
