import { Donghua, CultivationRealm, SubscriptionPlan } from '../types/donghua';

const banner = (name: string) => `${import.meta.env.BASE_URL}banners/${name}.webp?v=3`;
const poster = (name: string) => `${import.meta.env.BASE_URL}posters/${name}.webp`;

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'hourly-3',
    nameFa: 'اشتراک ساعتی (۳ ساعته)',
    durationLabel: '۳ ساعت دسترسی کامل',
    durationHours: 3,
    priceTomans: 25000,
    descriptionFa: 'ایده‌آل برای تماشای چند قسمت جدید در زمان استراحت یا ماراتن شبانه.',
    features: ['دسترسی به تمامی کیفیت‌های ۴K و ۱۰۸۰p', 'بدون تبلیغات', 'پخش بلادرنگ دانماکو']
  },
  {
    id: 'daily-1',
    nameFa: 'اشتراک روزانه (۲۴ ساعته)',
    durationLabel: '۱ شبانه‌روز نامحدود',
    durationHours: 24,
    priceTomans: 45000,
    descriptionFa: 'مناسب برای روزهای تعطیل و تماشای یک فصل کامل از انیمه مورد علاقه.',
    features: ['دسترسی نامحدود ۲۴ ساعته', 'کیفیت فوق‌العاده ۶۰ فریم', 'دانلود نیم‌بهاء']
  },
  {
    id: 'daily-3',
    nameFa: 'اشتراک ۳ روزه (آخر هفته)',
    durationLabel: '۷۲ ساعت دسترسی ویژه',
    durationHours: 72,
    priceTomans: 85000,
    descriptionFa: 'پکیج اقتصادی برای آخر هفته با تخفیف ویژه برای تماشای گروهی.',
    features: ['دسترسی ۷۲ ساعته روی ۲ دستگاه', 'ترافیک کاملاً نیم‌بهاء', 'پشتیبانی اولویت‌دار']
  },
  {
    id: 'monthly-1',
    nameFa: 'اشتراک ماهانه طلایی (VIP)',
    durationLabel: '۳۰ روز نامحدود طلایی',
    durationHours: 720,
    priceTomans: 195000,
    descriptionFa: 'محبوب‌ترین پلن برای علاقه‌مندان پروپاقرص دونگهوا با دسترسی بی‌قید و شرط به تمام آرشیو.',
    features: ['دسترسی نامحدود به بیش از ۱۰۰۰ قسمت', 'دوبله اختصاصی همزمان با پخش جهانی', 'دانلود با حداکثر سرعت سرورهای اختصاصی', 'نشان VIP در سامانه نظرات دانماکو'],
    isPopular: true
  },
  {
    id: 'chapter-single',
    nameFa: 'خرید تکی قسمت (چپتر)',
    durationLabel: 'دسترسی مادام‌العمر به یک قسمت',
    durationHours: 87600,
    priceTomans: 9000,
    descriptionFa: 'خرید تکی و دائمی فقط یک قسمت دلخواه بدون نیاز به خرید اشتراک ماهانه.',
    features: ['مالکیت دائمی قسمت خریداری شده', 'قابلیت تماشا و دانلود در هر زمان', 'کیفیت ۴K ۶۰FPS']
  }
];

export const CULTIVATION_REALMS: CultivationRealm[] = [
  {
    id: 1,
    nameFa: 'تراکم چی (سطح اول)',
    nameEn: 'Qi Condensation',
    descriptionFa: 'اولین گام در مسیر جاودانگی؛ جذب چی طبیعی جهان به درون کانال‌های انرژی مریدین و تصفیه کالبد فانی.',
    tribulation: 'بدون عذاب آسمانی',
    spiritualSpan: '۱۰۰ سال طول عمر',
    color: '#38bdf8'
  },
  {
    id: 2,
    nameFa: 'بنیان‌گذاری معنوی',
    nameEn: 'Foundation Establishment',
    descriptionFa: 'تبدیل چی گازی به دریای چی مایع در دان‌تیان و پاکسازی مغز استخوان و رگ‌ها.',
    tribulation: 'صاعقه کوچک سه گانه',
    spiritualSpan: '۲۵۰ سال طول عمر',
    color: '#34d399'
  },
  {
    id: 3,
    nameFa: 'تشکیل هسته طلایی',
    nameEn: 'Golden Core Formation',
    descriptionFa: 'فشرده‌سازی دریای مایع چی به یک هسته متراکم درخشان و جاودان؛ توانایی پرواز با شمشیر معنوی در آسمان‌ها.',
    tribulation: 'شش صاعقه الهی',
    spiritualSpan: '۵۰۰ سال طول عمر',
    color: '#fbbf24'
  },
  {
    id: 4,
    nameFa: 'تولد روح اولیه',
    nameEn: 'Nascent Soul',
    descriptionFa: 'شکسته شدن هسته طلایی و تولد یک روح مینیاتوری فناناپذیر؛ حتی با نابودی کالبد فیزیکی، روح به حیات ادامه می‌دهد.',
    tribulation: 'نه صاعقه آسمانی بنفش',
    spiritualSpan: '۱,۵۰۰ سال طول عمر',
    color: '#c084fc'
  },
  {
    id: 5,
    nameFa: 'تبدیل الوهیت و درک تائو',
    nameEn: 'Soul Transformation / Deity',
    descriptionFa: 'درک قواعد و قوانین جهان هستی؛ ادغام هوشیاری روحانی با قلمروهای زمین و آسمان.',
    tribulation: 'عذاب آتشین یین و یانگ',
    spiritualSpan: '۳,۰۰۰ سال طول عمر',
    color: '#f43f5e'
  },
  {
    id: 6,
    nameFa: 'تهی‌پالایی و نفوذ در ابعاد',
    nameEn: 'Void Refinement',
    descriptionFa: 'درک خلأ و فضا؛ شکستن پیوندهای بعد سوم و گام برداشتن در میان ابعاد پنهان کیهان.',
    tribulation: 'صاعقه خلأ سیاه',
    spiritualSpan: '۱۰,۰۰۰ سال طول عمر',
    color: '#818cf8'
  },
  {
    id: 7,
    nameFa: 'صعود بزرگ مهایانا',
    nameEn: 'Great Mahayana',
    descriptionFa: 'اوج تزکیه در قلمروهای فانی؛ آماده شدن برای تحمل عذاب آسمانی نهایی و صعود به جهان فناناپذیران.',
    tribulation: 'هشتاد و یک صاعقه خشم کیهان',
    spiritualSpan: 'طول عمر نامحدود فانی',
    color: '#eab308'
  },
  {
    id: 8,
    nameFa: 'جاودانه حقیقی کیهانی',
    nameEn: 'True Celestial Immortal',
    descriptionFa: 'فراتر از مرگ و تولد دوباره؛ حکمرانی بر قوانین زمان، مکان و تجلی مطلق تائو.',
    tribulation: 'فارغ از عذاب‌های فانی',
    spiritualSpan: 'ابدیت کیهانی',
    color: '#10b981'
  }
];

