import React, { useState, useEffect } from 'react';
import {
  Menu, Settings, X, BookOpen, CheckCircle, Clock, Search,
  Volume2, Plus, Sun, Moon, Coffee, Trees, Sparkles, Trash2,
  RotateCcw, Play, Pause, FolderOpen, Layers, Award, Utensils,
  Music, Book, ChevronRight, RefreshCw, Globe, Check, HelpCircle
} from 'lucide-react';

const INITIAL_WORDS = [
  { id: 1, en: 'Abandon', tr: 'Terk etmek, vazgeçmek', level: 'B1', type: 'Fiil', phonetic: '/əˈbændən/', example: 'They had to abandon the car in the snow.', exTr: 'Arabayı karda terk etmek zorunda kaldılar.' },
  { id: 2, en: 'Benevolent', tr: 'İyiliksever, hayırsever', level: 'C1', type: 'Sıfat', phonetic: '/bəˈnevələnt/', example: 'A benevolent smile crossed her face.', exTr: 'Yüzünde iyiliksever bir gülümseme belirdi.' },
  { id: 3, en: 'Break down', tr: 'Bozulmak, arızalanmak', level: 'B1', type: 'Phrasal Verb', phonetic: '/breɪk daʊn/', example: 'Our car broke down on the highway.', exTr: 'Arabamız otoyolda bozuldu.' },
  { id: 4, en: 'Carry on', tr: 'Devam etmek, sürdürmek', level: 'A2', type: 'Phrasal Verb', phonetic: '/ˈkæri ɒn/', example: 'Carry on with your work while I am away.', exTr: 'Ben yokken işine devam et.' },
  { id: 5, en: 'Comprehensive', tr: 'Kapsamlı, detaylı', level: 'B2', type: 'Sıfat', phonetic: '/ˌkɒmprɪˈhensɪv/', example: 'We offer a comprehensive guide to the city.', exTr: 'Şehir için kapsamlı bir rehber sunuyoruz.' },
  { id: 6, en: 'Deteriorate', tr: 'Kötüleşmek, bozulmak', level: 'C1', type: 'Fiil', phonetic: '/dɪˈtɪəriəreɪt/', example: 'Her health deteriorated rapidly.', exTr: 'Sağlığı hızla kötüleşti.' },
  { id: 7, en: 'Eager', tr: 'İstekli, hevesli', level: 'B1', type: 'Sıfat', phonetic: '/ˈiːɡər/', example: 'The students were eager to learn.', exTr: 'Öğrenciler öğrenmeye hevesliydi.' },
  { id: 8, en: 'Figure out', tr: 'Çözmek, anlamak', level: 'B1', type: 'Phrasal Verb', phonetic: '/ˈfɪɡər aʊt/', example: 'Can you figure out this puzzle?', exTr: 'Bu bulmacayı çözebilir misin?' },
  { id: 9, en: 'Give up', tr: 'Pes etmek, bırakmak', level: 'A2', type: 'Phrasal Verb', phonetic: '/ɡɪv ʌp/', example: 'Never give up on your dreams.', exTr: 'Hayallerinden asla vazgeçme.' },
  { id: 10, en: 'Inevitable', tr: 'Kaçınılmaz', level: 'B2', type: 'Sıfat', phonetic: '/ɪnˈevɪtəbl/', example: 'Change is an inevitable part of life.', exTr: 'Değişim hayatın kaçınılmaz bir parçasıdır.' },
  { id: 11, en: 'Look after', tr: 'Bakmak, ilgilenmek', level: 'A2', type: 'Phrasal Verb', phonetic: '/lʊk ˈɑːftər/', example: 'Who will look after the dog?', exTr: 'Köpeğe kim bakacak?' },
  { id: 12, en: 'Meticulous', tr: 'Titiz, çok dikkatli', level: 'C1', type: 'Sıfat', phonetic: '/məˈtɪkjələs/', example: 'He is meticulous about keeping records.', exTr: 'Kayıt tutma konusunda çok titizdir.' },
  { id: 13, en: 'Obstacle', tr: 'Engel, mani', level: 'B2', type: 'İsim', phonetic: '/ˈɒbstəkl/', example: 'Fear is the biggest obstacle to success.', exTr: 'Korku, başarının önündeki en büyük engeldir.' },
  { id: 14, en: 'Postpone', tr: 'Ertelemek', level: 'B1', type: 'Fiil', phonetic: '/pəˈspəʊn/', example: 'We had to postpone the meeting.', exTr: 'Toplantıyı ertelemek zorunda kaldık.' },
  { id: 15, en: 'Resilient', tr: 'Dirençli, çabuk toparlanan', level: 'C1', type: 'Sıfat', phonetic: '/rɪˈzɪliənt/', example: 'Children are often very resilient.', exTr: 'Çocuklar genellikle çok dirençlidir.' },
  { id: 16, en: 'Turn down', tr: 'Reddetmek, sesini kısmak', level: 'B1', type: 'Phrasal Verb', phonetic: '/tɜːn daʊn/', example: 'She turned down the job offer.', exTr: 'İş teklifini reddetti.' },
  { id: 17, en: 'Ubiquitous', tr: 'Her yerde bulunan', level: 'C1', type: 'Sıfat', phonetic: '/juːˈbɪkwɪtəs/', example: 'Smartphones have become ubiquitous.', exTr: 'Akıllı telefonlar her yerde bulunur hale geldi.' },
  { id: 18, en: 'Vivid', tr: 'Canlı, parlak, net', level: 'B2', type: 'Sıfat', phonetic: '/ˈvɪvɪd/', example: 'I still have vivid memories of that trip.', exTr: 'O gezinin canlı anıları hâlâ aklımda.' }
];

