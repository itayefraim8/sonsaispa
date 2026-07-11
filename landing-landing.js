// landing-landing.js — i18n + כפתורי טיפול לווטסאפ + כרטיסייה לווטסאפ

const WHATSAPP_NUMBER = '995593202903';
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

const SUPPORTED_LANGS = new Set(['he', 'en', 'ru', 'ka']);

// ===== עזרי שפה =====
function getLang() {
  const stored = localStorage.getItem('site_lang');
  if (stored && SUPPORTED_LANGS.has(stored.slice(0, 2))) return stored.slice(0, 2);

  // ✅ ברירת מחדל: עברית
  return 'he';
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.has(lang)) lang = 'he';
  localStorage.setItem('site_lang', lang);
  applyLang(lang);
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'he' || lang === 'ar') ? 'rtl' : 'ltr';

  applyTranslations(lang);
  applyTreatmentTexts(lang);
  applyDurationLabels(lang);

  // ✅ אם הסליידר כבר אותחל – רענון (כדי לחשב מידות מחדש אחרי שינוי כיוון)
  if (window.__flagshipSlider?.refresh) window.__flagshipSlider.refresh();

  // ✅ הפיכת חיצי הסליידר בהתאם ל-RTL / LTR
  const prevIcon = document.querySelector('.flagship-slider__nav--prev');
  const nextIcon = document.querySelector('.flagship-slider__nav--next');

  if (prevIcon && nextIcon) {
    const isRTL = document.documentElement.dir === 'rtl';
    prevIcon.textContent = isRTL ? '›' : '‹';
    nextIcon.textContent = isRTL ? '‹' : '›';
  }
}

// ===== מילון טקסטים =====
const LOCAL_STRINGS = {
  he: {
    // hero
'landing.hero.title': 'עיסויים תאילנדיים מקצועיים באווירה אלגנטית, אינטימית ומרגיעה בלב בטומי',
'landing.hero.subtitle': 'הזמנה פשוטה ומהירה דרך הווטסאפ או בטלפון — בחר/י טיפול ותן/י לעצמך זמן אמיתי להירגע.',

    // treatments
    'landing.treatments.title': 'בחר/י טיפול מפנק',
    'landing.treatments.subtitle': 'בחרו מתוך מגוון טיפולים תאילנדיים מקצועיים ותיהנו מחוויית רוגע, איזון והתחדשות בלב בטומי.',
    'landing.treatment.book': 'להזמנת הטיפול',

    // flagship
    'landing.flagship.title': 'טיפולי הדגל שלנו',
    'landing.flagship.subtitle': '6 טיפולים מובילים — בחרו את הטיפול שלכם והזמינו בווטסאפ.',

    // section headings
    'landing.section.face.title': '✨ עיסויי פנים',
    'landing.section.back.title': '💆‍♂️ עיסוי גב – כתפיים – צוואר',
    'landing.section.body.title': '🧘‍♂️ עיסוי גוף מלא',
    'landing.section.body.subtitle': 'הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
    'landing.section.foot.title': '🦶 טיפולי כפות רגליים',

    // booking modal (נשאר לעתיד)
    'landing.booking.title': 'הזמנת טיפול',
    'landing.booking.summary': 'נא לבחור טיפול מהדף, ואז למלא פרטי קשר ותאריך.',
    'landing.booking.name': 'שם מלא',
    'landing.booking.phone': 'טלפון ליצירת קשר (WhatsApp)',
    'landing.booking.date': 'תאריך טיפול',
    'landing.booking.time': 'שעת טיפול',
    'landing.booking.chooseTime': 'בחר/י שעה',
    'landing.booking.duration': 'משך הטיפול',
    'landing.booking.notes': 'העדפות / הערות (אופציונלי)',
    'landing.booking.note': 'התשלום מתבצע בכרטיס אשראי מאובטח דרך Stripe. אישור הזמנה יישלח אליך אוטומטית.',
    'landing.booking.payCta': 'מעבר לתשלום מאובטח',

    // footer
'footer.hours.title': 'שעות פעילות',
'footer.hours.sun': 'יום ראשון: 12:00–00:00',
'footer.hours.mon': 'יום שני: 12:00–00:00',
'footer.hours.tue': 'יום שלישי: 12:00–00:00',
'footer.hours.wed': 'יום רביעי: 12:00–00:00',
'footer.hours.thu': 'יום חמישי: 12:00–00:00',
'footer.hours.fri': 'יום שישי: 12:00–00:00',
'footer.hours.sat': 'יום שבת: 12:00–00:00',

'footer.location.title': 'מיקום וכתובת',
'footer.location.address1': 'Parnavaz Mepe 7',
'footer.location.address2': 'Batumi, Georgia',
'footer.location.navigate': 'ניווט למיקום',
'footer.location.whatsapp': 'WhatsApp להזמנות',

    'footer.bottom.copy': '© SONSAI · כל הזכויות שמורות'
  },

  en: {
'landing.hero.title': 'Professional Thai massages in an elegant, intimate and relaxing atmosphere in the heart of Batumi',
'landing.hero.subtitle': 'Quick and easy booking via WhatsApp or phone — choose your treatment and give yourself real time to relax.',

    'landing.treatments.title': 'Choose your treatment',
    'landing.treatments.subtitle': 'Choose from a variety of professional Thai treatments and enjoy a unique experience of relaxation, balance, and renewal in the heart of Batumi.',
    'landing.treatment.book': 'Book this treatment',

    'landing.flagship.title': 'Our Flagship Treatments',
    'landing.flagship.subtitle': '6 best-sellers — choose your treatment and book via WhatsApp.',

    'landing.section.face.title': '✨ Facial Treatments',
    'landing.section.back.title': '💆‍♂️ Back–Neck–Shoulders',
    'landing.section.body.title': '🧘‍♂️ Full Body Massage',
    'landing.section.body.subtitle': 'This is a full-body treatment and also includes a gentle face massage.',
    'landing.section.foot.title': '🦶 Foot Treatments',

    'landing.booking.title': 'Treatment booking',
    'landing.booking.summary': 'Please select a treatment from the page, then fill in your contact details and date.',
    'landing.booking.name': 'Full name',
    'landing.booking.phone': 'Phone / WhatsApp',
    'landing.booking.date': 'Treatment date',
    'landing.booking.time': 'Treatment time',
    'landing.booking.chooseTime': 'Choose time',
    'landing.booking.duration': 'Treatment duration',
    'landing.booking.notes': 'Preferences / notes (optional)',
    'landing.booking.note': 'Payment is processed via secure Stripe credit card. A confirmation will be sent automatically.',
    'landing.booking.payCta': 'Proceed to secure payment',

    // footer
'footer.hours.title': 'Opening Hours',
'footer.hours.sun': 'Sunday: 12:00–00:00',
'footer.hours.mon': 'Monday: 12:00–00:00',
'footer.hours.tue': 'Tuesday: 12:00–00:00',
'footer.hours.wed': 'Wednesday: 12:00–00:00',
'footer.hours.thu': 'Thursday: 12:00–00:00',
'footer.hours.fri': 'Friday: 12:00–00:00',
'footer.hours.sat': 'Saturday: 12:00–00:00',

'footer.location.title': 'Location & Address',
'footer.location.address1': 'Parnavaz Mepe 7',
'footer.location.address2': 'Batumi, Georgia',
'footer.location.navigate': 'Navigate to location',
'footer.location.whatsapp': 'WhatsApp for bookings',

    'footer.bottom.copy': '© SONSAI · All Rights Reserved'
  },

  ru: {
'landing.hero.title': 'Профессиональный тайский массаж в элегантной, уютной и расслабляющей атмосфере в центре Батуми',
'landing.hero.subtitle': 'Быстрое и удобное бронирование через WhatsApp или по телефону — выберите процедуру и подарите себе настоящее расслабление.',

    'landing.treatments.title': 'Выберите процедуру',
    'landing.treatments.subtitle': 'Выберите одну из профессиональных тайских процедур и насладитесь атмосферой расслабления, гармонии и обновления в самом сердце Батуми.',
    'landing.treatment.book': 'Записаться на процедуру',

    'landing.flagship.title': 'Наши флагманские процедуры',
    'landing.flagship.subtitle': '6 хитов — выберите процедуру и запишитесь через WhatsApp.',

    'landing.section.face.title': '✨ Процедуры для лица',
    'landing.section.back.title': '💆‍♂️ Спина–шея–плечи',
    'landing.section.body.title': '🧘‍♂️ Массаж всего тела',
    'landing.section.body.subtitle': 'Процедура выполняется как массаж всего тела и также включает мягкий массаж лица.',
    'landing.section.foot.title': '🦶 Процедуры для стоп',

    'landing.booking.title': 'Бронирование процедуры',
    'landing.booking.summary': 'Пожалуйста, выберите процедуру на странице и заполните контакты и дату.',
    'landing.booking.name': 'Полное имя',
    'landing.booking.phone': 'Телефон / WhatsApp',
    'landing.booking.date': 'Дата процедуры',
    'landing.booking.time': 'Время процедуры',
    'landing.booking.chooseTime': 'Выберите время',
    'landing.booking.duration': 'Длительность процедуры',
    'landing.booking.notes': 'Пожелания / примечания (необязательно)',
    'landing.booking.note': 'Оплата проводится банковской картой через защищённый сервис Stripe. Подтверждение придёт автоматически.',
    'landing.booking.payCta': 'Перейти к безопасной оплате',

    // footer
'footer.hours.title': 'Часы работы',
'footer.hours.sun': 'Воскресенье: 12:00–00:00',
'footer.hours.mon': 'Понедельник: 12:00–00:00',
'footer.hours.tue': 'Вторник: 12:00–00:00',
'footer.hours.wed': 'Среда: 12:00–00:00',
'footer.hours.thu': 'Четверг: 12:00–00:00',
'footer.hours.fri': 'Пятница: 12:00–00:00',
'footer.hours.sat': 'Суббота: 12:00–00:00',

'footer.location.title': 'Местоположение и адрес',
'footer.location.address1': 'Parnavaz Mepe 7',
'footer.location.address2': 'Batumi, Georgia',
'footer.location.navigate': 'Открыть маршрут',
'footer.location.whatsapp': 'WhatsApp для бронирования',

    'footer.bottom.copy': '© SONSAI · Все права защищены'
  },

  ka: {
'landing.hero.title': 'პროფესიონალური ტაილანდური მასაჟი ელეგანტურ, მყუდრო და დამამშვიდებელ გარემოში ბათუმის გულში',
'landing.hero.subtitle': 'მარტივი და სწრაფი ჯავშანი WhatsApp-ით ან ტელეფონით — აირჩიეთ სასურველი პროცედურა და დაუთმეთ საკუთარ თავს ნამდვილი დასვენება.',

    'landing.treatments.title': 'აირჩიეთ სასურველი პროცედურა',
    'landing.treatments.subtitle': 'აირჩიეთ პროფესიონალური ტაილანდური პროცედურებიდან თქვენთვის სასურველი და ისიამოვნეთ სიმშვიდის, ბალანსისა და განახლების უნიკალური გამოცდილებით ბათუმის გულში.',
    'landing.treatment.book': 'დაჯავშნა',

    'landing.flagship.title': 'ჩვენი მთავარი პროცედურები',
    'landing.flagship.subtitle': '6 ყველაზე პოპულარული — აირჩიეთ და დაჯავშნეთ WhatsApp-ით.',

    'landing.section.face.title': '✨ სახის პროცედურები',
    'landing.section.back.title': '💆‍♂️ ზურგი–კისერი–მხრები',
    'landing.section.body.title': '🧘‍♂️ მთლიანი სხეულის მასაჟი',
    'landing.section.body.subtitle': 'პროცედურა სრულდება როგორც მთლიანი სხეულის მასაჟი და ასევე მოიცავს სახის ნაზ მასაჟს.',
    'landing.section.foot.title': '🦶 ფეხის პროცედურები',

    'landing.booking.title': 'პროცედურის დაჯავშნა',
    'landing.booking.summary': 'გთხოვთ, პირველ რიგში აირჩიოთ პროცედურა და შემდეგ შეავსოთ საკონტაქტო ინფორმაცია და თარიღი.',
    'landing.booking.name': 'სრული სახელი',
    'landing.booking.phone': 'ტელეფონი / WhatsApp',
    'landing.booking.date': 'პროცედურის თარიღი',
    'landing.booking.time': 'პროცედურის დრო',
    'landing.booking.chooseTime': 'აირჩიეთ დრო',
    'landing.booking.duration': 'პროცედურის ხანგრძლივობა',
    'landing.booking.notes': 'სურვილები / შენიშვნები (არასავალდებულო)',
    'landing.booking.note': 'გადახდა ხორციელდება უსაფრთხოდ, Stripe-ის ბარათის გადახდის სისტემით. დადასტურება ავტომატურად გამოგეგზავნებათ.',
    'landing.booking.payCta': 'გადასვლა უსაფრთხო გადახდაზე',

    // footer
'footer.hours.title': 'სამუშაო საათები',
'footer.hours.sun': 'კვირა: 12:00–00:00',
'footer.hours.mon': 'ორშაბათი: 12:00–00:00',
'footer.hours.tue': 'სამშაბათი: 12:00–00:00',
'footer.hours.wed': 'ოთხშაბათი: 12:00–00:00',
'footer.hours.thu': 'ხუთშაბათი: 12:00–00:00',
'footer.hours.fri': 'პარასკევი: 12:00–00:00',
'footer.hours.sat': 'შაბათი: 12:00–00:00',

'footer.location.title': 'მდებარეობა და მისამართი',
'footer.location.address1': 'Parnavaz Mepe 7',
'footer.location.address2': 'Batumi, Georgia',
'footer.location.navigate': 'გეზის გახსნა',
'footer.location.whatsapp': 'WhatsApp დაჯავშნისთვის',

    'footer.bottom.copy': '© SONSAI · ყველა უფლება დაცულია'
  }
};