export const INITIAL_DONGHUA_LIST: Donghua[] = [
  {
    id: 'btth',
    slug: 'battle-through-the-heavens',
    titleFa: 'نبرد از طریق آسمان‌ها',
    titleEn: 'Battle Through the Heavens',
    studio: 'Shanghai Foch Film / Tencent Video',
    releaseYear: 2017,
    rating: 9.8,
    viewsCount: '۱۲.۸ میلیارد',
    episodesTotal: 156,
    episodesCurrent: 142,
    synopsisFa: 'در سرزمینی که هیچ جادویی وجود ندارد و تنها قانون، نیروی مطلق دو چی (Dou Qi) است؛ شیائو یان، نابغه خاندان شیائو، ناگهان تمام قدرت‌هایش را از دست می‌دهد. با بیدار شدن روح استاد باستانی یائو چِن در انگشتر موروثی‌اش، مسیر پرفراز و نشیب مهار شعله‌های بهشتی و انتقام آغاز می‌شود.',
    synopsisEn: 'In a land where Dou Qi is the ultimate law, genius Xiao Yan unexpectedly loses his powers. With ancient master Yao Chen awakening in his ring, his legendary journey begins.',
    genres: ['شیان‌شیا', 'اکشن', 'ماجراجویی', 'تزکیه'],
    cultivationSystem: 'دو چی (Dou Qi) · شعله‌های آسمانی',
    currentRealmFa: 'دو زونگ (Dou Zong) - ستاره ششم',
    status: 'در حال پخش',
    broadcastDayFa: 'یکشنبه',
    broadcastTime: 'هر یکشنبه ساعت ۱۰:۰۰ صبح',
    posterUrl: poster('btth'),
    bannerUrl: banner('btth'),
    themeColor: 'from-amber-600/40 via-red-900/30 to-black',
    accentGlow: '#f97316',
    taglineFa: 'سی سال در شرق رودخانه، سی سال در غرب؛ هرگز جوانی پرامید را تحقیر نکن',
    characters: [
      {
        nameFa: 'شیائو یان',
        nameEn: 'Xiao Yan',
        role: 'شخصیت اصلی / امپراتور شعله‌ها',
        cultivationRealm: 'Dou Zong',
        spiritWeapon: 'خط‌کش سیاه باستانی (Heavy Xuan Ruler)',
        faction: 'اتحاد یان / پاویون ستاره',
        avatarBg: 'bg-amber-950',
        descriptionFa: 'مالک شعله‌های بهشتی چندگانه؛ اراده‌ای پولادین که از خاکستر تحقیر به اوج قاره رسید.'
      },
      {
        nameFa: 'ملکه مدوسا (سای لین)',
        nameEn: 'Queen Medusa',
        role: 'ملکه مارها / همسر و حامی',
        cultivationRealm: 'Dou Zong اوج',
        spiritWeapon: 'مار هفت‌رنگ بهشتی',
        faction: 'قبیله مارها',
        avatarBg: 'bg-rose-950',
        descriptionFa: 'حکمران مقتدر و با ابهت قبیله مارها با زیبایی خیره‌کننده و قدرتی ویرانگر.'
      }
    ],
    episodes: [
      { number: 142, titleFa: 'نبرد در تنگه صاعقه‌خیز و ظهور مه بنفش', duration: '۲۴:۱۵', airDate: '۳ روز پیش', thumbnailColor: '#b45309', isVip: true, priceTomans: 9000 },
      { number: 141, titleFa: 'انفجار لوتوس خشم بودا بر فراز دشت شنی', duration: '۲۳:۴۰', airDate: '۱۰ روز پیش', thumbnailColor: '#9a3412', isVip: true, priceTomans: 9000 },
      { number: 140, titleFa: 'رویارویی با بزرگان تالار ارواح', duration: '۲۲:۵۰', airDate: '۱۷ روز پیش', thumbnailColor: '#7c2d12', isVip: false },
      { number: 139, titleFa: 'پالایش اکسیر هشت ستاره خورشیدی', duration: '۲۴:۰۲', airDate: '۲۴ روز پیش', thumbnailColor: '#431407', isVip: false }
    ],
    danmakuList: [
      { id: 'd1', text: 'شعله خشم بودا دوباره ظاهر شد!! عجب جلوه‌های ویژه‌ای 🔥', timeSec: 4, color: '#f59e0b', user: 'شیائو فن' },
      { id: 'd2', text: 'کیفیت انیمیشن واقعاً سینمایی و بی‌نقصه', timeSec: 8, color: '#10b981', user: 'تزکیه‌کننده' },
      { id: 'd3', text: 'شیائو یان انتقام خاندان شیائو رو گرفت!', timeSec: 12, color: '#ef4444', user: 'کاربر طلایی' }
    ],
    ostList: [
      { id: 'ost-btth-1', titleFa: 'شعله سوزان سرنوشت', artistFa: 'ژو شِن', type: 'OP', duration: '۰۳:۴۵', scaleMode: 'battle' }
    ]
  },
  {
    id: 'perfect-world',
    slug: 'perfect-world',
    titleFa: 'جهان بی‌نقص',
    titleEn: 'Perfect World',
    studio: 'Sparkly Key Animation / Tencent Video',
    releaseYear: 2021,
    rating: 9.7,
    viewsCount: '۱۵.۴ میلیارد',
    episodesTotal: 200,
    episodesCurrent: 184,
    synopsisFa: 'شی هائو، کودکی که با استخوان عالی‌رتبه باستانی زاده شده بود، قربانی توطئه بیرحمانه خویشاوندان شد. او در روستای سنگی با هدایت درخت معنوی بید دوباره شکوفا شد تا با قدرت کون‌پنگ، آسمان‌های نه‌گانه را به لرزه درآورد.',
    synopsisEn: 'Born with a supreme bone, Shi Hao had his innate gifts carved out. Reborn under the Willow Deity, he rises to shake the Nine Heavens.',
    genres: ['شیان‌شیا', 'اساطیری', 'اکشن حماسی'],
    cultivationSystem: 'ده دهانه غار بهشتی · هنر الهی کون‌پنگ',
    currentRealmFa: 'قلمرو اسقف اعظم و فراتر از مرگ',
    status: 'در حال پخش',
    broadcastDayFa: 'سه‌شنبه',
    broadcastTime: 'هر سه‌شنبه ساعت ۱۰:۰۰ صبح',
    posterUrl: poster('perfect-world'),
    bannerUrl: banner('perfect_world'),
    themeColor: 'from-amber-500/30 via-yellow-900/20 to-black',
    accentGlow: '#eab308',
    taglineFa: 'چه کسی جرات دارد در برابر من ادعای شکست‌ناپذیری کند؟',
    characters: [
      {
        nameFa: 'شی هائو (امپراتور هوانگ)',
        nameEn: 'Shi Hao',
        role: 'پادشاه برهوت / امپراتور آسمان',
        cultivationRealm: 'قلمرو عالی‌رتبه کیهانی',
        spiritWeapon: 'هنر کون‌پنگ و شمشیر رعد سیاه',
        faction: 'روستای سنگی',
        avatarBg: 'bg-yellow-950',
        descriptionFa: 'کودک سرنوشت که یک تنه در برابر سپاه نامیرایان ایستادگی کرد.'
      }
    ],
    episodes: [
      { number: 184, titleFa: 'فروپاشی مرزهای باستانی و جنگ ده فرمانروا', duration: '۲۵:۱۰', airDate: 'دیروز', thumbnailColor: '#854d0e', isVip: true, priceTomans: 9000 },
      { number: 183, titleFa: 'بازگشت شی هائو به قلمروهای هشت‌گانه', duration: '۲۴:۴۵', airDate: '۸ روز پیش', thumbnailColor: '#713f12', isVip: true, priceTomans: 9000 }
    ],
    danmakuList: [
      { id: 'pw1', text: 'مبارزه شی هائو شاهکار قرن انیمیشن چینه!', timeSec: 3, color: '#eab308', user: 'هوانگ تیان دی' }
    ],
    ostList: [
      { id: 'ost-pw-1', titleFa: 'نبرد جاودانگان بر فراز تاریخ', artistFa: 'وانگ لیهوم', type: 'OP', duration: '۰۴:۰۵', scaleMode: 'battle' }
    ]
  },
  {
    id: 'record-of-mortal',
    slug: 'a-record-of-a-mortals-journey-to-immortality',
    titleFa: 'سرگذشت جاودانگی',
    titleEn: "A Record of a Mortal's Journey to Immortality",
    studio: 'Wonder Cat Animation / Bilibili',
    releaseYear: 2020,
    rating: 9.9,
    viewsCount: '۹.۷ میلیارد',
    episodesTotal: 120,
    episodesCurrent: 108,
    synopsisFa: 'هان لی، پسری فقیر و معمولی از روستایی ساده‌دل، هیچ ریشه روحی خارق‌العاده‌ای ندارد. او با کشف یک بطری یشمی سبز باستانی و با صبر، مکر، زیرکی و احتیاط تمام‌عیار، گام به گام صخره‌های مرگبار دنیای شیان‌شیا را فتح می‌کند.',
    synopsisEn: 'Han Li, an ordinary village boy, discovers an enigmatic green flask. With utmost prudence, he carves his path through ruthless sects.',
    genres: ['شیان‌شیا واقع‌گرایانه', 'استراتژی', 'بقا'],
    cultivationSystem: 'تزکیه کلاسیک تائوئیستی (هان محتاط)',
    currentRealmFa: 'روح اولیه (Nascent Soul) اواسط مرحله',
    status: 'در حال پخش',
    broadcastDayFa: 'چهارشنبه',
    broadcastTime: 'هر چهارشنبه ساعت ۱۱:۰۰ صبح',
    posterUrl: poster('record-of-mortal'),
    bannerUrl: banner('mortal_journey'),
    themeColor: 'from-emerald-600/30 via-teal-950/40 to-black',
    accentGlow: '#10b981',
    taglineFa: 'راه ناهموار است، اما با گام‌های استوار می‌توان به مقصد رسید',
    characters: [
      {
        nameFa: 'هان لی (دیو پیر هان)',
        nameEn: 'Han Li',
        role: 'شخصیت اصلی / جاودانه محتاط',
        cultivationRealm: 'Nascent Soul',
        spiritWeapon: 'شمشیرهای ۷۲ گانه بامبوی ابر طلا',
        faction: 'دره پاییز زرد',
        avatarBg: 'bg-emerald-950',
        descriptionFa: 'نماد بی‌نظیر صبوری و احتیاط؛ هرگز بیهوده شمشیر نمی‌کشد.'
      }
    ],
    episodes: [
      { number: 108, titleFa: 'فرار بزرگ از محاصره ارواح پلید در جزیره مه', duration: '۲۶:۰۰', airDate: '۴ روز پیش', thumbnailColor: '#065f46', isVip: true, priceTomans: 9000 },
      { number: 107, titleFa: 'آرایش شمشیرهای هفتاد و دوگانه صاعقه سبز', duration: '۲۵:۱۵', airDate: '۱۱ روز پیش', thumbnailColor: '#047857', isVip: false }
    ],
    danmakuList: [
      { id: 'rm1', text: 'هان لی محتاط‌ترین و خفن‌ترین شخصیت تاریخه!', timeSec: 5, color: '#10b981', user: 'تائوپرست' }
    ],
    ostList: [
      { id: 'ost-rm-1', titleFa: 'سفر در میان مه و بادهای پاییزی', artistFa: 'هوانگ شیائوچی', type: 'BGM', duration: '۰۴:۴۰', scaleMode: 'flute' }
    ]
  },
  {
    id: 'renegade-immortal',
    slug: 'renegade-immortal',
    titleFa: 'مرتد فناناپذیر (شیان نی)',
    titleEn: 'Renegade Immortal',
    studio: 'Shanghai Foch Film / Tencent Video',
    releaseYear: 2023,
    rating: 9.8,
    viewsCount: '۶.۲ میلیارد',
    episodesTotal: 78,
    episodesCurrent: 64,
    synopsisFa: 'وانگ لین، پسری ساده با بدست آوردن مهره آسمانی سرکش شانس تزکیه پیدا می‌کند. اما زمانی که تمامی قبیله‌اش بیرحمانه به قتل می‌رسند، او تائوی مهربانی را کنار می‌گذارد و با در پیش گرفتن تائوی ویرانگر کشتار، نام وانگ لین لرزه بر تن کهکشان می‌اندازد.',
    synopsisEn: 'Wang Lin, an ordinary boy who found a Heaven Defying Bead, turns away from mercy after the slaughter of his clan to walk the Dao of Vengeance.',
    genres: ['شیان‌شیا تاریک', 'انتقام', 'اکشن بی‌رحمانه'],
    cultivationSystem: 'تائوی کشتار · مهره ضد آسمان',
    currentRealmFa: 'روح اولیه (Nascent Soul) مرحله پایانی',
    status: 'در حال پخش',
    broadcastDayFa: 'شنبه',
    broadcastTime: 'هر شنبه ساعت ۱۰:۳۰ صبح',
    posterUrl: poster('renegade-immortal'),
    bannerUrl: banner('renegade_immortal'),
    themeColor: 'from-purple-900/40 via-red-950/50 to-black',
    accentGlow: '#a855f7',
    taglineFa: 'اگر آسمان بر من فشار آورد، آسمان را می‌شکافم؛ اگر زمین سد راهم شود، زمین را در هم می‌کوبم',
    characters: [
      {
        nameFa: 'وانگ لین',
        nameEn: 'Wang Lin',
        role: 'تزکیه‌کننده تائوی کشتار',
        cultivationRealm: 'Nascent Soul تیره',
        spiritWeapon: 'مهره آسمانی و شمشیر خونی سرکش',
        faction: 'سیاره سوزاکو',
        avatarBg: 'bg-purple-950',
        descriptionFa: 'پیکارجویی تسلیم‌ناپذیر که سر تا پای بدنش از آتش انتقام شعله‌ور است.'
      }
    ],
    episodes: [
      { number: 64, titleFa: 'قتل‌عام فرقه تنگ جیا و بارش باران خون', duration: '۲۲:۵۰', airDate: 'دیروز', thumbnailColor: '#581c87', isVip: true, priceTomans: 9000 },
      { number: 63, titleFa: 'بیدار شدن قلمرو زندگی و مرگ در چشمان وانگ لین', duration: '۲۳:۱۵', airDate: '۸ روز پیش', thumbnailColor: '#6b21a8', isVip: true, priceTomans: 9000 }
    ],
    danmakuList: [
      { id: 'ri1', text: 'وانگ لین بدون هیچ تردیدی انتقامشو میگیره!', timeSec: 4, color: '#c084fc', user: 'تائو کشتار' }
    ],
    ostList: [
      { id: 'ost-ri-1', titleFa: 'سوگند خون و تائوی کشتار', artistFa: 'چن چو شنگ', type: 'OP', duration: '۰۴:۱۸', scaleMode: 'battle' }
    ]
  },
  {
    id: 'swallowed-star',
    slug: 'swallowed-star',
    titleFa: 'بلعیده شده در کهکشان',
    titleEn: 'Swallowed Star',
    studio: 'Sparkly Key Animation / Tencent Video',
    releaseYear: 2020,
    rating: 9.6,
    viewsCount: '۱۱.۵ میلیارد',
    episodesTotal: 170,
    episodesCurrent: 148,
    synopsisFa: 'پس از شیوع یک ویروس ناشناخته و جهش جانوران زمین، لو فنگ به عنوان مبارز ژنتیکی و استاد قدرت روحی بیدار می‌شود و مرزهای زمین را در هم می‌شکند تا با تمدن‌های کیهانی و جانوران ستاره‌خوار نبرد کند.',
    synopsisEn: 'After a viral catastrophe mutates Earth, Luo Feng awakens as a spirit reader and ventures into cosmic battlegrounds.',
    genres: ['علمی‌تخیلی', 'سایبرپانک رزمی', 'تزکیه کیهانی'],
    cultivationSystem: 'مبارز سیاره‌ای · ارباب کهکشان',
    currentRealmFa: 'قلمرو ستاره‌ای جهان موازی',
    status: 'در حال پخش',
    broadcastDayFa: 'پنجشنبه',
    broadcastTime: 'هر پنجشنبه ساعت ۱۰:۰۰ صبح',
    posterUrl: poster('swallowed-star'),
    bannerUrl: banner('swallowed_star'),
    themeColor: 'from-blue-600/30 via-cyan-950/40 to-black',
    accentGlow: '#06b6d4',
    taglineFa: 'دریای بیکران ستارگان، میدان تاخت‌وتاز اراده من است',
    characters: [
      {
        nameFa: 'لو فنگ',
        nameEn: 'Luo Feng',
        role: 'استاد روحی / محافظ کهکشان',
        cultivationRealm: 'قلمرو ارباب جهان',
        spiritWeapon: 'سلاح پرنده یوان‌ژو',
        faction: 'دوجوی دوجو',
        avatarBg: 'bg-cyan-950',
        descriptionFa: 'پیکارجویی با هوش روحی فراطبیعی و کالبد هیولای زرین طلایی.'
      }
    ],
    episodes: [
      { number: 148, titleFa: 'جنگ در آوردگاه کیهانی و نابودی غول نقره‌ای', duration: '۲۳:۲۰', airDate: '۳ روز پیش', thumbnailColor: '#0e7490', isVip: true, priceTomans: 9000 },
      { number: 147, titleFa: 'انفجار قدرت بلعنده جانور شاخ طلایی', duration: '۲۲:۴۰', airDate: '۱۰ روز پیش', thumbnailColor: '#155e75', isVip: false }
    ],
    danmakuList: [
      { id: 'ss1', text: 'گرافیک نبرد سفینه‌های فضایی دیوانه‌کننده‌ست!', timeSec: 3, color: '#38bdf8', user: 'خلبان کهکشان' }
    ],
    ostList: [
      { id: 'ost-ss-1', titleFa: 'پرواز به سوی کهکشان‌های بی‌انتها', artistFa: 'چن شیانگ', type: 'OP', duration: '۰۳:۳۰', scaleMode: 'battle' }
    ]
  },
  {
    id: 'soul-land-2',
    slug: 'soul-land-2-the-unrivaled-tang-sect',
    titleFa: 'سرزمین ارواح ۲: فرقه بی‌همتای تانگ',
    titleEn: 'Soul Land 2: The Unrivaled Tang Sect',
    studio: 'Sparkly Key Animation / Tencent Video',
    releaseYear: 2023,
    rating: 9.5,
    viewsCount: '۸.۱ میلیارد',
    episodesTotal: 104,
    episodesCurrent: 72,
    synopsisFa: 'ده هزار سال پس از صعود تانگ سان، هو یوآن‌هائو با روح چشم معنوی و جذب کرم ابریشم یک میلیون ساله، حماسه جدیدی را در آکادمی شرک آغاز می‌کند.',
    synopsisEn: 'Ten millennia after Tang San ascended, Huo Yuhao absorbs a million-year-old Ice Silkworm, reigniting the flame of Shrek Academy.',
    genres: ['فانتزی', 'ارواح رزمی', 'آکادمی'],
    cultivationSystem: 'حلقه‌های روحی · چشم روحی و یخ مطلق',
    currentRealmFa: 'استاد روح ۷ حلقه (Soul Sage)',
    status: 'در حال پخش',
    broadcastDayFa: 'شنبه',
    broadcastTime: 'هر شنبه ساعت ۰۹:۰۰ صبح',
    posterUrl: poster('soul-land-2'),
    bannerUrl: banner('soul_land_2'),
    themeColor: 'from-sky-700/30 via-indigo-950/40 to-black',
    accentGlow: '#38bdf8',
    taglineFa: 'روح ضعیف وجود ندارد، تنها استاد روحی ناامید وجود دارد',
    characters: [
      {
        nameFa: 'هو یوآن‌هائو',
        nameEn: 'Huo Yuhao',
        role: 'شاگرد برتر شرک / وارث تانگ',
        cultivationRealm: 'روح رتبه ۸۰',
        spiritWeapon: 'چشم الهی آسمان',
        faction: 'آکادمی شرک',
        avatarBg: 'bg-sky-950',
        descriptionFa: 'پسر جوان با استعداد بینایی ماورایی و سه روح رزمی شگفت‌انگیز.'
      }
    ],
    episodes: [
      { number: 72, titleFa: 'فینال تورنمنت بزرگ آکادمی‌های ارواح قاره', duration: '۲۴:۰۰', airDate: '۲ روز پیش', thumbnailColor: '#0369a1', isVip: true, priceTomans: 9000 }
    ],
    danmakuList: [
      { id: 'sl1', text: 'سرزمین ارواح ۲ واقعاً داستان جذابی داره', timeSec: 6, color: '#38bdf8', user: 'هیولای شرک' }
    ],
    ostList: [
      { id: 'ost-sl-1', titleFa: 'شکوه آکادمی هیولاهای شرک', artistFa: 'چن له‌یی', type: 'OP', duration: '۰۳:۵۵', scaleMode: 'battle' }
    ]
  },
  {
    id: 'lord-of-mysteries',
    slug: 'lord-of-the-mysteries',
    titleFa: 'ارباب اسرار',
    titleEn: 'Lord of the Mysteries',
    studio: 'Bilibili / Tencent Penguin',
    releaseYear: 2025,
    rating: 9.9,
    viewsCount: '۵.۸ میلیارد',
    episodesTotal: 24,
    episodesCurrent: 16,
    synopsisFa: 'ژو مینگ‌روی در جهانی موازی با فضایی استیم‌پانک و توطئه‌های لاوکرافتی بیدار می‌شود. او با تأسیس کانون اسرارآمیز تاروت بر فراز مه خاکستری، به نبرد علیه فساد کیهانی می‌رود.',
    synopsisEn: 'Zhou Mingrui transmigrates as Klein Moretti in a Victorian steampunk world steeped in Eldritch horrors, convening the Tarot Club atop the gray fog.',
    genres: ['رازآلود', 'استیم‌پانک', 'وحشت لاوکرافتی'],
    cultivationSystem: '۲۲ مسیر فراتر · کانون تاروت',
    currentRealmFa: 'توالی ۵: ارباب عروسک‌های ماریونت',
    status: 'در حال پخش',
    broadcastDayFa: 'جمعه',
    broadcastTime: 'هر جمعه ساعت ۱۲:۰۰ ظهر',
    posterUrl: poster('lord-of-mysteries'),
    bannerUrl: banner('lord_of_mysteries'),
    themeColor: 'from-amber-900/30 via-slate-900/50 to-black',
    accentGlow: '#d97706',
    taglineFa: 'ستایش باد احمق! حکمران اسرارآمیز بر فراز مه خاکستری',
    characters: [
      {
        nameFa: 'کلاین مورتی (احمق)',
        nameEn: 'Klein Moretti',
        role: 'ارباب بر فراز مه خاکستری',
        cultivationRealm: 'توالی ۵ مسیر Seer',
        spiritWeapon: 'سکه‌های طلسم شانس',
        faction: 'کانون تاروت',
        avatarBg: 'bg-zinc-950',
        descriptionFa: 'مردی با کلاه سیلندر و عصای باوقار که از عقل و پیشگویی برای حل معماها بهره می‌گیرد.'
      }
    ],
    episodes: [
      { number: 16, titleFa: 'جلسه کانون تاروت بر فراز قصر مه خاکستری', duration: '۲۵:۳۰', airDate: '۵ روز پیش', thumbnailColor: '#78350f', isVip: true, priceTomans: 9000 }
    ],
    danmakuList: [
      { id: 'lm1', text: 'ستایش باد احمق! زنده باد کانون تاروت 🕯️', timeSec: 4, color: '#fbbf24', user: 'تاروت‌خوان' }
    ],
    ostList: [
      { id: 'ost-lm-1', titleFa: 'زمزمه در مه خاکستری بی‌پایان', artistFa: 'ارکستر فیلارمونیک', type: 'OP', duration: '۰۴:۲۵', scaleMode: 'celestial' }
    ]
  },
  {
    id: 'shrouding-heavens',
    slug: 'shrouding-the-heavens',
    titleFa: 'پوشاننده آسمان‌ها',
    titleEn: 'Shrouding the Heavens',
    studio: 'Sparkly Key Animation / Tencent Video',
    releaseYear: 2023,
    rating: 9.4,
    viewsCount: '۴.۹ میلیارد',
    episodesTotal: 104,
    episodesCurrent: 76,
    synopsisFa: '۹ اژدهای غول‌پیکر باستانی در حال کشیدن یک تابوت برنزی در کیهان هستند. یِه فان و دوستانش به این تابوت کشیده شده و به یک کهکشان افسانه‌ای و باستانی منتقل می‌شوند.',
    synopsisEn: 'Nine ancient dragons haul a bronze coffin through deep space, pulling Ye Fan into an ancient cultivation realm.',
    genres: ['شیان‌شیا باستانی', 'کیهانی', 'اساطیری'],
    cultivationSystem: 'کالبد مقدس باستانی · چرخ زندگی',
    currentRealmFa: 'قلمرو کاخ چهار قطبی',
    status: 'در حال پخش',
    broadcastDayFa: 'دوشنبه',
    broadcastTime: 'هر دوشنبه ساعت ۱۰:۳۰ صبح',
    posterUrl: poster('shrouding-heavens'),
    bannerUrl: banner('shrouding_heavens'),
    themeColor: 'from-amber-700/30 via-stone-900/50 to-black',
    accentGlow: '#d97706',
    taglineFa: 'گام برداشتن در مسیر آسمان، سرودخوان در نبرد',
    characters: [
      {
        nameFa: 'یِه فان',
        nameEn: 'Ye Fan',
        role: 'مالک کالبد مقدس باستانی',
        cultivationRealm: 'کاخ قطب‌های چهارگانه',
        spiritWeapon: 'دیگ برنزی مادری طبیعت',
        faction: 'سرزمین مقدس جیائو دی',
        avatarBg: 'bg-stone-950',
        descriptionFa: 'پیکارجویی که با قدرت بازوانش مسیر آسمان‌ها را گشود.'
      }
    ],
    episodes: [
      { number: 76, titleFa: 'فوران انرژی در سرزمین ممنوعه باستانی', duration: '۲۳:۴۵', airDate: 'دیروز', thumbnailColor: '#78350f', isVip: true, priceTomans: 9000 }
    ],
    danmakuList: [
      { id: 'sh1', text: 'ورود نه اژدها به کوهستان تای تماشایی بود!', timeSec: 5, color: '#f59e0b', user: 'اژدهاسوار' }
    ],
    ostList: [
      { id: 'ost-sh-1', titleFa: 'آواز تابوت باستانی در میان ستارگان', artistFa: 'چن چو', type: 'OP', duration: '۰۴:۱۰', scaleMode: 'battle' }
    ]
  },
  {
    id: 'tales-of-demons',
    slug: 'tales-of-demons-and-gods',
    titleFa: 'افسانه شیاطین و خدایان',
    titleEn: 'Tales of Demons and Gods',
    studio: 'Ruo Hong Culture',
    releaseYear: 2017,
    rating: 9.3,
    viewsCount: '۷.۴ میلیارد',
    episodesTotal: 350,
    episodesCurrent: 312,
    synopsisFa: 'نی لی، قوی‌ترین معنویت‌گرای اهریمنی در زندگی گذشته‌اش پس از کشته شدن در برابر امپراتور دانای کل، با کتاب روح اسرارآمیز به دوران ۱۳ سالگی خود بازمی‌گردد تا شهر افتخار را نجات دهد.',
    synopsisEn: 'Nie Li, the strongest Demon Spiritualist, is reborn into his 13-year-old self with the Temporal Demon Spirit Book to protect Glory City.',
    genres: ['تناسخ', 'شیاطین روحی', 'اکشن'],
    cultivationSystem: 'نیروی روح · ادغام با ارواح اهریمنی',
    currentRealmFa: 'قلمرو سرنوشت آسمانی',
    status: 'در حال پخش',
    broadcastDayFa: 'چهارشنبه',
    broadcastTime: 'هر چهارشنبه ساعت ۰۸:۰۰ صبح',
    posterUrl: poster('tales-of-demons'),
    themeColor: 'from-orange-700/30 via-red-950/40 to-black',
    accentGlow: '#f97316',
    taglineFa: 'با آگاهی از آینده، سرنوشت شهر افتخار را بازنویسی خواهم کرد',
    characters: [
      {
        nameFa: 'نی لی',
        nameEn: 'Nie Li',
        role: 'استاد بازگشته از آینده',
        cultivationRealm: 'سرنوشت آسمانی',
        spiritWeapon: 'کتاب روح اهریمنی زمان',
        faction: 'انجمن علامت آسمانی',
        avatarBg: 'bg-orange-950',
        descriptionFa: 'نوجوانی با دانش قرن‌ها تزکیه که از سرنوشت تمام خاندان‌ها آگاه است.'
      }
    ],
    episodes: [
      { number: 312, titleFa: 'تسلط بر روح اژدهای خونین باستان', duration: '۱۰:۳۰', airDate: '۲ روز پیش', thumbnailColor: '#c2410c', isVip: true, priceTomans: 9000 },
      { number: 311, titleFa: 'شکست بزرگان خاندان قدیسین در میدان شهر', duration: '۱۰:۱۵', airDate: '۹ روز پیش', thumbnailColor: '#9a3412', isVip: false }
    ],
    danmakuList: [
      { id: 'td1', text: 'نی لی هیچ فرصتی به دشمنانش نمیده!', timeSec: 4, color: '#f97316', user: 'روح‌پژوه' }
    ],
    ostList: [
      { id: 'ost-td-1', titleFa: 'سرود حماسه شهر افتخار', artistFa: 'لی جون', type: 'OP', duration: '۰۳:۲۰', scaleMode: 'battle' }
    ]
  },
  {
    id: 'martial-universe',
    slug: 'martial-universe',
    titleFa: 'دنیای هنرهای رزمی',
    titleEn: 'Martial Universe',
    studio: 'Shanghai Foch Film / Tencent Video',
    releaseYear: 2019,
    rating: 9.6,
    viewsCount: '۵.۲ میلیارد',
    episodesTotal: 60,
    episodesCurrent: 48,
    synopsisFa: 'لین دانگ، جوانی از شاخه فرعی یک خاندان طرد شده، یک طلسم سنگی اسرارآمیز درون یک غار پیدا می‌کند. با کمک این طلسم، او فنون رزمی را پالایش کرده و گام در نبردی سرنوشت‌ساز علیه شیاطین جهان ییلین می‌گذارد.',
    synopsisEn: 'Lin Dong stumbles upon a mysterious stone talisman that accelerates his martial cultivation to seek vengeance against clan oppressors.',
    genres: ['شیان‌شیا', 'اکشن رزمی', 'هنرهای باستانی'],
    cultivationSystem: 'نیروی یوان (Yuan Power) · نمادهای باستانی',
    currentRealmFa: 'قلمرو نیروانا (Nirvana)',
    status: 'در حال پخش',
    broadcastDayFa: 'یکشنبه',
    broadcastTime: 'هر یکشنبه ساعت ۱۱:۰۰ صبح',
    posterUrl: poster('martial-universe'),
    themeColor: 'from-amber-800/30 via-stone-900/40 to-black',
    accentGlow: '#d97706',
    taglineFa: 'سلاح از سنگ و دل از پولاد؛ عدالت با مشت‌های من اجرا می‌شود',
    characters: [
      {
        nameFa: 'لین دانگ',
        nameEn: 'Lin Dong',
        role: 'استاد نمادهای باستانی',
        cultivationRealm: 'قلمرو نیروانا',
        spiritWeapon: 'طلسم سنگی اسرارآمیز',
        faction: 'خاندان لین',
        avatarBg: 'bg-amber-950',
        descriptionFa: 'پسر جوان خستگی‌ناپذیر که برای محافظت از خانواده‌اش به نیروانا رسید.'
      }
    ],
    episodes: [
      { number: 48, titleFa: 'نبرد نهایی در میدان کهن و کسب نماد بلعنده', duration: '۲۴:۱۰', airDate: 'دیروز', thumbnailColor: '#78350f', isVip: true, priceTomans: 9000 }
    ],
    danmakuList: [
      { id: 'mu1', text: 'لین دانگ واقعاً کاراکتر با شخصیتیه!', timeSec: 6, color: '#f59e0b', user: 'یوان پاور' }
    ],
    ostList: [
      { id: 'ost-mu-1', titleFa: 'نوای شمشیر در صحرای غربی', artistFa: 'چن وی', type: 'OP', duration: '۰۳:۴۰', scaleMode: 'battle' }
    ]
  },
  {
    id: 'kings-avatar',
    slug: 'the-kings-avatar',
    titleFa: 'آواتار پادشاه',
    titleEn: "The King's Avatar",
    studio: 'B.CMAY PICTURES / Tencent Video',
    releaseYear: 2017,
    rating: 9.7,
    viewsCount: '۸.۹ میلیارد',
    episodesTotal: 36,
    episodesCurrent: 24,
    synopsisFa: 'یه شیو، اسطوره بی‌رقیب ورزش الکترونیک و بازی آنلاین Glory، به اجبار از تیمش اخراج و مجبور به بازنشستگی می‌شود. او در یک گیم‌نت مشغول به کار شده و با ساخت یک شخصیت جدید به نام «لرد لردها»، بازگشت پرشکوه خود به عرصه جهانی را کلید می‌زند.',
    synopsisEn: 'Ye Xiu, a legendary top-tier pro esports player in the online game Glory, is forced out of his team. Working at an internet cafe, he launches his grand return.',
    genres: ['گیمینگ', 'ورزش الکترونیک', 'استراتژی'],
    cultivationSystem: 'بازی گلوری · کلاس Unspecialized',
    currentRealmFa: 'سطح ۷۰ با چتر هزار شانس',
    status: 'پایان یافته',
    broadcastDayFa: 'جمعه',
    broadcastTime: 'آرشیو کامل',
    posterUrl: poster('kings-avatar'),
    themeColor: 'from-rose-800/30 via-slate-900/40 to-black',
    accentGlow: '#e11d48',
    taglineFa: 'اگر عاشق این بازی هستی، آن را تنها به چشم یک شغل نبین',
    characters: [
      {
        nameFa: 'یه شیو',
        nameEn: 'Ye Xiu',
        role: 'خدای گلوری',
        cultivationRealm: 'کلاس بدون تخصص',
        spiritWeapon: 'چتر هزار شانس (Myriad Manifestations Umbrella)',
        faction: 'تیم هپی (Happy)',
        avatarBg: 'bg-rose-950',
        descriptionFa: 'نابغه مطلق گیمینگ با مهارت دست APM خیره‌کننده.'
      }
    ],
    episodes: [
      { number: 24, titleFa: 'قهرمانی در لیگ مسابقات و بازگشت پادشاه', duration: '۲۵:۰۰', airDate: 'آرشیو', thumbnailColor: '#9f1239', isVip: false }
    ],
    danmakuList: [
      { id: 'ka1', text: 'چتر هزار شانس خفن‌ترین سلاح تاریخ گیمینگه!', timeSec: 5, color: '#f43f5e', user: 'گلوری فن' }
    ],
    ostList: [
      { id: 'ost-ka-1', titleFa: 'سرود پیروزی در گلوری', artistFa: 'وانگ شو', type: 'OP', duration: '۰۳:۵۰', scaleMode: 'battle' }
    ]
  },
  {
    id: 'grandmaster-demonic',
    slug: 'grandmaster-of-demonic-cultivation',
    titleFa: 'استاد بزرگ تزکیه اهریمنی',
    titleEn: 'Grandmaster of Demonic Cultivation',
    studio: 'B.CMAY PICTURES / Tencent Video',
    releaseYear: 2018,
    rating: 9.8,
    viewsCount: '۷.۱ میلیارد',
    episodesTotal: 35,
    episodesCurrent: 35,
    synopsisFa: 'وی ووشیان، مبتکر مسیر شیطانی و کنترل ارواح، سال‌ها پس از مرگش در کالبد جوانی از جان گذشته بازمی‌گردد. او به همراه دوست دیرینش لان وانگ‌جی، پرده از توطئه‌های مرگبار فرقه‌های حاکم برمی‌دارد.',
    synopsisEn: 'Wei Wuxian, founder of demonic cultivation, reincarnates years after his death and reunites with Lan Wangji to unravel sect conspiracies.',
    genres: ['شیان‌شیا تاریک', 'معمایی', 'ماوراءالطبیعه'],
    cultivationSystem: 'فلوت ارواح چن‌چینگ · تائوی تاریک',
    currentRealmFa: 'فرمانروای تپه گورستان',
    status: 'پایان یافته',
    broadcastDayFa: 'پنجشنبه',
    broadcastTime: 'آرشیو کامل ۳ فصل',
    posterUrl: poster('grandmaster-demonic'),
    themeColor: 'from-neutral-900 via-red-950/40 to-black',
    accentGlow: '#dc2626',
    taglineFa: 'بگذار دیگران هر چه می‌خواهند بگویند؛ من راه دل خود را می‌پیمایم',
    characters: [
      {
        nameFa: 'وی ووشیان',
        nameEn: 'Wei Wuxian',
        role: 'استاد کنترل ارواح',
        cultivationRealm: 'تائوی تاریکی',
        spiritWeapon: 'فلوت سیاه چن‌چینگ',
        faction: 'فرقه یان‌منگ جیانگ',
        avatarBg: 'bg-red-950',
        descriptionFa: 'نابغه آزاده‌ای که برای نجات بی‌گناهان مسیر تاریک را پیمود.'
      }
    ],
    episodes: [
      { number: 35, titleFa: 'پایان حماسه معبد گوان‌یینگ و آرامش جاودان', duration: '۲۶:۱۰', airDate: 'آرشیو', thumbnailColor: '#7f1d1d', isVip: false }
    ],
    danmakuList: [
      { id: 'md1', text: 'نوای فلوت وی ووشیان مو به تن آدم سیخ میکنه', timeSec: 6, color: '#ef4444', user: 'ییلینگ لائوزو' }
    ],
    ostList: [
      { id: 'ost-md-1', titleFa: 'نوای آرامش‌بخش وانگ‌شیان', artistFa: 'ژو شن و لین های', type: 'ED', duration: '۰۴:۳۰', scaleMode: 'flute' }
    ]
  },
  {
    id: 'heaven-officials-blessing',
    slug: 'heavens-officials-blessing',
    titleFa: 'موهبت خدایان آسمانی',
    titleEn: "Heaven Official's Blessing",
    studio: 'Haoliners Animation / Bilibili',
    releaseYear: 2020,
    rating: 9.8,
    viewsCount: '۶.۸ میلیارد',
    episodesTotal: 24,
    episodesCurrent: 24,
    synopsisFa: 'شِی لیان، ولیعهد محبوب کشور شیان‌له پس از هشتصد سال و سه بار تبعید و صعود دوباره، به عنوان خدای خنده‌دار جمع‌آوری زباله به بهشت برمی‌گردد. در اولین مأموریتش با پادشاه مرموز جهان ارواح، هوا چنگ روبرو می‌شود.',
    synopsisEn: 'Xie Lian ascends for the third time as a laughingstock god, encountering the dreaded Ghost King Hua Cheng on his first mission.',
    genres: ['اساطیری', 'عاشقانه', 'ماوراءالطبیعه'],
    cultivationSystem: 'صعود به بهشت · قلمرو خدایان',
    currentRealmFa: 'خدای آسمانی با روبان مقدس',
    status: 'پایان یافته',
    broadcastDayFa: 'سه‌شنبه',
    broadcastTime: 'آرشیو کامل',
    posterUrl: poster('heaven-officials-blessing'),
    themeColor: 'from-amber-600/30 via-rose-950/30 to-black',
    accentGlow: '#f43f5e',
    taglineFa: 'هیچ مرزی وجود ندارد؛ برای تو تا اوج آسمان‌ها و ژرفای خاک خواهم رفت',
    characters: [
      {
        nameFa: 'شِی لیان',
        nameEn: 'Xie Lian',
        role: 'ولیعهد شیان‌له',
        cultivationRealm: 'خدای آسمانی',
        spiritWeapon: 'روبان ابریشمی روآیه',
        faction: 'دربار بهشت',
        avatarBg: 'bg-stone-900',
        descriptionFa: 'خدایی با اراده خالص که رنج قرن‌ها را با تبسم به دوش کشید.'
      }
    ],
    episodes: [
      { number: 24, titleFa: 'فاش شدن راز شهر ارواح و درخشش پروانه‌های نقره‌ای', duration: '۲۴:۴۰', airDate: 'آرشیو', thumbnailColor: '#881337', isVip: false }
    ],
    danmakuList: [
      { id: 'tg1', text: 'پروانه‌های نقره‌ای هوا چنگ بی‌نهایت زیبان', timeSec: 4, color: '#fbbf24', user: 'پروانه سرخ' }
    ],
    ostList: [
      { id: 'ost-tg-1', titleFa: 'پرواز هزاران فانوس در شب بهشت', artistFa: 'ژو شن', type: 'OP', duration: '۰۴:۱۵', scaleMode: 'celestial' }
    ]
  },
  {
    id: 'stellar-transformations',
    slug: 'stellar-transformations',
    titleFa: 'تحول ستارگان',
    titleEn: 'Stellar Transformations',
    studio: 'Sparkly Key Animation / Tencent Video',
    releaseYear: 2018,
    rating: 9.5,
    viewsCount: '۴.۶ میلیارد',
    episodesTotal: 65,
    episodesCurrent: 52,
    synopsisFa: 'چین یو به دلیل ناتوانی در تمرین انرژی درونی، مورد بی‌توجهی پدرش قرار گرفت. اما با پیدا کردن سنگ اشکاب سرخ شهاب‌سنگ و اراده‌ای خارق‌العاده، جسم خود را به اوج رسانده و مسیر تزکیه ستاره‌ای را آغاز می‌کند.',
    synopsisEn: 'Qin Yu, unable to practice internal arts, finds the Meteoric Tear and undertakes an intense path of external training to transcend into the stars.',
    genres: ['شیان‌شیا', 'اکشن', 'ماجراجویی فضایی'],
    cultivationSystem: 'اشکاب شهاب‌سنگ · تکنیک تحول ستارگان',
    currentRealmFa: 'قلمرو ستاره‌ای لایف',
    status: 'در حال پخش',
    broadcastDayFa: 'یکشنبه',
    broadcastTime: 'هر یکشنبه ساعت ۰۹:۰۰ صبح',
    posterUrl: poster('stellar-transformations'),
    themeColor: 'from-blue-700/30 via-indigo-950/40 to-black',
    accentGlow: '#2563eb',
    taglineFa: 'حتی بدون استعداد درونی، با نیروی بازوان و ستارگان آسمان را خواهم گشود',
    characters: [
      {
        nameFa: 'چین یو',
        nameEn: 'Qin Yu',
        role: 'استاد تحول ستارگان',
        cultivationRealm: 'قلمرو کهکشان',
        spiritWeapon: 'اشک شهاب‌سنگ باستانی',
        faction: 'خاندان چین',
        avatarBg: 'bg-blue-950',
        descriptionFa: 'جوانی که با پشتکار مطلق، راهی فراتر از مقدرات فانی برای خود گشود.'
      }
    ],
    episodes: [
      { number: 52, titleFa: 'صعود به قلمرو پریان و شکست هیولای اقیانوس', duration: '۲۲:۰۰', airDate: '۴ روز پیش', thumbnailColor: '#1e3a8a', isVip: true, priceTomans: 9000 }
    ],
    danmakuList: [
      { id: 'st1', text: 'گرافیک اسپارکلی کی همیشه در بالاترین سطح است', timeSec: 5, color: '#38bdf8', user: 'ستاره‌بین' }
    ],
    ostList: [
      { id: 'ost-st-1', titleFa: 'درخشش در بیکران کهکشان‌ها', artistFa: 'هوانگ چائو', type: 'OP', duration: '۰۳:۴۵', scaleMode: 'battle' }
    ]
  },
  {
    id: 'dragon-prince-yuan',
    slug: 'dragon-prince-yuan',
    titleFa: 'شاهزاده اژدها یوآن',
    titleEn: 'Dragon Prince Yuan',
    studio: 'Sparkly Key Animation / Tencent Video',
    releaseYear: 2024,
    rating: 9.6,
    viewsCount: '۳.۴ میلیارد',
    episodesTotal: 26,
    episodesCurrent: 20,
    synopsisFa: 'ژو یوآن، شاهزاده بزرگ خاندان ژو، در بدو تولد برکت اژدهای مقدس از او دزدیده و کانال‌های مریدینش مسدود شد. او با رهنمودهای دختر رازآلود یائو یائو، با قلم معنوی قلمروهای هستی را بازمی‌گشاید.',
    synopsisEn: 'Zhou Yuan, prince with his Sacred Dragon blessing stolen at birth, unblocks his channels with master Yao Yao and the Heaven Yuan Brush.',
    genres: ['شیان‌شیا', 'قلم معنوی', 'تزکیه اژدها'],
    cultivationSystem: 'چی یوان باستانی · خطاطی طلسم‌ها',
    currentRealmFa: 'قلمرو بازگشایی مریدین هشتم',
    status: 'در حال پخش',
    broadcastDayFa: 'پنجشنبه',
    broadcastTime: 'هر پنجشنبه ساعت ۱۱:۰۰ صبح',
    posterUrl: poster('dragon-prince-yuan'),
    themeColor: 'from-amber-600/30 via-yellow-950/40 to-black',
    accentGlow: '#f59e0b',
    taglineFa: 'اژدهای مقدس دوباره بر فراز امپراتوری بال خواهد گشود',
    characters: [
      {
        nameFa: 'ژو یوآن',
        nameEn: 'Zhou Yuan',
        role: 'شاهزاده خاندان ژو',
        cultivationRealm: 'مریدین هشتم',
        spiritWeapon: 'قلم بهشتی یوان',
        faction: 'امپراتوری ژو',
        avatarBg: 'bg-amber-950',
        descriptionFa: 'پسر جسوری که با قلم مو و مرکب طلسم‌ها، مسیر اژدها را از نو پیمود.'
      }
    ],
    episodes: [
      { number: 20, titleFa: 'پیروزی در نبرد پایتخت و بازپس‌گیری برکت اژدها', duration: '۲۴:۱۰', airDate: '۳ روز پیش', thumbnailColor: '#78350f', isVip: true, priceTomans: 9000 }
    ],
    danmakuList: [
      { id: 'dp1', text: 'قلم یوآن واقعاً قابلیت‌های نبرد فوق‌العاده‌ای داره!', timeSec: 4, color: '#fbbf24', user: 'قلم‌تراش' }
    ],
    ostList: [
      { id: 'ost-dp-1', titleFa: 'غرش اژدهای مقدس در کوهسار', artistFa: 'لین یو', type: 'OP', duration: '۰۳:۵۰', scaleMode: 'battle' }
    ]
  },
  {
    id: 'jade-dynasty',
    slug: 'jade-dynasty',
    titleFa: 'سلسله یشمی (ژو شیان)',
    titleEn: 'Jade Dynasty',
    studio: 'Cloud Art / Tencent Video',
    releaseYear: 2022,
    rating: 9.5,
    viewsCount: '۴.۱ میلیارد',
    episodesTotal: 52,
    episodesCurrent: 44,
    synopsisFa: 'ژانگ شیائوفان پس از قتل‌عام روستایش، به فرقه معتبر شمشیر کوه کینگ‌یون ملحق می‌شود. او با بدست آوردن یک چوب‌دست مرموز آهنی که عصاره خون شوم را مهار می‌کند، در کشاکش بین تائوی نیک و بد قرار می‌گیرد.',
    synopsisEn: 'Zhang Xiaofan, survivor of a village massacre, joins Qingyun Sect and wields a sinister soul-eating rod in the conflict between righteous and dark dao.',
    genres: ['شیان‌شیا کلاسیک', 'شمشیر آسمانی', 'عاشقانه غم‌انگیز'],
    cultivationSystem: 'هنر تائوی تای‌جی کینگ‌یون · شمشیر اهریمنی',
    currentRealmFa: 'قلمرو هسته طلایی کینگ‌یون',
    status: 'در حال پخش',
    broadcastDayFa: 'سه‌شنبه',
    broadcastTime: 'هر سه‌شنبه ساعت ۰۹:۳۰ صبح',
    posterUrl: poster('jade-dynasty'),
    themeColor: 'from-emerald-700/30 via-slate-900/40 to-black',
    accentGlow: '#059669',
    taglineFa: 'بین راستی و اهریمن، آنچه پایدار می‌ماند وفاداری دل است',
    characters: [
      {
        nameFa: 'ژانگ شیائوفان',
        nameEn: 'Zhang Xiaofan',
        role: 'شاگرد فرقه کینگ‌یون',
        cultivationRealm: 'تای‌جی کینگ‌یون',
        spiritWeapon: 'چوب‌دست روح‌خوار آتشین',
        faction: 'فرقه کینگ‌یون',
        avatarBg: 'bg-emerald-950',
        descriptionFa: 'پسری باوفا و صبور که قربانی آزمون‌های تاریک روزگار شد.'
      }
    ],
    episodes: [
      { number: 44, titleFa: 'فداکاری بی‌یائو زیر شمشیر خشم الهی ژو شیان', duration: '۲۵:۲۰', airDate: 'دیروز', thumbnailColor: '#047857', isVip: true, priceTomans: 9000 }
    ],
    danmakuList: [
      { id: 'jd1', text: 'سکانس فداکاری بی‌یائو یکی از غم‌انگیزترین لحظات تاریخ انیمه‌ست', timeSec: 7, color: '#10b981', user: 'عاشق شیان' }
    ],
    ostList: [
      { id: 'ost-jd-1', titleFa: 'سوگند شمشیر در میان ابرها', artistFa: 'ژانگ بی چن', type: 'ED', duration: '۰۴:۲۰', scaleMode: 'flute' }
    ]
  }
];

export const SCHEDULE_DAYS = [
  { dayFa: 'شنبه', dayEn: 'Saturday', donghuaIds: ['renegade-immortal', 'soul-land-2'] },
  { dayFa: 'یکشنبه', dayEn: 'Sunday', donghuaIds: ['btth', 'martial-universe', 'stellar-transformations'] },
  { dayFa: 'دوشنبه', dayEn: 'Monday', donghuaIds: ['shrouding-heavens'] },
  { dayFa: 'سه‌شنبه', dayEn: 'Tuesday', donghuaIds: ['perfect-world', 'heaven-officials-blessing', 'jade-dynasty'] },
  { dayFa: 'چهارشنبه', dayEn: 'Wednesday', donghuaIds: ['record-of-mortal', 'tales-of-demons'] },
  { dayFa: 'پنجشنبه', dayEn: 'Thursday', donghuaIds: ['swallowed-star', 'dragon-prince-yuan', 'grandmaster-demonic'] },
  { dayFa: 'جمعه', dayEn: 'Friday', donghuaIds: ['lord-of-mysteries', 'kings-avatar'] }
];