const STORIES = [
  {
    id: 1,
    title: 'A Morning in Istanbul',
    level: 'A1',
    duration: '3 dk',
    content: 'Every morning, Kerem wakes up early in his small dormitory room. He opens the window and listens to the seagulls. First, he makes a cup of hot tea. Then he checks his study plan for the day. Learning English takes patience, but Kerem enjoys reading short stories before breakfast.',
    trSummary: 'Kerem her sabah yurt odasında erken uyanır, martıları dinler, çayını demler ve kahvaltıdan önce kısa İngilizce hikayeler okuyarak çalışma planını gözden geçirir.',
    quiz: [
      { q: 'Where does Kerem wake up?', options: ['In a hotel', 'In his dormitory room', 'In a library'], answer: 1 },
      { q: 'What does he drink in the morning?', options: ['Coffee', 'Orange juice', 'Hot tea'], answer: 2 }
    ]
  },
  {
    id: 2,
    title: 'The Secret of Deep Focus',
    level: 'B1',
    duration: '5 dk',
    content: 'In our modern world, notifications constantly interrupt our attention. Researchers suggest that switching between tasks reduces productivity by nearly forty percent. When you dedicate twenty-five uninterrupted minutes to a single task, your brain builds stronger neural connections and remembers new vocabulary much more effectively.',
    trSummary: 'Modern dünyada bildirimler dikkatimizi sürekli böler. Araştırmalar, görevler arasında geçiş yapmanın verimliliği %40 düşürdüğünü, 25 dakikalık kesintisiz odaklanmanın ise öğrenmeyi güçlendirdiğini gösteriyor.',
    quiz: [
      { q: 'How much does task-switching reduce productivity?', options: ['About 10%', 'Nearly 40%', 'Almost 90%'], answer: 1 },
      { q: 'What happens during 25 minutes of uninterrupted focus?', options: ['You get tired quickly', 'The brain builds stronger neural connections', 'You forget vocabulary'], answer: 1 }
    ]
  },
  {
    id: 3,
    title: 'Architecture of Memory',
    level: 'B2',
    duration: '7 dk',
    content: 'Memory is not a static filing cabinet; rather, it is a dynamic process of reconstruction. Prior to sleep, the hippocampus replays experiences from the day and transfers essential information to the cerebral cortex. Consequently, students who review their flashcards right before bedtime exhibit significantly higher retention rates than those who cram in noisy environments.',
    trSummary: 'Hafıza sabit bir dosya dolabı değil, dinamik bir yeniden inşa sürecidir. Uyku öncesinde hipokampus günün deneyimlerini tekrar oynatır; bu yüzden uyumadan önce kelime kartlarını tekrar eden öğrenciler bilgileri çok daha kalıcı öğrenir.',
    quiz: [
      { q: 'Which brain region replays daily experiences before sleep?', options: ['The hippocampus', 'The cerebellum', 'The visual cortex'], answer: 0 },
      { q: 'When is a great time to review flashcards for better retention?', options: ['In noisy environments', 'Right before bedtime', 'Only once a month'], answer: 1 }
    ]
  }
];