function t(key, lang) {
  const l = LOCAL_STRINGS[lang] || LOCAL_STRINGS.he;
  return l[key] || LOCAL_STRINGS.he[key] || null;
}

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = t(key, lang);
    if (val) el.textContent = val;
  });

  // ✅ עדכון title בדפדפן
  const titleEl = document.querySelector('title[data-i18n-title]');
  if (titleEl) {
    const key = titleEl.getAttribute('data-i18n-title');
    const val = t(key, lang);
    if (val) document.title = val;
  }
}

// ===== ווטסאפ – טקסטים להודעה =====
const WA_TEMPLATES_TREATMENT = {
  he: 'שלום, אני מעוניין לקבוע טיפול ב-SONSAI:\nטיפול: {TREATMENT}\nמשך: {DURATION}\n\nאשמח שתיצרו איתי קשר לתיאום תאריך ושעה.',
  en: 'Hello, I would like to book a treatment at SONSAI:\nTreatment: {TREATMENT}\nDuration: {DURATION}\n\nPlease contact me to coordinate date and time.',
  ru: 'Здравствуйте! Я хочу записаться на процедуру в SONSAI:\nПроцедура: {TREATMENT}\nДлительность: {DURATION}\n\nПожалуйста, свяжитесь со мной для согласования даты и времени.',
  ka: 'გამარჯობა, მსურს პროცედურის დაჯავშნა SONSAI-ში:\nპროცედურა: {TREATMENT}\nხანგრძლივობა: {DURATION}\n\nგთხოვთ, დამიკავშირდეთ თარიღისა და დროის დასაზუსტებლად.'
};

// ✅ תרגום יחידת דקות + פורמט תצוגה
const DURATION_I18N = {
  he: { unit: "דק׳", fmt: (m) => `${m} דק׳` },
  en: { unit: 'min', fmt: (m) => `${m} min` },
  ru: { unit: 'мин', fmt: (m) => `${m} мин` },
  ka: { unit: 'წთ', fmt: (m) => `${m} წთ` }
};