const QUOTES = [
  { text: 'The limits of my language mean the limits of my world.', author: 'Ludwig Wittgenstein', tr: 'Dilimin sınırları dünyamın sınırları demektir.' },
  { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle', tr: 'Biz sürekli yaptığımız şeyiz. O halde mükemmellik bir eylem değil, bir alışkanlıktır.' },
  { text: 'One language sets you in a corridor for life. Two languages open every door along the way.', author: 'Frank Smith', tr: 'Tek dil sizi hayat boyu bir koridora koyar. İki dil ise yol boyunca her kapıyı açar.' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ayarlar
  const [theme, setTheme] = useState('midnight');
  const [fontSize, setFontSize] = useState('base');
  const [readingFont, setReadingFont] = useState('sans');
  const [ttsAccent, setTtsAccent] = useState('en-US');
  const [ttsSpeed, setTtsSpeed] = useState(1.0);
  const [calorieGoal, setCalorieGoal] = useState(2200);
  const [userName, setUserName] = useState('Abdulkadir');

  // Genel Bakış State'leri
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [meals, setMeals] = useState([
    { id: 1, period: 'Kahvaltı', name: 'Mercimek Çorbası, Haşlanmış Yumurta, Simit', cal: 520, eaten: true },
    { id: 2, period: 'Öğle', name: 'Tavuk Sote, Pirinç Pilavı, Ayran', cal: 710, eaten: true },
    { id: 3, period: 'Akşam', name: 'Karnıyarık, Bulgur Pilavı, Cacık', cal: 640, eaten: false }
  ]);
  const [newMealName, setNewMealName] = useState('');
  const [newMealCal, setNewMealCal] = useState('');

  // Görevler State'i
  const [tasks, setTasks] = useState([
    { id: 1, title: '15 dakika B1 Reading parçası oku', category: 'Reading', done: true },
    { id: 2, title: 'Sözlükten 10 yeni Phrasal Verb çalış', category: 'Vocabulary', done: false },
    { id: 3, title: '1 Pomodoro (25 dk) kesintisiz çalışma yap', category: 'Focus', done: false },
    { id: 4, title: 'İngilizce podcast dinle (10 dk)', category: 'Listening', done: true }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCat, setNewTaskCat] = useState('Reading');

  // Reading State'i
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [activeStory, setActiveStory] = useState(STORIES[0]);
  const [clickedWord, setClickedWord] = useState(null);
  const [clickedTranslation, setClickedTranslation] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({});

  // Sözlük & Flashcard State'i
  const [words, setWords] = useState(INITIAL_WORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [dictFilter, setDictFilter] = useState('ALL');
  const [liveResult, setLiveResult] = useState(null);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [flashcards, setFlashcards] = useState(INITIAL_WORDS.slice(0, 5));
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [resources, setResources] = useState([
    { id: 1, title: 'YDS / YÖKDİL En Çok Çıkan Bağlaçlar.pdf', tag: 'PDF Notu', date: 'Bugün' },
    { id: 2, title: 'Aylık KYK Yurt Yemek Listesi.xlsx', tag: 'Menü', date: 'Dün' }
  ]);
  const [newResourceTitle, setNewResourceTitle] = useState('');

  // Pomodoro State'i
  const [pomoMode, setPomoMode] = useState('work'); // work, short, long
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Tema Sınıfları
  const themeClasses = {
    dark: 'bg-zinc-950 text-zinc-100',
    light: 'bg-stone-100 text-stone-900',
    midnight: 'bg-slate-950 text-cyan-50',
    forest: 'bg-emerald-950 text-emerald-50',
    espresso: 'bg-[#1c1410] text-amber-50',
    aurora: 'bg-indigo-950 text-fuchsia-50'
  };

  const cardClasses = {
    dark: 'bg-zinc-900 border-zinc-800',
    light: 'bg-white border-stone-200 shadow-sm',
    midnight: 'bg-slate-900/90 border-cyan-500/20 shadow-lg shadow-cyan-950/30',
    forest: 'bg-emerald-900/60 border-emerald-500/20',
    espresso: 'bg-[#2a1f1a] border-amber-500/20',
    aurora: 'bg-indigo-900/40 border-fuchsia-500/20 backdrop-blur-md'
  };

  const accentClasses = {
    dark: 'bg-blue-600 hover:bg-blue-500 text-white',
    light: 'bg-stone-900 hover:bg-stone-800 text-white',
    midnight: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold',
    forest: 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold',
    espresso: 'bg-amber-600 hover:bg-amber-500 text-amber-950 font-bold',
    aurora: 'bg-fuchsia-500 hover:bg-fuchsia-400 text-indigo-950 font-bold'
  };

  const fontSizeClass = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }[fontSize] || 'text-base';

  // Sesli Okuma (TTS)
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = ttsAccent;
    utterance.rate = ttsSpeed;
    window.speechSynthesis.speak(utterance);
  };

  // Pomodoro Sayacı
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const switchPomoMode = (mode) => {
    setIsRunning(false);
    setPomoMode(mode);
    if (mode === 'work') setTimeLeft(25 * 60);
    if (mode === 'short') setTimeLeft(5 * 60);
    if (mode === 'long') setTimeLeft(15 * 60);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Canlı Çeviri Arama (Sözlük & Reading Kelime Tıklama)
  const translateLive = async (wordToTranslate) => {
    const clean = wordToTranslate.replace(/[.,!?;:"']/g, '').trim();
    if (!clean) return;
    setIsSearchingLive(true);
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=en|tr`);
      const data = await res.json();
      const translated = data?.responseData?.translatedText || 'Çeviri bulunamadı';
      setLiveResult({
        id: Date.now(),
        en: clean,
        tr: translated,
        level: 'Canlı',
        type: 'Sözlük',
        phonetic: '/canlı çeviri/',
        example: `Example usage of "${clean}".`,
        exTr: `"${clean}" kelimesinin canlı çevirisi.`
      });
    } catch {
      setLiveResult(null);
    } finally {
      setIsSearchingLive(false);
    }
  };

  const handleWordClick = async (rawWord) => {
    const clean = rawWord.replace(/[.,!?;:"']/g, '').trim();
    if (!clean) return;
    setClickedWord(clean);
    setClickedTranslation('Çevriliyor...');
    const found = words.find((w) => w.en.toLowerCase() === clean.toLowerCase());
    if (found) {
      setClickedTranslation(found.tr);
      return;
    }
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=en|tr`);
      const data = await res.json();
      setClickedTranslation(data?.responseData?.translatedText || 'Anlam bulunamadı');
    } catch {
      setClickedTranslation('Bağlantı hatası');
    }
  };

  // Hesaplamalar
  const totalCalories = meals.filter((m) => m.eaten).reduce((sum, m) => sum + m.cal, 0);
  const completedTasks = tasks.filter((t) => t.done).length;
  const taskProgress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const filteredWords = words.filter((w) => {
    const matchesQuery =
      w.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.tr.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      dictFilter === 'ALL' ||
      w.level === dictFilter ||
      (dictFilter === 'PHRASAL' && w.type === 'Phrasal Verb');
    return matchesQuery && matchesFilter;
  });

  const menuItems = [
    { id: 'overview', label: 'Genel Bakış', icon: <Layers size={20} /> },
    { id: 'tasks', label: 'Görevler', icon: <CheckCircle size={20} /> },
    { id: 'reading', label: 'Reading (A1-B2)', icon: <BookOpen size={20} /> },
    { id: 'dictionary', label: 'Canlı Sözlük', icon: <Search size={20} /> },
    { id: 'resources', label: 'Kartlar & Kaynaklar', icon: <FolderOpen size={20} /> },
    { id: 'pomodoro', label: 'Pomodoro', icon: <Clock size={20} /> },
    { id: 'settings', label: 'Ayarlar', icon: <Settings size={20} /> }
  ];

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${themeClasses[theme]} ${fontSizeClass}`}>
      {/* ÜST BAR */}
      <header className={`sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b backdrop-blur-md ${cardClasses[theme]}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2.5 rounded-xl hover:bg-white/10 transition-colors"
            title="Menüyü Aç"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">FocusStudio</h1>
            <p className="text-xs opacity-60">Hoş geldin, {userName} • Günlük Hedef: %{taskProgress}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('dictionary')}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl border border-current/15 hover:bg-white/10 text-sm"
          >
            <Search size={16} /> Sözlük
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className="p-2.5 rounded-xl border border-current/15 hover:bg-white/10 transition-colors"
            title="Ayarlar"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* SOL KAYDIRMALI MENÜ (DRAWER) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className={`relative w-80 max-w-[85vw] h-full p-6 flex flex-col justify-between border-r z-10 ${cardClasses[theme]}`}>
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-current/10">
                <div>
                  <h2 className="text-2xl font-bold">FocusStudio</h2>
                  <p className="text-xs opacity-60">Dil & Üretkenlik Asistanı</p>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-xl hover:bg-white/10">
                  <X size={22} />
                </button>
              </div>

              <nav className="space-y-1.5">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                      activeTab === item.id
                        ? accentClasses[theme]
                        : 'hover:bg-white/10 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-current/10 text-xs opacity-60 flex justify-between items-center">
              <span>Aktif Tema: {theme.toUpperCase()}</span>
              <span>v2.0 Tam Sürüm</span>
            </div>
          </div>
        </div>
      )}

      {/* ANA İÇERİK */}
      <main className="max-w-6xl mx-auto p-6 space-y-6 pb-20">
        {/* 1. GENEL BAKIŞ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Günün Vizyon Sözü */}
            <div className={`p-7 rounded-3xl border relative overflow-hidden ${cardClasses[theme]}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest opacity-60 font-semibold">Günün Vizyon Sözü</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => speakText(QUOTES[quoteIdx].text)}
                    className="p-2 rounded-xl border border-current/15 hover:bg-white/10"
                    title="Sesli Dinle"
                  >
                    <Volume2 size={16} />
                  </button>
                  <button
                    onClick={() => setQuoteIdx((quoteIdx + 1) % QUOTES.length)}
                    className="p-2 rounded-xl border border-current/15 hover:bg-white/10"
                    title="Sözü Değiştir"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-serif italic leading-relaxed">
                "{QUOTES[quoteIdx].text}"
              </p>
              <p className="mt-2 text-sm opacity-75">{QUOTES[quoteIdx].tr}</p>
              <p className="mt-3 text-right text-sm font-semibold opacity-80">— {QUOTES[quoteIdx].author}</p>
            </div>

            {/* Orta Grid: Yurt Menüsü & Öğrenme İlerlemesi */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Yurt Menüsü & Kalori */}
              <div className={`p-6 rounded-3xl border flex flex-col justify-between ${cardClasses[theme]}`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Utensils size={20} /> Günün Yurt Menüsü
                    </h3>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full bg-white/10">
                      {totalCalories} / {calorieGoal} kcal
                    </span>
                  </div>

                  <div className="space-y-3">
                    {meals.map((meal) => (
                      <div
                        key={meal.id}
                        onClick={() =>
                          setMeals(meals.map((m) => (m.id === meal.id ? { ...m, eaten: !m.eaten } : m)))
                        }
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          meal.eaten ? 'border-current/30 bg-white/10' : 'border-current/10 opacity-50'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold uppercase opacity-70">{meal.period}</span>
                          <p className="font-medium">{meal.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold">{meal.cal} kcal</span>
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${meal.eaten ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-current/40'}`}>
                            {meal.eaten && <Check size={14} />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hızlı Öğün Ekle */}
                <div className="mt-5 pt-4 border-t border-current/10 flex gap-2">
                  <input
                    type="text"
                    placeholder="Ek öğün/atıştırmalık..."
                    value={newMealName}
                    onChange={(e) => setNewMealName(e.target.value)}
                    className="flex-1 bg-black/20 px-3 py-2 rounded-xl outline-none text-sm border border-current/10"
                  />
                  <input
                    type="number"
                    placeholder="kcal"
                    value={newMealCal}
                    onChange={(e) => setNewMealCal(e.target.value)}
                    className="w-20 bg-black/20 px-3 py-2 rounded-xl outline-none text-sm border border-current/10"
                  />
                  <button
                    onClick={() => {
                      if (!newMealName || !newMealCal) return;
                      setMeals([...meals, { id: Date.now(), period: 'Ekstra', name: newMealName, cal: Number(newMealCal), eaten: true }]);
                      setNewMealName('');
                      setNewMealCal('');
                    }}
                    className={`px-3 py-2 rounded-xl ${accentClasses[theme]}`}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Öğrenme İlerlemesi & Kısayollar */}
              <div className={`p-6 rounded-3xl border flex flex-col justify-between ${cardClasses[theme]}`}>
                <div className="space-y-5">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Award size={20} /> Günlük Çalışma İlerlemesi
                  </h3>

                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span>Günlük Görev Tamamlama</span>
                      <span className="font-bold">%{taskProgress} ({completedTasks}/{tasks.length})</span>
                    </div>
                    <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full transition-all" style={{ width: `${taskProgress}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span>Kelime Kartı Destesi</span>
                      <span className="font-bold">{flashcards.length} Aktif Kart</span>
                    </div>
                    <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full" style={{ width: `${Math.min(100, flashcards.length * 10)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span>Reading & Listening Hedefi</span>
                      <span className="font-bold">35 / 45 dk</span>
                    </div>
                    <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-current/10">
                  <button onClick={() => setActiveTab('reading')} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-center text-sm font-medium">
                    📚 Reading Aç
                  </button>
                  <button onClick={() => setActiveTab('dictionary')} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-center text-sm font-medium">
                    🔍 Sözlüğe Git
                  </button>
                  <button onClick={() => setActiveTab('pomodoro')} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-center text-sm font-medium">
                    ⏱️ Pomodoro
                  </button>
                </div>
              </div>
            </div>

            {/* Kültür, Kitap & Müzik Önerileri */}
            <div className={`p-6 rounded-3xl border ${cardClasses[theme]}`}>
              <h3 className="text-xl font-bold mb-4">Günün Kültür & Odak Önerileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-current/10 flex items-start gap-3">
                  <Book className="mt-1 shrink-0 opacity-80" size={20} />
                  <div>
                    <span className="text-xs uppercase opacity-60">İngilizce Kitap (B1)</span>
                    <h4 className="font-bold">The Giver — Lois Lowry</h4>
                    <p className="text-xs opacity-75 mt-1">Akıcı dili ve sade kelime yapısıyla orta seviye okuma pratiği için ideal.</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-current/10 flex items-start gap-3">
                  <Music className="mt-1 shrink-0 opacity-80" size={20} />
                  <div>
                    <span className="text-xs uppercase opacity-60">Odaklanma Frekansı</span>
                    <h4 className="font-bold">Binaural Beats 40Hz & Lofi</h4>
                    <p className="text-xs opacity-75 mt-1">Kelime ezberi ve okuma sırasında dış sesleri maskeleyen sakin ritimler.</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-current/10 flex items-start gap-3">
                  <Globe className="mt-1 shrink-0 opacity-80" size={20} />
                  <div>
                    <span className="text-xs uppercase opacity-60">Günün Phrasal Verb'ü</span>
                    <h4 className="font-bold">Figure out (Çözmek, anlamak)</h4>
                    <p className="text-xs opacity-75 mt-1">"I need to figure out how this system works."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. GÖREVLER SEKMESİ */}
        {activeTab === 'tasks' && (
          <div className={`p-6 rounded-3xl border space-y-6 ${cardClasses[theme]}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Günlük Çalışma Görevleri</h2>
                <p className="text-sm opacity-70">Tamamlanan: {completedTasks} / {tasks.length} görev</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Yeni çalışma görevi ekle..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 bg-black/20 px-4 py-3 rounded-2xl outline-none border border-current/15"
              />
              <select
                value={newTaskCat}
                onChange={(e) => setNewTaskCat(e.target.value)}
                className="bg-black/20 px-4 py-3 rounded-2xl outline-none border border-current/15"
              >
                <option value="Reading">Reading</option>
                <option value="Vocabulary">Vocabulary</option>
                <option value="Listening">Listening</option>
                <option value="Focus">Focus</option>
              </select>
              <button
                onClick={() => {
                  if (!newTaskTitle.trim()) return;
                  setTasks([...tasks, { id: Date.now(), title: newTaskTitle, category: newTaskCat, done: false }]);
                  setNewTaskTitle('');
                }}
                className={`px-6 py-3 rounded-2xl flex items-center justify-center gap-2 ${accentClasses[theme]}`}
              >
                <Plus size={18} /> Ekle
              </button>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    task.done ? 'opacity-50 bg-black/10 border-current/10' : 'bg-white/5 border-current/20'
                  }`}
                >
                  <div
                    onClick={() => setTasks(tasks.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)))}
                    className="flex items-center gap-3.5 cursor-pointer flex-1"
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${task.done ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-current/40'}`}>
                      {task.done && <Check size={16} />}
                    </div>
                    <div>
                      <p className={`font-medium ${task.done ? 'line-through' : ''}`}>{task.title}</p>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 opacity-75">{task.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
                    className="p-2 rounded-xl hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. READING KÜTÜPHANESİ (A1-B2) */}
        {activeTab === 'reading' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">A1–B2 Reading Kütüphanesi</h2>
                <p className="text-sm opacity-70">Metindeki herhangi bir kelimeye tıklayarak anında Türkçe çevirisini görebilirsin.</p>
              </div>
              <div className="flex gap-2">
                {['ALL', 'A1', 'B1', 'B2'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                      selectedLevel === lvl ? accentClasses[theme] : 'border-current/15 hover:bg-white/10'
                    }`}
                  >
                    {lvl === 'ALL' ? 'Tümü' : lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sol Liste */}
              <div className="space-y-3">
                {STORIES.filter((s) => selectedLevel === 'ALL' || s.level === selectedLevel).map((story) => (
                  <div
                    key={story.id}
                    onClick={() => {
                      setActiveStory(story);
                      setClickedWord(null);
                      setQuizAnswers({});
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      activeStory.id === story.id ? `${cardClasses[theme]} ring-2 ring-cyan-400` : `${cardClasses[theme]} opacity-70 hover:opacity-100`
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/15">{story.level}</span>
                      <span className="text-xs opacity-60">{story.duration}</span>
                    </div>
                    <h3 className="font-bold text-lg">{story.title}</h3>
                  </div>
                ))}
              </div>

              {/* Sağ Okuma Alanı */}
              <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-6 ${cardClasses[theme]}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-current/10">
                  <div>
                    <span className="text-xs font-bold uppercase opacity-60">Seviye {activeStory.level} • {activeStory.duration}</span>
                    <h3 className="text-2xl font-bold">{activeStory.title}</h3>
                  </div>
                  <button
                    onClick={() => speakText(activeStory.content)}
                    className={`px-4 py-2.5 rounded-xl flex items-center gap-2 ${accentClasses[theme]}`}
                  >
                    <Volume2 size={18} /> Sesli Dinle ({ttsAccent === 'en-US' ? 'US' : 'UK'})
                  </button>
                </div>

                {/* Tıklanabilir Kelime Balonu */}
                {clickedWord && (
                  <div className="p-4 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-lg">{clickedWord}</span>
                      <span className="mx-2">→</span>
                      <span className="font-semibold text-cyan-300">{clickedTranslation}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => speakText(clickedWord)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-bold"
                      >
                        Dinle
                      </button>
                      <button
                        onClick={() => {
                          if (!flashcards.some((f) => f.en.toLowerCase() === clickedWord.toLowerCase())) {
                            setFlashcards([...flashcards, { id: Date.now(), en: clickedWord, tr: clickedTranslation, level: activeStory.level }]);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold"
                      >
                        + Kartlara Ekle
                      </button>
                    </div>
                  </div>
                )}

                {/* Okuma Metni */}
                <div className={`leading-relaxed text-lg ${readingFont === 'serif' ? 'font-serif' : 'font-sans'} space-y-2`}>
                  <p className="flex flex-wrap gap-x-1.5 gap-y-1">
                    {activeStory.content.split(' ').map((word, idx) => (
                      <span
                        key={idx}
                        onClick={() => handleWordClick(word)}
                        className="cursor-pointer px-1 rounded hover:bg-cyan-500/30 transition-colors"
                      >
                        {word}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Türkçe Özet */}
                <div className="p-4 rounded-2xl bg-black/20 border border-current/10 text-sm opacity-85">
                  <p className="font-bold mb-1">Türkçe Özet:</p>
                  <p>{activeStory.trSummary}</p>
                </div>

                {/* Okuma Sonu Quiz */}
                <div className="pt-4 border-t border-current/10 space-y-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <HelpCircle size={18} /> Okuduğunu Anlama Soruları
                  </h4>
                  {activeStory.quiz.map((qItem, qIdx) => (
                    <div key={qIdx} className="p-4 rounded-2xl bg-white/5 space-y-2">
                      <p className="font-medium">{qIdx + 1}. {qItem.q}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {qItem.options.map((opt, oIdx) => {
                          const selected = quizAnswers[qIdx] === oIdx;
                          const isCorrect = qItem.answer === oIdx;
                          let btnStyle = 'border-current/15 hover:bg-white/10';
                          if (selected) {
                            btnStyle = isCorrect
                              ? 'bg-emerald-500 text-black font-bold border-emerald-500'
                              : 'bg-red-500/80 text-white border-red-500';
                          }
                          return (
                            <button
                              key={oIdx}
                              onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: oIdx })}
                              className={`p-2.5 rounded-xl border text-left text-sm transition-all ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. CANLI TÜRKÇE-İNGİLİZCE SÖZLÜK */}
        {activeTab === 'dictionary' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Canlı Türkçe ↔ İngilizce Sözlük</h2>
                <p className="text-sm opacity-70">Hazır akademik kelimeler, Phrasal Verb'ler ve canlı internet çevirisi.</p>
              </div>
              <button
                onClick={() => {
                  const shuffled = [...INITIAL_WORDS].sort(() => 0.5 - Math.random());
                  setWords(shuffled);
                }}
                className="px-4 py-2.5 rounded-xl border border-current/20 hover:bg-white/10 flex items-center gap-2 text-sm font-semibold self-start"
              >
                <RefreshCw size={16} /> Rastgele Karıştır
              </button>
            </div>

            {/* Arama & Canlı Çeviri Çubuğu */}
            <div className={`p-3 rounded-2xl border flex flex-col sm:flex-row gap-3 ${cardClasses[theme]}`}>
              <div className="flex items-center flex-1 gap-3 px-3">
                <Search size={20} className="opacity-50" />
                <input
                  type="text"
                  placeholder="İngilizce veya Türkçe bir kelime yazın..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              <button
                onClick={() => translateLive(searchQuery)}
                className={`px-6 py-3 rounded-xl ${accentClasses[theme]}`}
              >
                {isSearchingLive ? 'Aranıyor...' : 'Canlı Sözlükte Ara'}
              </button>
            </div>

            {/* Seviye Filtreleri */}
            <div className="flex flex-wrap gap-2">
              {['ALL', 'A2', 'B1', 'B2', 'C1', 'PHRASAL'].map((flt) => (
                <button
                  key={flt}
                  onClick={() => setDictFilter(flt)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    dictFilter === flt ? accentClasses[theme] : 'border-current/15 hover:bg-white/10'
                  }`}
                >
                  {flt === 'ALL' ? 'Tümü' : flt === 'PHRASAL' ? 'Phrasal Verbs' : flt}
                </button>
              ))}
            </div>

            {/* Canlı Çeviri Sonucu Varsa */}
            {liveResult && (
              <div className="p-5 rounded-3xl border-2 border-cyan-400/50 bg-cyan-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-cyan-400 text-black">Canlı Çeviri Sonucu</span>
                  <h3 className="text-2xl font-bold mt-1">{liveResult.en} — {liveResult.tr}</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => speakText(liveResult.en)} className="px-4 py-2 rounded-xl bg-white/10 text-sm font-bold flex items-center gap-2">
                    <Volume2 size={16} /> Dinle
                  </button>
                  <button
                    onClick={() => setFlashcards([...flashcards, liveResult])}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-black text-sm font-bold"
                  >
                    + Kartlara Ekle
                  </button>
                </div>
              </div>
            )}

            {/* Kelime Kartları Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWords.map((item) => {
                const inDeck = flashcards.some((f) => f.en.toLowerCase() === item.en.toLowerCase());
                return (
                  <div key={item.id} className={`p-5 rounded-3xl border flex flex-col justify-between ${cardClasses[theme]}`}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/15">{item.level}</span>
                          <span className="text-xs opacity-60">{item.type}</span>
                          <span className="text-xs opacity-50">{item.phonetic}</span>
                        </div>
                        <button
                          onClick={() => speakText(item.en)}
                          className="p-2 rounded-xl hover:bg-white/10"
                          title="Telaffuzu Dinle"
                        >
                          <Volume2 size={18} />
                        </button>
                      </div>
                      <h3 className="text-xl font-bold">{item.en}</h3>
                      <p className="font-semibold opacity-90 mb-3">{item.tr}</p>
                      <div className="p-3 rounded-2xl bg-black/20 text-xs space-y-1">
                        <p className="italic">"{item.example}"</p>
                        <p className="opacity-70">{item.exTr}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-current/10 flex justify-end">
                      <button
                        disabled={inDeck}
                        onClick={() => setFlashcards([...flashcards, item])}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          inDeck ? 'bg-emerald-500/20 text-emerald-300' : accentClasses[theme]
                        }`}
                      >
                        {inDeck ? '✓ Kartlarda Ekli' : '+ Kartlara Ekle'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. KELİME KARTLARI (FLASHCARDS) & KAYNAKLAR */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Kelime Kartları (Flip Card) */}
            <div className={`p-6 rounded-3xl border space-y-5 ${cardClasses[theme]}`}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Çalışma Kartlarım ({flashcards.length})</h2>
                <span className="text-xs opacity-70">Kartı çevirmek için üzerine tıkla</span>
              </div>

              {flashcards.length > 0 ? (
                <div className="space-y-4">
                  <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="h-64 rounded-3xl border border-current/20 bg-black/20 flex flex-col items-center justify-center p-6 cursor-pointer select-none text-center transition-all hover:border-current/40"
                  >
                    <span className="text-xs uppercase tracking-widest opacity-50 mb-2">
                      {isFlipped ? 'TÜRKÇE ANLAMI' : 'İNGİLİZCE KELİME'}
                    </span>
                    <h3 className="text-3xl font-extrabold">
                      {isFlipped ? flashcards[currentCardIdx]?.tr : flashcards[currentCardIdx]?.en}
                    </h3>
                    {!isFlipped && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(flashcards[currentCardIdx]?.en);
                        }}
                        className="mt-4 p-2.5 rounded-xl bg-white/10 hover:bg-white/20"
                      >
                        <Volume2 size={20} />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setIsFlipped(false);
                        setCurrentCardIdx((prev) => (prev - 1 + flashcards.length) % flashcards.length);
                      }}
                      className="px-4 py-2 rounded-xl border border-current/20 hover:bg-white/10 text-sm"
                    >
                      ← Önceki
                    </button>
                    <span className="text-sm font-bold">
                      {currentCardIdx + 1} / {flashcards.length}
                    </span>
                    <button
                      onClick={() => {
                        setIsFlipped(false);
                        setCurrentCardIdx((prev) => (prev + 1) % flashcards.length);
                      }}
                      className="px-4 py-2 rounded-xl border border-current/20 hover:bg-white/10 text-sm"
                    >
                      Sonraki →
                    </button>
                  </div>
                </div>
              ) : (
                <p className="opacity-70 text-sm">Henüz kart eklemedin. Sözlükten veya Reading metinlerinden ekleyebilirsin.</p>
              )}
            </div>

            {/* Kaynaklar & Dosyalar */}
            <div className={`p-6 rounded-3xl border space-y-5 ${cardClasses[theme]}`}>
              <h2 className="text-xl font-bold">Ders Kaynakları & Notlar</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Yeni kaynak veya PDF not adı..."
                  value={newResourceTitle}
                  onChange={(e) => setNewResourceTitle(e.target.value)}
                  className="flex-1 bg-black/20 px-4 py-2.5 rounded-xl outline-none border border-current/15 text-sm"
                />
                <button
                  onClick={() => {
                    if (!newResourceTitle.trim()) return;
                    setResources([...resources, { id: Date.now(), title: newResourceTitle, tag: 'Not', date: 'Şimdi' }]);
                    setNewResourceTitle('');
                  }}
                  className={`px-4 py-2.5 rounded-xl ${accentClasses[theme]}`}
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="space-y-3">
                {resources.map((res) => (
                  <div key={res.id} className="p-4 rounded-2xl bg-white/5 border border-current/10 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{res.title}</p>
                      <span className="text-xs opacity-60">{res.tag} • {res.date}</span>
                    </div>
                    <button
                      onClick={() => setResources(resources.filter((r) => r.id !== res.id))}
                      className="p-2 rounded-xl hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. POMODORO SAYACI */}
        {activeTab === 'pomodoro' && (
          <div className={`p-8 rounded-3xl border max-w-xl mx-auto text-center space-y-6 ${cardClasses[theme]}`}>
            <h2 className="text-2xl font-bold">Odaklanma Sayacı (Pomodoro)</h2>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => switchPomoMode('work')}
                className={`px-4 py-2 rounded-xl text-sm font-bold ${pomoMode === 'work' ? accentClasses[theme] : 'bg-white/10'}`}
              >
                Odak (25 dk)
              </button>
              <button
                onClick={() => switchPomoMode('short')}
                className={`px-4 py-2 rounded-xl text-sm font-bold ${pomoMode === 'short' ? accentClasses[theme] : 'bg-white/10'}`}
              >
                Kısa Mola (5 dk)
              </button>
              <button
                onClick={() => switchPomoMode('long')}
                className={`px-4 py-2 rounded-xl text-sm font-bold ${pomoMode === 'long' ? accentClasses[theme] : 'bg-white/10'}`}
              >
                Uzun Mola (15 dk)
              </button>
            </div>

            <div className="text-7xl font-mono font-extrabold tracking-wider py-8">
              {formatTime(timeLeft)}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-8 py-4 rounded-2xl flex items-center gap-2 text-lg ${accentClasses[theme]}`}
              >
                {isRunning ? <Pause size={22} /> : <Play size={22} />}
                {isRunning ? 'Duraklat' : 'Başlat'}
              </button>
              <button
                onClick={() => switchPomoMode(pomoMode)}
                className="p-4 rounded-2xl border border-current/20 hover:bg-white/10"
              >
                <RotateCcw size={22} />
              </button>
            </div>
          </div>
        )}

        {/* 7. AYARLAR SEKMESİ */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Uygulama Ayarları</h2>

            {/* Atmosfer & Tema Seçimi */}
            <div className={`p-6 rounded-3xl border space-y-4 ${cardClasses[theme]}`}>
              <h3 className="text-xl font-bold">Atmosfer & Tema Seçimi</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { id: 'midnight', name: 'Gece Mavisi', icon: <Moon size={20} />, desc: 'Derin lacivert & buz mavisi' },
                  { id: 'forest', name: 'Orman & Adaçayı', icon: <Trees size={20} />, desc: 'Yosun yeşili & zümrüt' },
                  { id: 'espresso', name: 'Sıcak Espresso', icon: <Coffee size={20} />, desc: 'Kindle kahve & kehribar' },
                  { id: 'aurora', name: 'Kuzey Işıkları', icon: <Sparkles size={20} />, desc: 'İndigo & buğulu mor' },
                  { id: 'dark', name: 'Klasik Koyu', icon: <Moon size={20} />, desc: 'Sade antrasit siyah' },
                  { id: 'light', name: 'Açık Mod', icon: <Sun size={20} />, desc: 'Ferah gündüz kağıt modu' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      theme === t.id ? 'border-cyan-400 ring-2 ring-cyan-400/40 bg-white/10' : 'border-current/15 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1">
                      {t.icon} {t.name}
                    </div>
                    <p className="text-xs opacity-65">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Görünüm, Ses ve Kişisel Hedefler */}
            <div className={`p-6 rounded-3xl border space-y-5 ${cardClasses[theme]}`}>
              <h3 className="text-xl font-bold">Yazı Boyutu, Seslendirme & Hedefler</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-black/20 flex items-center justify-between">
                  <span>Uygulama Yazı Boyutu</span>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="bg-black/40 px-3 py-2 rounded-xl outline-none border border-current/20"
                  >
                    <option value="sm">Küçük</option>
                    <option value="base">Normal</option>
                    <option value="lg">Büyük</option>
                    <option value="xl">Çok Büyük</option>
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-black/20 flex items-center justify-between">
                  <span>Reading Metin Fontu</span>
                  <select
                    value={readingFont}
                    onChange={(e) => setReadingFont(e.target.value)}
                    className="bg-black/40 px-3 py-2 rounded-xl outline-none border border-current/20"
                  >
                    <option value="sans">Modern (Sans-Serif)</option>
                    <option value="serif">Kitap (Serif)</option>
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-black/20 flex items-center justify-between">
                  <span>İngilizce Telaffuz Aksanı</span>
                  <select
                    value={ttsAccent}
                    onChange={(e) => setTtsAccent(e.target.value)}
                    className="bg-black/40 px-3 py-2 rounded-xl outline-none border border-current/20"
                  >
                    <option value="en-US">Amerikan (US)</option>
                    <option value="en-GB">İngiliz (UK)</option>
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-black/20 flex items-center justify-between">
                  <span>Sesli Okuma Hızı</span>
                  <select
                    value={ttsSpeed}
                    onChange={(e) => setTtsSpeed(Number(e.target.value))}
                    className="bg-black/40 px-3 py-2 rounded-xl outline-none border border-current/20"
                  >
                    <option value={0.75}>Yavaş (0.75x)</option>
                    <option value={1.0}>Normal (1.0x)</option>
                    <option value={1.25}>Hızlı (1.25x)</option>
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-black/20 flex items-center justify-between">
                  <span>Günlük Kalori Hedefi (kcal)</span>
                  <input
                    type="number"
                    value={calorieGoal}
                    onChange={(e) => setCalorieGoal(Number(e.target.value))}
                    className="w-28 bg-black/40 px-3 py-2 rounded-xl outline-none border border-current/20 text-right"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-black/20 flex items-center justify-between">
                  <span>Kullanıcı Adı</span>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-36 bg-black/40 px-3 py-2 rounded-xl outline-none border border-current/20 text-right"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}