// ✅ שמות + תיאורים + מחיר + תג (כדי לתרגם גם tag)
const TREATMENTS_META = {
  // ===== HEAD SPA =====
  'head-spa': {
    tag: {
      he: '🌸 ספא ראש יפני',
      en: '🌸 Japanese Head Spa',
      ru: '🌸 Японский Head Spa',
      ka: '🌸 იაპონური Head Spa'
    },
    name: {
      he: 'Japanese Head Spa | ספא ראש יפני',
      en: 'Japanese Head Spa',
      ru: 'Японский Head Spa',
      ka: 'იაპონური Head Spa'
    },
    desc: {
      he: 'טיפול יפני מסורתי המשלב ניקוי יסודי של הקרקפת, עיסוי ממוקד, מסכות טיפוליות ופינוקי מים חמימים. הטכניקה ממריצה את זרימת הדם לקרקפת, מחזקת את שורשי השיער ומרגיעה עומסים נפשיים. כולל שטיפה עמוקה, מגבת חמה, סרום ייעודי לקרקפת וייבוש שיער מלא. הטיפול מסתיים במנוחה קצרה עם תה וניחוח ארומטי עדין.',
      en: 'A traditional Japanese treatment combining deep scalp cleansing, focused massage, dedicated masks, and warm water pampering. Boosts circulation, supports hair roots, and reduces mental stress. Includes deep wash, hot towel, scalp serum, and full blow-dry. Ends with a short rest and gentle aroma.',
      ru: 'Традиционная японская процедура: глубокое очищение кожи головы, точечный массаж, маски и тёплая водная терапия. Улучшает кровообращение, укрепляет корни волос и снимает стресс. Включает мытьё, горячее полотенце, сыворотку и полную сушку. Завершается коротким отдыхом с ароматом.',
      ka: 'ტრადიციული იაპონური პროცედურა: თავის კანის ღრმა წმენდა, მიზნობრივი მასაჟი, ნიღბები და თბილი წყლის თერაპია. აუმჯობესებს სისხლის მიმოქცევას, ამაგრებს თმის ფესვებს და ამცირებს სტრესს. მოიცავს დაბანას, ცხელ პირსახოცს, სერუმს და სრულ გაშრობას. სრულდება მოკლე დასვენებით და ნაზი არომატით.'
    },
    price: { he: '60 דק׳ – 200₾', en: '60 min – 200₾', ru: '60 мин – 200₾', ka: '60 წთ – 200₾' }
  },

  // ===== BODY / BACK =====
  'back-basic': {
    tag: { he: '💪 עיסוי תאילנדי עמוק בשמן', en: '💪 Deep Thai Oil Back–Neck–Shoulders', ru: '💪 Глубокий тайский масляный (спина–шея–плечи)', ka: '💪 ღრმა თაილანდური ზეთოვანი (ზურგი–კיסერი–მხრები)' },
    name: { he: 'Deep Thai Oil Back–Neck–Shoulders Massage | עיסוי תאילנדי עמוק בשמן', en: 'Deep Thai Oil Back–Neck–Shoulders Massage', ru: 'Глубокий тайский масляный массаж спины, шеи и плеч', ka: 'ღრმა თაილანდური ზეთოვანი მასაჟი ზურგის, კისრისა და მხრების' },
    desc: {
      he: 'עיסוי תאילנדי טיפולי בשמן המתמקד באזורי עומס מרכזיים. משלב לחיצות עמוקות, עבודה מדויקת עם אמות ומרפקים. מסייע בהפחתת כאבי צוואר, כתפיים וגב עליון. מתאים לעומס יומיומי וישיבה ממושכת.',
      en: 'Therapeutic Thai oil massage focusing on key tension areas. Combines deep pressure and precise forearm/elbow work. Helps reduce neck, shoulder and upper-back pain—great for daily load and long sitting.',
      ru: 'Лечебный тайский массаж с маслом: глубокое давление и работа предплечьями/локтями. Помогает уменьшить боль в шее, плечах и верхней части спины. Идеально при сидячей нагрузке.',
      ka: 'თერაპიული თაილანდური ზეთოვანი მასაჟი: ღრმა წნევა და იდაყვებით/მაჯებით ზუსტი მუშაობა. ამცირებს კისრის, მხრების და ზედა ზურგის დაძაბულობას. კარგია ხანგრძლივი ჯდომისას.'
    },
    price: { he: '60 דק׳ – 150₾', en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
  },

  'back-hot-stone': {
    tag: { he: '🔥 עיסוי גב–כתפיים–צוואר עם אבנים חמות', en: '🔥 Hot Stone Back–Neck–Shoulders', ru: '🔥 Горячие камни (спина–шея–плечи)', ka: '🔥 ცხელი ქვები (ზურგი–კისერი–მხრები)' },
    name: { he: 'Hot Stone Back–Neck–Shoulders Massage | עיסוי גב–כתפיים–צוואר עם אבנים חמות', en: 'Hot Stone Back–Neck–Shoulders Massage', ru: 'Массаж спины, шеи и плеч горячими камнями', ka: 'ზურგის, კისრის და მხრების მასაჟი ცხელ ქვებთან' },
    desc: {
      he: 'עיסוי ממוקד המשלב עבודה ידנית עם אבני בזלת חמימות. החום מאפשר שחרור עמוק ובטוח של שרירים תפוסים. מפחית מתח נפשי וכאבים כרוניים בפלג הגוף העליון. יוצר הרפיה מלאה ותחושת קלילות.',
      en: 'Focused massage combining manual work with warm basalt stones. Heat enables deep, safe release of tight muscles—great for upper-body tension and chronic discomfort. Creates full relaxation and lightness.',
      ru: 'Прицельный массаж с тёплыми базальтовыми камнями. Тепло помогает безопасно снять глубокие зажимы и напряжение в верхней части тела. Даёт полное расслабление и лёгкость.',
      ka: 'მიზანმიმართული მასაჟი თბილი ბაზალტის ქვებით. სითბო უსაფრთხოდ ხსნის ღრმა დაჭიმულობას ზედა სხეულში და ქმნის სრულ რელაქსაციას.'
    },
    price: { he: '60 דק׳ – 180₾', en: '60 min – 180₾', ru: '60 мин – 180₾', ka: '60 წთ – 180₾' }
  },

  // ===== FULL BODY =====
  'body-aloe-vera': {
    tag: { he: '🌿 עיסוי תאילנדי עם אלוורה', en: '🌿 Thai Aloe Vera Massage', ru: '🌿 Тайский массаж с алоэ вера', ka: '🌿 თაილანდური მასაჟი ალოე ვერათი' },
    name: { he: 'Thai Aloe Vera Massage | עיסוי תאילנדי עם אלוורה', en: 'Thai Aloe Vera Massage', ru: 'Тайский массаж с алоэ вера', ka: 'თაილანდური მასაჟი ალოე ვერათი' },
    desc: {
      he: 'עיסוי תאילנדי עדין בשילוב ג׳ל אלוורה טבעי. האלוורה מרגיעה, מקררת ומזינה את העור תוך שמירה על לחות וגמישות. מתאים במיוחד לעור רגיש ולאחר חשיפה לשמש. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A gentle Thai massage with natural aloe vera gel. Aloe cools, soothes and nourishes the skin while supporting hydration and elasticity—great for sensitive skin and after sun exposure. Full-body treatment including a gentle face massage.',
      ru: 'Нежный тайский массаж с натуральным гелем алоэ вера. Алоэ охлаждает, успокаивает и питает кожу, поддерживая увлажнение и эластичность—особенно после солнца и при чувствительной коже. Полный массаж тела с мягким массажем лица.',
      ka: 'ნაზი თაილანდური მასაჟი ბუნებრივი ალოე ვერას გელით. ალოე აგრილებს, ამშვიდებს და კვებავს კანს, ხელს უწყობს დატენიანებასა და ელასტიურობას—განსაკუთრებით მზის შემდეგ და მგრძნობიარე კანზე. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

  'body-vitamin-e': {
    tag: { he: '✨ עיסוי תאילנדי עם קרם ויטמין E', en: '✨ Thai Vitamin E Cream Massage', ru: '✨ Тайский массаж с кремом Vitamin E', ka: '✨ თაილანდური მასაჟი Vitamin E კრემით' },
    name: { he: 'עיסוי תאילנדי עם קרם ויטמין E', en: 'Thai Vitamin E Cream Massage', ru: 'Тайский массаж с кремом Vitamin E', ka: 'თაილანდური მასაჟი Vitamin E კრემით' },
    desc: {
  he: `עיסוי תאילנדי עם קרם ויטמין E הוא טיפול גוף מפנק המשלב טכניקות עיסוי תאילנדיות עם שימוש בקרם עשיר בוויטמין E.
הקרם מעניק לחות לעור ומסייע לשמור על תחושת רכות ונעימות במהלך הטיפול ולאחריו.
העיסוי מסייע בהרפיית השרירים, בהפחתת מתחים ובשיפור תחושת הרוגע והאיזון.
זהו טיפול אידיאלי למי שמחפש שילוב של חוויית עיסוי מרגיעה יחד עם טיפוח והזנת העור.`,

  en: `Thai massage with Vitamin E cream is a luxurious body treatment that combines traditional Thai massage techniques with a cream enriched with Vitamin E.
The cream helps moisturize the skin and leaves it feeling soft and smooth during and after the treatment.
The massage promotes muscle relaxation, reduces tension, and enhances a sense of calm and balance.
It is an ideal choice for those seeking a relaxing massage experience combined with skin nourishment and care.`,

  ru: `Тайский массаж с кремом с витамином E — это приятная процедура для тела, сочетающая техники тайского массажа с использованием крема, обогащённого витамином E.
Крем помогает увлажнить кожу и сохранить ощущение мягкости и комфорта во время и после процедуры.
Массаж способствует расслаблению мышц, снижению напряжения и созданию чувства спокойствия и гармонии.
Это идеальный выбор для тех, кто хочет совместить расслабляющий массаж с уходом и питанием кожи.`,

  ka: `ტაილანდური მასაჟი ვიტამინ E-ს კრემით არის სასიამოვნო სხეულის პროცედურა, რომელიც აერთიანებს ტრადიციულ ტაილანდურ მასაჟს ვიტამინ E-ით გამდიდრებულ კრემთან.
კრემი ატენიანებს კანს და ხელს უწყობს მისი სირბილისა და კომფორტის შენარჩუნებას პროცედურის განმავლობაში და მის შემდეგ.
მასაჟი ეხმარება კუნთების მოდუნებას, დაძაბულობის შემცირებას და სიმშვიდისა და ბალანსის შეგრძნების გაძლიერებას.
ეს არის იდეალური არჩევანი მათთვის, ვინც ეძებს დამამშვიდებელ მასაჟს კანის მოვლისა და კვების დამატებითი სარგებლით.`
},
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

'body-Thai Oil Massage': {
  tag: { he: '🧘 Thai Oil Massage', en: '🧘 Thai Oil Massage', ru: '🧘 Тайский массаж с маслом', ka: '🧘 თაილანდური ზეთოვანი მასაჟი' },
  name: { he: 'עיסוי תאילנדי בשמן', en: 'Thai Oil Massage', ru: 'Тайский масляный массаж', ka: 'ტაილანდური ზეთოვანი მასაჟი' },
  desc: {
  he: `עיסוי תאילנדי בשמן הוא טיפול גוף מקצועי המשלב טכניקות עיסוי תאילנדיות עם תנועות חלקות וזורמות.
השימוש בשמן מסייע להרפיית השרירים, להפחתת מתחים וליצירת תחושת רוגע עמוקה.
הטיפול מתמקד בשחרור עומסים מהגוף, שיפור זרימת הדם והענקת תחושת קלילות.
זהו עיסוי מרגיע ומחדש המתאים למי שמחפש חוויית טיפול נעימה, מאוזנת ומפנקת.`,

  en: `Thai oil massage is a professional body treatment that combines Thai massage techniques with smooth, flowing movements.
The use of oil helps relax the muscles, reduce tension, and create a deep sense of calm.
The treatment focuses on releasing body stress, improving circulation, and creating a feeling of lightness.
It is a relaxing and revitalizing massage for anyone seeking a pleasant, balanced, and soothing treatment experience.`,

  ru: `Тайский массаж с маслом — это профессиональная процедура для тела, сочетающая техники тайского массажа с плавными и мягкими движениями.
Использование масла помогает расслабить мышцы, снять напряжение и создать глубокое ощущение спокойствия.
Процедура направлена на снятие нагрузки с тела, улучшение кровообращения и ощущение легкости.
Это расслабляющий и восстанавливающий массаж для тех, кто ищет приятный, сбалансированный и комфортный уход.`,

  ka: `ტაილანდური ზეთის მასაჟი არის პროფესიონალური სხეულის პროცედურა, რომელიც აერთიანებს ტაილანდური მასაჟის ტექნიკებს რბილ და მოძრავ მოძრაობებთან.
ზეთის გამოყენება ხელს უწყობს კუნთების მოდუნებას, დაძაბულობის შემცირებას და ღრმა სიმშვიდის შეგრძნებას.
პროცედურა მიმართულია სხეულის დაძაბულობის მოხსნაზე, სისხლის მიმოქცევის გაუმჯობესებასა და სიმსუბუქის შეგრძნებაზე.
ეს არის დამამშვიდებელი და აღმდგენი მასაჟი მათთვის, ვინც ეძებს სასიამოვნო, დაბალანსებულ და კომფორტულ გამოცდილებას.`
  },
  price: { he: '60 דק׳ – 150₾', en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
},


  'body-coconut-oil': {
    tag: { he: '🥥 עיסוי תאילנדי עם שמן קוקוס', en: '🥥 Thai Coconut Oil Massage', ru: '🥥 Тайский массаж с кокосовым маслом', ka: '🥥 თაილანდური მასაჟი ქოქოსის ზეთით' },
    name: { he: 'Thai Coconut Oil Massage | עיסוי תאילנדי עם שמן קוקוס', en: 'Thai Coconut Oil Massage', ru: 'Тайский массаж с кокосовым маслом', ka: 'თაილანდური მასაჟი ქოქოსის ზეთით' },
    desc: {
      he: 'עיסוי תאילנדי עדין בשילוב שמן קוקוס טבעי המזין את העור ומעניק לחות עמוקה. התנועות זורמות ומאזנות את הגוף והנפש. מתאים במיוחד לעור יבש או רגיש. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A gentle Thai massage with natural coconut oil for deep hydration and skin nourishment. Flowing strokes balance body and mind—especially suitable for dry or sensitive skin. Full-body treatment including a gentle face massage.',
      ru: 'Нежный тайский массаж с натуральным кокосовым маслом для питания кожи и глубокого увлажнения. Плавные движения балансируют тело и ум. Подходит для сухой и чувствительной кожи. Полный массаж тела с мягким массажем лица.',
      ka: 'ნაზი თაილანდური მასაჟი ბუნებრივი ქოქოსის ზეთით ღრმა დატენიანებისა და კვებისთვის. მოლივლივე მოძრაობები აბალანსებს სხეულსა და გონებას. კარგია მშრალი/მგრძნობიარე კანისთვის. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

  'body-thai': {
    tag: { he: '🇹🇭 עיסוי תאילנדי מסורתי', en: '🇹🇭 Traditional Thai Massage', ru: '🇹🇭 Традиционный тайский массаж', ka: '🇹🇭 ტრადიციული ტაილანდური' },
    name: { he: 'עיסוי תאילנדי מסורתי', en: 'Traditional Thai Massage', ru: 'Традиционный тайский массаж', ka: 'ტრადიციული ტაილანდური მასაჟი' },
    desc: {
  he: `עיסוי תאילנדי מסורתי הוא שיטת טיפול עתיקה שמקורה בתאילנד ומשלבת מתיחות, לחיצות וטכניקות עבודה לאורך קווי האנרגיה של הגוף.
הטיפול מסייע בהפחתת מתחים, שחרור שרירים תפוסים ושיפור הגמישות וטווח התנועה.
במהלך העיסוי המטפל משתמש בידיים, במרפקים ולעיתים גם במשקל הגוף כדי לבצע מתיחות ולחיצות מדויקות.
זהו טיפול מרגיע ומחדש המסייע בהענקת תחושת איזון, רעננות ורווחה כללית.`,

  en: `Traditional Thai massage is an ancient healing practice originating in Thailand that combines stretching, pressure techniques, and work along the body's energy lines.
The treatment helps reduce stress, relieve muscle tension, and improve flexibility and range of motion.
During the session, the therapist uses hands, elbows, and sometimes body weight to apply precise stretches and pressure.
It is a relaxing and revitalizing treatment that promotes balance, refreshment, and overall well-being.`,

  ru: `Традиционный тайский массаж — это древняя оздоровительная практика, возникшая в Таиланде, которая сочетает растяжку, точечное воздействие и работу по энергетическим линиям тела.
Процедура помогает снять напряжение, расслабить мышцы и улучшить гибкость и подвижность.
Во время массажа мастер использует руки, локти и иногда вес собственного тела для выполнения точных растяжек и надавливаний.
Это расслабляющая и восстанавливающая процедура, способствующая ощущению баланса, свежести и общего благополучия.`,

  ka: `ტრადიციული ტაილანდური მასაჟი უძველესი სამკურნალო მეთოდია, რომელიც აერთიანებს გაჭიმვებს, ზეწოლის ტექნიკებსა და სხეულის ენერგეტიკულ ხაზებზე მუშაობას.
პროცედურა ხელს უწყობს სტრესის შემცირებას, კუნთების მოდუნებას და მოქნილობის გაუმჯობესებას.
მასაჟის დროს თერაპევტი იყენებს ხელებს, იდაყვებს და ზოგჯერ საკუთარი სხეულის წონას ზუსტი გაჭიმვებისა და ზეწოლის შესასრულებლად.
ეს არის დამამშვიდებელი და გამაახალგაზრდავებელი პროცედურა, რომელიც ხელს უწყობს ბალანსის, ენერგიისა და საერთო კეთილდღეობის შეგრძნებას.`
    },
    price: { he: '60 דק׳ – 150₾', en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
  },

  'body-thai-balm': {
    tag: { he: '🔥 עיסוי תאילנדי עם באלם', en: '🔥 Thai Balm Massage', ru: '🔥 Тайский массаж с бальзамом', ka: '🔥 თაილანდური მასაჟი ბალზამით' },
    name: { he: 'Thai Balm Massage | עיסוי תאילנדי עם באלם', en: 'Thai Balm Massage', ru: 'Тайский массаж с бальзамом', ka: 'თაილანდური მასაჟი ბალზამით' },
    desc: {
      he: 'עיסוי תאילנדי ממוקד עם באלם תאילנדי ייעודי. מסייע בהפחתת כאבים, נוקשות ודלקות מקומיות. מתבצע בלחיצות עמוקות על אזורי עומס. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A focused Thai massage using a dedicated Thai balm. Helps reduce pain, stiffness and local inflammation with deep pressure on key tension areas. Full-body treatment including a gentle face massage.',
      ru: 'Тайский массаж с бальзамом: глубокие надавливания на зоны напряжения, помогает уменьшить боль и скованность. Полный массаж тела с мягким массажем лица.',
      ka: 'თაილანდური მასაჟი სპეციალური ბალზამით — ღრმა წერტილოვანი მუშაობა დაძაბულობის ზონებზე. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

  'body-thai-ther': {
    tag: { he: '🩺 עיסוי תאילנדי טיפולי', en: '🩺 Thai Therapeutic Massage', ru: '🩺 Лечебный тайский массаж', ka: '🩺 თერაპიული თაილანდური' },
    name: { he: 'Thai Therapeutic Massage | עיסוי תאילנדי טיפולי', en: 'Thai Therapeutic Massage', ru: 'Тайский лечебный массаж', ka: 'ტაილანდური თერაპიული მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי טיפולי עמוק וממוקד. מטפל בכאבי גב, צוואר ושרירים תפוסים כרונית. משפר טווח תנועה ומפחית עומסים. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A deep, focused therapeutic Thai massage targeting back/neck pain and chronically tight muscles. Improves range of motion and reduces overload. Full-body treatment including a gentle face massage.',
      ru: 'Глубокий лечебный тайский массаж: спина/шея и хронические зажимы. Улучшает подвижность и снижает нагрузку. Полный массаж тела с мягким массажем лица.',
      ka: 'ღრმა თერაპიული თაილანდური მასაჟი — ზურგი/კისერი და ქრონიკული დაჭიმულობა. აუმჯობესებს მოძრაობას და ამცირებს დატვირთვას. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 200₾', en: '60 min – 200₾', ru: '60 мин – 200₾', ka: '60 წთ – 200₾' }
  },

  'body-sports': {
    tag: { he: '🏃 עיסוי ספורט', en: '🏃 Sports Massage', ru: '🏃 Спортивный массаж', ka: '🏃 სპორტული მასაჟი' },
    name: { he: 'עיסוי ספורט', en: 'Sports Massage', ru: 'Спортивный массаж', ka: 'სპორტული მასაჟი' },
    desc: {
  he: `עיסוי ספורט הוא טיפול מקצועי המיועד לאנשים פעילים, ספורטאים ולכל מי שסובל מעומס ומתח בשרירים.
הטיפול משלב טכניקות ממוקדות המסייעות בשחרור שרירים תפוסים, שיפור הגמישות והפחתת תחושת עייפות לאחר פעילות גופנית.
העיסוי מתבצע בעוצמה מותאמת לצורכי המטופל ומתמקד באזורים הדורשים תשומת לב מיוחדת.
זהו טיפול יעיל לשיפור תחושת ההתאוששות, הניידות והביצועים הגופניים.`,

  en: `Sports massage is a professional treatment designed for active individuals, athletes, and anyone experiencing muscle tension or physical strain.
The treatment combines targeted techniques that help release tight muscles, improve flexibility, and reduce fatigue after physical activity.
The massage pressure is adjusted to the client’s needs and focuses on areas that require special attention.
It is an effective treatment for enhancing recovery, mobility, and overall physical performance.`,

  ru: `Спортивный массаж — это профессиональная процедура, предназначенная для активных людей, спортсменов и всех, кто испытывает мышечное напряжение или физическую нагрузку.
Процедура сочетает специальные техники, которые помогают расслабить напряжённые мышцы, улучшить гибкость и уменьшить усталость после физических нагрузок.
Интенсивность массажа подбирается индивидуально и уделяет особое внимание проблемным зонам.
Это эффективный способ улучшить восстановление, подвижность и физическую работоспособность.`,

  ka: `სპორტული მასაჟი არის პროფესიონალური პროცედურა, რომელიც განკუთვნილია აქტიური ადამიანებისთვის, სპორტსმენებისთვის და მათთვის, ვისაც კუნთების დაძაბულობა ან ფიზიკური დატვირთვა აწუხებს.
პროცედურა აერთიანებს მიზანმიმართულ ტექნიკებს, რომლებიც ხელს უწყობს დაჭიმული კუნთების მოდუნებას, მოქნილობის გაუმჯობესებას და ფიზიკური აქტივობის შემდეგ დაღლილობის შემცირებას.
მასაჟის ინტენსივობა მორგებულია მომხმარებლის საჭიროებებზე და განსაკუთრებულ ყურადღებას უთმობს პრობლემურ ზონებს.
ეს არის ეფექტური საშუალება აღდგენის, მოძრაობის თავისუფლებისა და ფიზიკური შესაძლებლობების გასაუმჯობესებლად.`
},
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

  'body-deep-tissue-cream': {
    tag: { he: '💪 עיסוי תאילנדי עמוק (דיפ טישיו) – פרימיום', en: '💪 Deep Tissue Thai Massage (Premium)', ru: '💪 Глубокий тайский массаж (Премиум)', ka: '💪 ღრმა თაილანდური მასაჟი (Premium)' },
    name: { he: 'עיסוי תאילנדי עמוק', en: 'Deep Tissue Thai Massage', ru: 'Глубокий тайский массаж', ka: 'ღრმა თაილანდური მასაჟი' },
    desc: {
  he: `עיסוי תאילנדי עמוק הוא טיפול ממוקד ועוצמתי המיועד לשחרור מתחים עמוקים והפגת עומסים שהצטברו בשרירים וברקמות הגוף.
הטיפול משלב טכניקות לחץ מדויקות, מתיחות ועבודה ממוקדת על אזורים תפוסים ומתוחים במיוחד.
העיסוי מסייע בשיפור טווח התנועה, הפחתת נוקשות השרירים והקלה על תחושת עומס פיזי.
זהו טיפול אידיאלי למי שמעדיף עיסוי בעוצמה גבוהה ומחפש שחרור עמוק ותחושת התחדשות בגוף.`,

  en: `Deep Thai Massage is a focused and intensive treatment designed to release deep muscle tension and accumulated stress within the body.
The treatment combines precise pressure techniques, stretching, and targeted work on particularly tight and tense areas.
It helps improve range of motion, reduce muscle stiffness, and relieve physical discomfort.
This massage is ideal for those who prefer stronger pressure and seek deep relief, recovery, and a renewed sense of well-being.`,

  ru: `Глубокий тайский массаж — это интенсивная и целенаправленная процедура, предназначенная для снятия глубокого мышечного напряжения и накопленной нагрузки в тканях тела.
Процедура сочетает точечное давление, растяжки и проработку особенно напряжённых участков.
Массаж помогает улучшить подвижность, уменьшить скованность мышц и облегчить физический дискомфорт.
Это идеальный выбор для тех, кто предпочитает сильное воздействие и стремится к глубокому расслаблению и восстановлению.`,

  ka: `ღრმა ტაილანდური მასაჟი არის მიზანმიმართული და ინტენსიური პროცედურა, რომელიც შექმნილია ღრმა კუნთოვანი დაძაბულობისა და დაგროვილი დატვირთვის მოსახსნელად.
პროცედურა აერთიანებს ზუსტ ზეწოლას, გაჭიმვებს და განსაკუთრებულად დაჭიმულ უბნებზე მუშაობას.
მასაჟი ხელს უწყობს მოძრაობის დიაპაზონის გაუმჯობესებას, კუნთების სიმაგრის შემცირებას და ფიზიკური დისკომფორტის შემსუბუქებას.
ეს არის იდეალური არჩევანი მათთვის, ვინც უპირატესობას ანიჭებს ძლიერ ზეწოლას და ეძებს ღრმა მოდუნებასა და აღდგენას.`
},
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

  'body-hot-stone': {
    tag: { he: '🔥 עיסוי אבנים חמות', en: '🔥 Hot Stone Massage', ru: '🔥 Массаж горячими камнями', ka: '🔥 ცხელი ქვების მასაჟი' },
    name: { he: 'עיסוי אבנים חמות', en: 'Hot Stone Massage', ru: 'Массаж горячими камнями', ka: 'ცხელი ქვების მასაჟი' },
    desc: {
  he: `עיסוי אבנים חמות הוא טיפול מרגיע המשלב טכניקות עיסוי מקצועיות עם שימוש באבנים וולקניות מחוממות לטמפרטורה נעימה.
חום האבנים מסייע להרפיית השרירים, לשיפור זרימת הדם ולהפחתת תחושת מתח ועייפות בגוף.
במהלך הטיפול מונחות האבנים על אזורים נבחרים ומשולבות בתנועות עיסוי חלקות ומרגיעות.
זהו טיפול מפנק ומחדש המעניק תחושת רוגע עמוקה, איזון והתחדשות לגוף ולנפש.`,

  en: `Hot Stone Massage is a deeply relaxing treatment that combines professional massage techniques with the use of smoothly heated volcanic stones.
The warmth of the stones helps relax muscles, improve circulation, and reduce physical tension and fatigue.
During the session, the stones are placed on selected areas of the body and incorporated into gentle, flowing massage movements.
It is a luxurious and rejuvenating experience that promotes deep relaxation, balance, and overall well-being.`,

  ru: `Массаж горячими камнями — это расслабляющая процедура, сочетающая профессиональные массажные техники с использованием нагретых вулканических камней.
Тепло камней помогает расслабить мышцы, улучшить кровообращение и уменьшить чувство усталости и напряжения.
Во время процедуры камни размещаются на определённых участках тела и используются в плавных массажных движениях.
Это приятный и восстанавливающий уход, который дарит глубокое расслабление, гармонию и ощущение обновления.`,

  ka: `ცხელი ქვებით მასაჟი არის ღრმად დამამშვიდებელი პროცედურა, რომელიც აერთიანებს პროფესიონალურ მასაჟის ტექნიკებს სპეციალურად გათბობილ ვულკანურ ქვებთან.
ქვების სითბო ხელს უწყობს კუნთების მოდუნებას, სისხლის მიმოქცევის გაუმჯობესებას და დაძაბულობისა და დაღლილობის შემცირებას.
პროცედურის დროს ქვები თავსდება სხეულის შერჩეულ უბნებზე და გამოიყენება რბილ, მოძრავ მასაჟის მოძრაობებთან ერთად.
ეს არის მდიდრული და აღმდგენი გამოცდილება, რომელიც უზრუნველყოფს ღრმა სიმშვიდეს, ბალანსსა და განახლებას სხეულისა და გონებისთვის.`
},
    price: { he: '60 דק׳ – 200₾', en: '60 min – 200₾', ru: '60 мин – 200₾', ka: '60 წთ – 200₾' }
  },

  'body-thai-comp': {
    tag: { he: '🌼 עיסוי תאילנדי בקומפרסים צמחיים', en: '🌼 Thai Herbal Compress Massage', ru: '🌼 Травяные компрессы', ka: '🌼 მცენარეული კომპრესი' },
    name: { he: 'עיסוי תאילנדי בקומפרסים צמחיים', en: 'Thai Herbal Compress Massage', ru: 'Массаж травяными компрессами', ka: 'მცენარეული კომპრესის მასაჟი' },
    desc: {
  he: `עיסוי תאילנדי בקומפרסים צמחיים הוא טיפול מסורתי המשלב טכניקות עיסוי תאילנדיות עם קומפרסים חמים המכילים תערובת של צמחי מרפא ארומטיים.
החום והצמחים מסייעים להרפיית השרירים, להפחתת תחושת מתח ולעידוד תחושת רוגע ונוחות.
במהלך הטיפול מונחים הקומפרסים על אזורים שונים בגוף ומשולבים בתנועות עיסוי עדינות וממוקדות.
זהו טיפול מפנק ומיוחד המעניק חוויה אותנטית, מרגיעה ומחדשת לגוף ולנפש.`,

  en: `Thai Herbal Compress Massage is a traditional treatment that combines Thai massage techniques with warm herbal compresses filled with aromatic medicinal herbs.
The warmth and herbal blend help relax muscles, ease tension, and promote a deep sense of comfort and relaxation.
During the treatment, the compresses are applied to different areas of the body and combined with gentle, targeted massage movements.
It is a unique and luxurious experience that offers authentic Thai wellness, relaxation, and rejuvenation for both body and mind.`,

  ru: `Тайский массаж с травяными компрессами — это традиционная процедура, сочетающая техники тайского массажа с тёплыми компрессами, наполненными ароматическими лечебными травами.
Тепло и травяная смесь помогают расслабить мышцы, снять напряжение и создать ощущение комфорта и спокойствия.
Во время процедуры компрессы прикладываются к различным участкам тела и сочетаются с мягкими массажными движениями.
Это уникальный и приятный уход, который дарит подлинное тайское расслабление и восстановление для тела и души.`,

  ka: `ტაილანდური მასაჟი მცენარეული კომპრესებით არის ტრადიციული პროცედურა, რომელიც აერთიანებს ტაილანდური მასაჟის ტექნიკებს თბილ კომპრესებთან, რომლებიც სავსეა არომატული სამკურნალო მცენარეებით.
სითბო და მცენარეული ნარევი ხელს უწყობს კუნთების მოდუნებას, დაძაბულობის შემცირებას და ღრმა კომფორტის შეგრძნებას.
პროცედურის დროს კომპრესები თავსდება სხეულის სხვადასხვა უბანზე და ერთიანდება ნაზ და მიზანმიმართულ მასაჟის მოძრაობებთან.
ეს არის განსაკუთრებული და მდიდრული გამოცდილება, რომელიც უზრუნველყოფს ავთენტურ ტაილანდურ რელაქსაციასა და განახლებას სხეულისა და გონებისთვის.`
},
    price: { he: '60 דק׳ – 190₾', en: '60 min – 190₾', ru: '60 мин – 190₾', ka: '60 წთ – 190₾' }
  },

  'body-karsai': {
    tag: { he: '⚡ עיסוי תאילנדי קארסאי – פרימיום', en: '⚡ Karsai Massage (Premium)', ru: '⚡ Карсай массаж (Премиум)', ka: '⚡ Karsai მასაჟი (Premium)' },
    name: { he: 'Karsai Massage | עיסוי תאילנדי קארסאי – פרימיום', en: 'Karsai Massage', ru: 'Карсай массаж', ka: 'Karsai მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי מסורתי מתקדם מהרפואה העתיקה. מתמקד באזורים אנרגטיים עמוקים. טיפול עוצמתי ונישתי המיועד למטופלים מנוסים בלבד. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'An advanced traditional Thai treatment focusing on deep energetic areas. A powerful niche treatment intended for experienced clients only. Full-body treatment including a gentle face massage.',
      ru: 'Продвинутая традиционная тайская процедура с фокусом на глубокие энергетические зоны. Мощная нишевая процедура — только для опытных клиентов. Полный массаж тела с мягким массажем лица.',
      ka: 'განვითარებული ტრადიციული თაილანდური პროცედურა ღრმა ენერგეტიკულ ზონებზე ფოკუსით. ძლიერი ნიშური პროცედურა მხოლოდ გამოცდილ კლიენტებისთვის. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 180₾', en: '60 min – 180₾', ru: '60 мин – 180₾', ka: '60 წთ – 180₾' }
  },

'body-thai-relax-oil': {
  tag: { he: '🌿 עיסוי תאילנדי מרגיע', en: '🌿 Thai Relax Oil Massage', ru: '🌿 Тайский расслабляющий ойл-массаж', ka: '🌿 ტაილანდური რელაქს ზეთოვანი მასაჟი' },
  name: { he: 'עיסוי תאילנדי מרגיע', en: 'Thai Relax Oil Massage', ru: 'Thai Relax Oil Massage | Тайский расслабляющий массаж', ka: 'Thai Relax Oil Massage | ტაილანდური დამამშვიდებელი მასაჟი' },
  desc: {
  he: `עיסוי תאילנדי מרגיע הוא טיפול גוף עדין ונעים המשלב טכניקות תאילנדיות עם תנועות איטיות, רכות וזורמות.
הטיפול מסייע להפחתת מתחים, להרפיית השרירים ולהענקת תחושת שלווה עמוקה.
במהלך העיסוי מותאמת עוצמת הלחיצות לפי נוחות המטופל, כדי ליצור חוויה רגועה ומאוזנת.
זהו טיפול אידיאלי למי שמחפש הפסקה מהיום, שחרור עומס ותחושת רעננות כללית.`,

  en: `Relaxing Thai massage is a gentle and pleasant body treatment that combines Thai techniques with slow, soft, and flowing movements.
The treatment helps reduce tension, relax the muscles, and create a deep sense of calm.
During the massage, the pressure level is adjusted according to the client’s comfort to create a peaceful and balanced experience.
It is an ideal treatment for anyone seeking a break from the day, relief from stress, and an overall feeling of refreshment.`,

  ru: `Расслабляющий тайский массаж — это мягкая и приятная процедура для тела, сочетающая тайские техники с медленными, плавными и мягкими движениями.
Процедура помогает снять напряжение, расслабить мышцы и создать глубокое ощущение спокойствия.
Во время массажа сила надавливания подбирается с учетом комфорта клиента, чтобы создать спокойный и сбалансированный опыт.
Это идеальный выбор для тех, кто хочет сделать паузу в течение дня, снять стресс и почувствовать общее обновление.`,

  ka: `დამამშვიდებელი ტაილანდური მასაჟი არის რბილი და სასიამოვნო სხეულის პროცედურა, რომელიც აერთიანებს ტაილანდურ ტექნიკებს ნელ, რბილ და მოძრავ მოძრაობებთან.
პროცედურა ხელს უწყობს დაძაბულობის შემცირებას, კუნთების მოდუნებას და ღრმა სიმშვიდის შეგრძნებას.
მასაჟის დროს ზეწოლის დონე მორგებულია მომხმარებლის კომფორტზე, რათა შეიქმნას მშვიდი და დაბალანსებული გამოცდილება.
ეს არის იდეალური არჩევანი მათთვის, ვინც ეძებს დღისგან მცირე შესვენებას, სტრესის მოხსნას და საერთო განახლების შეგრძნებას.`
},
  price: { he: '60 דק׳ – 150₾', en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
},

'body-thai-hot-oil': {
  tag: { he: '🔥 עיסוי תאילנדי בשמן חם', en: '🔥 Thai Hot Oil Massage', ru: '🔥 Тайский массаж горячим маслом', ka: '🔥 ტაილანდური მასაჟი ცხელი ზეთით' },
  name: { he: 'עיסוי תאילנדי בשמן חם', en: 'Thai Hot Oil Massage', ru: 'Thai Hot Oil Massage | Тайский массаж горячим маслом', ka: 'Thai Hot Oil Massage | ტაილანდური მასაჟი ცხელი ზეთით' },
  desc: {
  he: `עיסוי תאילנדי בשמן חם הוא טיפול מרגיע ומפנק המשלב טכניקות עיסוי תאילנדיות מסורתיות עם שימוש בשמנים מחוממים לטמפרטורה נעימה.
החום מסייע להרפיית השרירים, לשיפור זרימת הדם ולהפחתת תחושת מתח ועייפות בגוף.
במהלך הטיפול מבוצעות תנועות חלקות ולחיצות מותאמות המסייעות בשחרור עומסים ובהענקת תחושת נינוחות עמוקה.
זהו טיפול אידיאלי למי שמחפש חוויה מרגיעה, מחממת ומחדשת לגוף ולנפש.`,

  en: `Hot Oil Thai Massage is a relaxing and luxurious treatment that combines traditional Thai massage techniques with the use of pleasantly warmed oils.
The warmth helps relax muscles, improve blood circulation, and reduce physical tension and fatigue.
The treatment includes smooth movements and customized pressure techniques designed to release stress and promote deep relaxation.
It is an ideal choice for those seeking a soothing, warming, and rejuvenating experience for both body and mind.`,

  ru: `Тайский массаж с тёплым маслом — это расслабляющая и комфортная процедура, сочетающая традиционные техники тайского массажа с использованием приятно подогретых масел.
Тепло помогает расслабить мышцы, улучшить кровообращение и уменьшить чувство усталости и напряжения.
Во время процедуры используются плавные движения и индивидуально подобранное давление для снятия стресса и глубокого расслабления.
Этот массаж идеально подходит для тех, кто ищет согревающий, успокаивающий и восстанавливающий уход для тела и души.`,

  ka: `ტაილანდური მასაჟი თბილი ზეთით არის დამამშვიდებელი და სასიამოვნო პროცედურა, რომელიც აერთიანებს ტრადიციულ ტაილანდურ მასაჟის ტექნიკებს სასიამოვნოდ გათბობილ ზეთებთან.
სითბო ხელს უწყობს კუნთების მოდუნებას, სისხლის მიმოქცევის გაუმჯობესებას და დაღლილობისა და დაძაბულობის შემცირებას.
პროცედურის დროს გამოიყენება რბილი მოძრაობები და ინდივიდუალურად მორგებული ზეწოლის ტექნიკები, რომლებიც ეხმარება სტრესის მოხსნას და ღრმა მოდუნებას.
ეს არის იდეალური არჩევანი მათთვის, ვინც ეძებს თბილ, დამამშვიდებელ და აღმდგენ გამოცდილებას სხეულისა და გონებისთვის.`
},
  price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
},

'body-aroma-oil-therapeutic': {
  tag: { he: '🌿 עיסוי ארומתרפי – פרימיום', en: '🌿 Aroma Oil Therapeutic Massage (Premium)', ru: '🌿 Арома ойл-массаж (Премиум)', ka: '🌿 არომა ზეთოვანი მასაჟი (Premium)' },
  name: { he: 'עיסוי ארומתרפי בשמנים אתריים', en: 'Aroma Oil Therapeutic Massage', ru: 'Ароматерапевтический ойл-массаж', ka: 'არომათერაპიული ზეთოვანი მასაჟი' },
  desc: {
  he: `עיסוי ארומתרפי בשמנים אתריים הוא טיפול גוף מרגיע המשלב טכניקות עיסוי עדינות עם שימוש בשמנים בעלי ניחוחות טבעיים.
הטיפול מסייע להרפיית השרירים, להפחתת מתחים וליצירת תחושת רוגע עמוקה.
הניחוחות הארומתרפיים תורמים לאווירה נעימה ומאזנת לאורך כל הטיפול.
זהו טיפול אידיאלי למי שמחפש חוויה מפנקת, רגועה ומחדשת לגוף ולנפש.`,

  en: `Aromatherapy massage with essential oils is a relaxing body treatment that combines gentle massage techniques with naturally scented oils.
The treatment helps relax the muscles, reduce tension, and create a deep sense of calm.
The aromatic scents contribute to a pleasant and balanced atmosphere throughout the session.
It is an ideal treatment for anyone seeking a soothing, pampering, and refreshing experience for both body and mind.`,

  ru: `Ароматерапевтический массаж с эфирными маслами — это расслабляющая процедура для тела, сочетающая мягкие техники массажа с использованием масел с натуральными ароматами.
Процедура помогает расслабить мышцы, снять напряжение и создать глубокое ощущение спокойствия.
Ароматические ноты создают приятную и гармоничную атмосферу на протяжении всего сеанса.
Это идеальный выбор для тех, кто ищет расслабляющий, приятный и восстанавливающий уход для тела и души.`,

  ka: `არომათერაპიული მასაჟი ეთერზეთებით არის დამამშვიდებელი სხეულის პროცედურა, რომელიც აერთიანებს რბილ მასაჟის ტექნიკებს ბუნებრივი არომატის მქონე ზეთებთან.
პროცედურა ხელს უწყობს კუნთების მოდუნებას, დაძაბულობის შემცირებას და ღრმა სიმშვიდის შეგრძნებას.
არომათერაპიული სურნელები ქმნის სასიამოვნო და დაბალანსებულ ატმოსფეროს მთელი სესიის განმავლობაში.
ეს არის იდეალური არჩევანი მათთვის, ვინც ეძებს ნაზ, სასიამოვნო და აღმდგენ გამოცდილებას სხეულისა და გონებისთვის.`
},
  price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
},

'foot-massage': {
  tag: { he: '🦶 טיפולי כפות רגליים', en: '🦶 Thai Foot Massage', ru: '🦶 Тайский массаж стоп', ka: '🦶 ტაილანდური ფეხის მასაჟი' },
  name: { he: 'עיסוי כפות רגליים', en: 'Thai Foot Massage', ru: 'Thai Foot Massage', ka: 'Thai Foot Massage' },
  desc: {
  he: `עיסוי כפות רגליים הוא טיפול מרגיע המתמקד בכפות הרגליים ובאזורים הקשורים אליהן.
הטיפול משלב לחיצות וטכניקות עיסוי המסייעות להפחתת תחושת עייפות ולהענקת תחושת נוחות ורוגע.
במהלך הטיפול מושם דגש על שחרור מתחים שהצטברו במהלך היום ושיפור תחושת הרווחה הכללית.
זהו טיפול נעים ומרענן המתאים לכל מי שמחפש רגע של שלווה, קלילות והתחדשות.`,

  en: `Foot massage is a relaxing treatment focused on the feet and the areas connected to them.
The treatment combines pressure and massage techniques that help reduce fatigue and create a feeling of comfort and calm.
During the session, special attention is given to releasing tension accumulated throughout the day and improving overall well-being.
It is a pleasant and refreshing treatment for anyone seeking a moment of peace, lightness, and renewal.`,

  ru: `Массаж стоп — это расслабляющая процедура, направленная на стопы и связанные с ними зоны.
Процедура сочетает надавливания и массажные техники, которые помогают уменьшить усталость и создать ощущение комфорта и спокойствия.
Во время сеанса особое внимание уделяется снятию напряжения, накопленного в течение дня, и улучшению общего самочувствия.
Это приятная и освежающая процедура для тех, кто ищет момент покоя, лёгкости и восстановления.`,

  ka: `ფეხის ტერფების მასაჟი არის დამამშვიდებელი პროცედურა, რომელიც ფოკუსირებულია ტერფებზე და მათთან დაკავშირებულ ზონებზე.
პროცედურა აერთიანებს ზეწოლისა და მასაჟის ტექნიკებს, რომლებიც ხელს უწყობს დაღლილობის შემცირებას და კომფორტისა და სიმშვიდის შეგრძნებას.
სეანსის დროს განსაკუთრებული ყურადღება ექცევა დღის განმავლობაში დაგროვილი დაძაბულობის მოხსნას და საერთო კეთილდღეობის გაუმჯობესებას.
ეს არის სასიამოვნო და გამახალისებელი პროცედურა მათთვის, ვინც ეძებს სიმშვიდის, სიმსუბუქისა და განახლების მომენტს.`
},
  price: { he: '30 דק׳ – 80₾ · 60 דק׳ – 120₾', en: '30 min – 80₾ · 60 min – 120₾', ru: '30 мин – 80₾ · 60 мин – 120₾', ka: '30 წთ – 80₾ · 60 წთ – 120₾' }
},

  'foot-reflexology': {
    tag: { he: '🦶 עיסוי תאילנדי כפות רגליים רפלקסולוגי', en: '🦶 Thai Reflexology Foot Massage', ru: '🦶 Тайская рефлексология стоп', ka: '🦶 თაილანდური რეფლექსოლოგია ფეხზე' },
    name: { he: 'Thai Reflexology Foot Massage | עיסוי תאילנדי כפות רגליים רפלקסולוגי', en: 'Thai Reflexology Foot Massage', ru: 'Тайский массаж стоп (рефлексология)', ka: 'ტაილანდური ფეხის რეფლექსოლოგიური მასაჟი' },
    desc: {
      he: 'עיסוי רפלקסולוגי תאילנדי עם לחיצות עמוקות ומשחה חריפה. משפיע על מערכות הגוף דרך נקודות השתקפות בכפות הרגליים. טיפול ממוקד ויעיל.',
      en: 'A Thai reflexology foot treatment with deep pressure and a warming balm. Influences body systems through reflex points in the feet—focused and effective.',
      ru: 'Тайская рефлексология стоп: глубокие надавливания и разогревающий бальзам. Воздействует на системы организма через рефлекторные точки стоп—точно и эффективно.',
      ka: 'თაილანდური რეფლექსოლოგია ფეხზე — ღრმა წნევა და გამათბობელი ბალზამი. მოქმედებს რეფლექსურ წერტილებზე და ხელს უწყობს საერთო ბალანსს.'
    },
    price: { he: '60 דק׳ – 140₾', en: '60 min – 140₾', ru: '60 мин – 140₾', ka: '60 წთ – 140₾' }
  }
};

// ===== תרגום כרטיסי הטיפולים על הדף (כולל tag) =====
function applyTreatmentTexts(lang) {
  // ✅ תומך גם בכרטיסי סליידר הדגל
  document.querySelectorAll('.product-card, .flagship-card').forEach((card) => {
    const btn = card.querySelector('[data-treatment-key]');
    if (!btn) return;

    const key = btn.getAttribute('data-treatment-key');
    const meta = TREATMENTS_META[key];
    if (!meta) return;

    const tagEl = card.querySelector('.tag');
    if (tagEl && meta.tag) {
      tagEl.textContent = meta.tag[lang] || meta.tag.he || tagEl.textContent;
    }

    const titleEl = card.querySelector('.product-title');
    if (titleEl && meta.name) {
      titleEl.textContent = meta.name[lang] || meta.name.he || titleEl.textContent;
    }

    // בכרטיסי הדגל יש class ייעודי לתיאור, ובכרטיסי grid נשאר כמו שהיה
    const descEl = card.querySelector('.flagship-desc') || card.querySelector('p:not(.price)');
    if (descEl && meta.desc) {
      descEl.textContent = meta.desc[lang] || meta.desc.he || descEl.textContent;
    }

    const priceEl = card.querySelector('.price');
    if (priceEl && meta.price) {
      priceEl.textContent = meta.price[lang] || meta.price.he || priceEl.textContent;
    }
  });
}

// ✅ תרגום "30/60/90" לכל השפות
function applyDurationLabels(lang) {
  const d = DURATION_I18N[lang] || DURATION_I18N.he;
  document.querySelectorAll('.duration-options span[data-min]').forEach((span) => {
    const m = Number(span.getAttribute('data-min') || '0');
    if (!m) return;
    span.textContent = d.fmt(m);
  });
}

// ===== חיבור כפתורי שפה (דגלים) =====
function setupLangButtons() {
  document.querySelectorAll('.lang-btn[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLang(lang);
    });
  });
}

// ===== כפתורי טיפולים → ווטסאפ =====
function setupTreatmentButtons() {
  const buttons = document.querySelectorAll('[data-book-btn]');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = getLang();
      const key = btn.getAttribute('data-treatment-key');
      const group = btn.getAttribute('data-radio-group');

      const meta = TREATMENTS_META[key] || {};
      const treatmentName =
        (meta.name && (meta.name[lang] || meta.name.he)) ||
        (btn.closest('.product-card, .flagship-card')?.querySelector('.product-title')?.textContent.trim() ?? 'Treatment');

      let duration = '';
      if (group) {
        const selectedSpan = document.querySelector(`input[name="${group}"]:checked + span`);
        if (selectedSpan) duration = selectedSpan.textContent.trim();
      }

      const template = WA_TEMPLATES_TREATMENT[lang] || WA_TEMPLATES_TREATMENT.he;
      const text = template
        .replace('{TREATMENT}', treatmentName)
        .replace('{DURATION}', duration || '');

      const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  });
}

// ===== Video Slider =====
function setupVideoSlider() {
  const slider = document.querySelector('.video-slider');
  if (!slider) return;

  const track = slider.querySelector('.video-slider__track');
  const slides = Array.from(slider.querySelectorAll('.video-slide'));
  if (!track || slides.length <= 1) return;

  const prevBtn = slider.querySelector('.video-slider__nav--prev');
  const nextBtn = slider.querySelector('.video-slider__nav--next');
  const dotsWrap = slider.querySelector('.video-slider__dots');
  const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.video-slider__dot')) : [];

  let index = 0;
  let timer = null;

  function pauseAllVideos() {
    slides.forEach((s) => {
      const v = s.querySelector('video');
      if (!v) return;
      try { v.pause(); } catch (_) {}
    });
  }

  async function playActiveVideo() {
    const active = slides[index];
    const v = active ? active.querySelector('video') : null;
    if (!v) return;
    try { await v.play(); } catch (_) {}
  }

  function setActiveDot() {
    if (!dots.length) return;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

function goTo(i) {
  const max = slides.length;
  index = (i + max) % max;

  // תמיד מזיזים שמאלה ב־100% לכל שקף
  track.style.transform = `translateX(${-index * 100}%)`;

  setActiveDot();
  pauseAllVideos();
  playActiveVideo();
}


  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAuto() {
    stopAuto();
    timer = window.setInterval(next, 5500);
  }

  function stopAuto() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

const isRTL = document.documentElement.dir === 'rtl';

if (prevBtn) prevBtn.addEventListener('click', () => {
  stopAuto();
  isRTL ? next() : prev();   // ✅ ב-RTL "שמאל" מתקדם קדימה
  startAuto();
});

if (nextBtn) nextBtn.addEventListener('click', () => {
  stopAuto();
  isRTL ? prev() : next();   // ✅ ב-RTL "ימין" חוזר אחורה
  startAuto();
});


  if (dots.length && dots.length === slides.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
    });
  }

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  goTo(0);
  startAuto();
}

// ===== Flagship Treatments Slider (responsive + works with variable widths) =====
function setupFlagshipSlider() {
  const viewport = document.getElementById('flagshipSlider'); // זה ה-viewport אצלך
  if (!viewport) return;

  const slider = viewport.closest('.flagship-slider') || viewport; // עוטף כדי למצוא חצים/דוטים תמיד
  const track = viewport.querySelector('.flagship-slider__track');
  const slides = Array.from(viewport.querySelectorAll('.flagship-slide'));
  if (!track || slides.length <= 1) return;

  const prevBtn = slider.querySelector('.flagship-slider__nav--prev');
  const nextBtn = slider.querySelector('.flagship-slider__nav--next');
  const dots = Array.from(slider.querySelectorAll('.flagship-slider__dot'));

  let index = 0;
  let timer = null;

  function setDots() {
    if (!dots.length) return;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  function goTo(i, smooth = true) {
    const max = slides.length;
    index = (i + max) % max;

    // ✅ רספונסיבי אמיתי: לא תלוי ב-100% ולא נשבר עם gap/רוחבים משתנים
    slides[index].scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      inline: 'center',
      block: 'nearest'
    });

    setDots();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAuto() {
    stopAuto();
    timer = window.setInterval(next, 6000);
  }

  function stopAuto() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  prevBtn?.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

  if (dots.length === slides.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
    });
  }

  // עצירה בהובר (בדסקטופ)
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  // מאפשר ריענון כשמשנים שפה / dir
  window.__flagshipSlider = { refresh: () => goTo(index, false) };

  goTo(0, false);
  startAuto();
}
// ===== Scroll reveal for treatment cards =====
function setupScrollReveal() {
  const cards = document.querySelectorAll('.product-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  cards.forEach((card) => observer.observe(card));
}
// ===== אתחול =====
document.addEventListener('DOMContentLoaded', () => {
  const lang = getLang();
  applyLang(lang);
  setupLangButtons();
  setupTreatmentButtons();
  setupVideoSlider();
  setupFlagshipSlider();
  setupScrollReveal(); // 🔥 זה מה שחסר
});