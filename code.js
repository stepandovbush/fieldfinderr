/* ── FIELDFINDER ─────────────────────────────────────────────────────────── */

/* ── QUICK CHIPS ─────────────────────────────────────────────────────────── */
document.querySelectorAll("#quickChips .lp-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.getElementById("obField").value = chip.dataset.field;
    launchApp();
  });
});

/* ---- FIELD DATASET ---------------------------------------------------- */
const FIELDS = {
  medicine: {
    label: "Medicine",
    aliases: ["medicine","med","medical","doctor","health","healthcare","nursing","nurse","pre-med","premed","biology","bio"],
    careers: [
      { name: "Physician", icon: "🩺", blurb: "Diagnose and treat illness within a specialty.",
        skills: ["Biology & anatomy","Chemistry","Clinical reasoning","Empathy & bedside manner","Communication","Resilience","Lifelong learning"] },
      { name: "Registered Nurse", icon: "💉", blurb: "Frontline patient care and coordination.",
        skills: ["Patient care","Anatomy & physiology","Attention to detail","Compassion","Time management","Medication knowledge","Teamwork"] },
      { name: "Surgeon", icon: "🔬", blurb: "Operate to repair, remove, and save lives.",
        skills: ["Manual dexterity","Deep anatomy","Decision-making","Stamina","Focus","Leadership","Calm under pressure"] },
      { name: "Medical Researcher", icon: "🧪", blurb: "Discover new treatments and cures.",
        skills: ["Scientific method","Statistics","Lab techniques","Critical reading","Scientific writing","Patience","Data analysis"] },
      { name: "Paramedic / EMT", icon: "🚑", blurb: "Emergency response when seconds count.",
        skills: ["Emergency assessment","CPR & first aid","Quick decisions","Physical fitness","Composure","Communication","Logistics"] },
      { name: "Pharmacist", icon: "💊", blurb: "Ensure safe and effective medication use.",
        skills: ["Pharmacology","Chemistry","Attention to detail","Communication","Drug interactions","Patient counseling","Ethics"] },
      { name: "Radiologist", icon: "🩻", blurb: "Diagnose disease through medical imaging.",
        skills: ["Anatomy","Image interpretation","Attention to detail","Technology skills","Communication","Critical thinking","Patience"] },
    ],
    opportunities: {
      highschool: {
        clubs: [
          { name: "HOSA – Future Health Professionals", desc: "The national club for students headed into health careers.", url: "https://hosa.org" },
          { name: "Red Cross Club", desc: "Run blood drives and health campaigns at your school.", url: "https://redcross.org" },
          { name: "Science National Honor Society", desc: "For students strong in the sciences.", url: "https://sciencenhs.org" },
        ],
        volunteering: [
          { name: "Hospital junior volunteer", desc: "Greet patients and help staff. Ages 14+.", url: "https://www.google.com/search?q=hospital+junior+volunteer+near+me" },
          { name: "Nursing home / hospice", desc: "Spend time with residents and assist caregivers.", url: "https://www.volunteermatch.org" },
          { name: "Red Cross Youth", desc: "Disaster prep, health, and CPR training programs.", url: "https://www.redcross.org/volunteer/volunteer-opportunities/youth-volunteer.html" },
        ],
        competitions: [
          { name: "HOSA competitive events", desc: "Compete in clinical and health-knowledge events nationally.", url: "https://hosa.org/competitive-events/" },
          { name: "Brain Bee", desc: "A neuroscience competition for high schoolers.", url: "https://thebrainbee.org" },
          { name: "Science Olympiad", desc: "Anatomy, disease, and lab events among 23 topics.", url: "https://www.soinc.org" },
        ],
      },
      college: {
        clubs: [
          { name: "Pre-Med Society", desc: "MCAT prep, advising, and a community of future doctors.", url: "https://www.google.com/search?q=pre-med+society" },
          { name: "AMSA", desc: "American Medical Student Association — the largest student org in medicine.", url: "https://www.amsa.org" },
          { name: "Campus EMS", desc: "Become an EMT and respond on campus.", url: "https://www.google.com/search?q=campus+EMS+program" },
        ],
        competitions: [
          { name: "MedHacks", desc: "A health-focused hackathon at Johns Hopkins.", url: "https://www.medhacks.io" },
          { name: "Research symposiums", desc: "Present your lab work and win awards.", url: "https://www.google.com/search?q=undergraduate+research+symposium" },
        ],
        internships: [
          { name: "NIH Summer Internship", desc: "Paid biomedical research at the National Institutes of Health.", url: "https://www.training.nih.gov/research-training/sip/" },
          { name: "Clinical research assistant", desc: "Support real trials at a hospital or university.", url: "https://www.google.com/search?q=clinical+research+assistant+internship" },
          { name: "Hospital internships", desc: "Shadow and assist across departments.", url: "https://www.google.com/search?q=hospital+college+internship" },
        ],
      },
    },
    recent: [
      { title: "Summer Medical Research Intern", org: "Memorial Sloan Kettering", loc: "New York, NY", date: "Jun 2026", url: "https://www.mskcc.org" },
      { title: "Emergency Dept Volunteer", org: "Hackensack Meridian Health", loc: "NJ", date: "Jun 2026", url: "https://www.hackensackmeridianhealth.org" },
      { title: "Pre-College Medicine Program", org: "Johns Hopkins", loc: "Baltimore, MD", date: "May 2026", url: "https://www.jhu.edu" },
    ],
  },

  statistics: {
    label: "Statistics & data",
    aliases: ["statistics","stats","stat","data","data science","data analytics","analytics","ml","machine learning"],
    careers: [
      { name: "Data Scientist", icon: "📊", blurb: "Turn raw data into decisions and predictions.",
        skills: ["Statistics","Python or R","Machine learning","SQL","Data visualization","Communication","Curiosity"] },
      { name: "Statistician", icon: "📈", blurb: "Design studies and reason about uncertainty.",
        skills: ["Probability & statistics","Experimental design","R / SAS","Critical thinking","Mathematics","Technical writing","Attention to detail"] },
      { name: "Data Analyst", icon: "🔢", blurb: "Find and explain the patterns hiding in data.",
        skills: ["Excel / Sheets","SQL","Data visualization","Statistics basics","Storytelling","Business sense","Attention to detail"] },
      { name: "Machine Learning Engineer", icon: "🤖", blurb: "Build systems that learn from data.",
        skills: ["Python","Linear algebra","ML frameworks","Software engineering","Statistics","Problem solving","Mathematics"] },
      { name: "Actuary", icon: "💹", blurb: "Measure and price risk for insurers and firms.",
        skills: ["Probability","Calculus","Excel","Business knowledge","Exam discipline","Communication","Attention to detail"] },
    ],
    opportunities: {
      highschool: {
        clubs: [
          { name: "Data Science / Coding Club", desc: "Build projects and learn tools together.", url: "https://www.google.com/search?q=high+school+data+science+club" },
          { name: "Math Club / Mu Alpha Theta", desc: "The math honor society — sharpen the foundation.", url: "https://mualphatheta.org" },
        ],
        volunteering: [
          { name: "Tutor math & stats", desc: "Help younger students; teaching cements your own skills.", url: "https://www.google.com/search?q=volunteer+math+tutor" },
          { name: "Data for nonprofits", desc: "Help a local cause analyze its data.", url: "https://www.volunteermatch.org/search?k=data" },
        ],
        competitions: [
          { name: "ASA Statistics Project Competition", desc: "Run a real statistical study and submit it.", url: "https://www.amstat.org/education/asa-datafest" },
          { name: "Kaggle competitions", desc: "Compete on real datasets — free and open to all.", url: "https://www.kaggle.com/competitions" },
          { name: "AMC / Math Olympiad", desc: "Build the math chops every data role needs.", url: "https://maa.org/math-competitions" },
        ],
      },
      college: {
        clubs: [
          { name: "Data Science Society", desc: "Workshops, projects, and recruiting connections.", url: "https://www.google.com/search?q=university+data+science+society" },
          { name: "Statistics Club", desc: "Talks, competitions, and consulting projects.", url: "https://www.google.com/search?q=university+statistics+club" },
        ],
        competitions: [
          { name: "ASA DataFest", desc: "48-hour analysis of a real, surprise dataset.", url: "https://ww2.amstat.org/education/datafest/" },
          { name: "Citadel Data Open", desc: "Datathons with cash prizes and recruiting.", url: "https://www.citadel.com/careers/students/the-data-open/" },
          { name: "Kaggle competitions", desc: "Climb the global leaderboard on real problems.", url: "https://www.kaggle.com/competitions" },
        ],
        internships: [
          { name: "Data analyst internships", desc: "Apply at companies of every size and industry.", url: "https://www.google.com/search?q=data+analyst+internship" },
          { name: "Big-tech data internships", desc: "Google, Meta, and others run summer data programs.", url: "https://www.google.com/search?q=data+science+internship+summer" },
          { name: "Research assistant", desc: "Work with a professor on real statistical research.", url: "https://www.google.com/search?q=undergraduate+research+assistant+statistics" },
        ],
      },
    },
    recent: [
      { title: "Data Analyst Intern (Summer)", org: "Spotify", loc: "Remote / NYC", date: "Jun 2026", url: "https://www.lifeatspotify.com" },
      { title: "ML Research Assistant", org: "Stanford AI Lab", loc: "Stanford, CA", date: "Jun 2026", url: "https://ai.stanford.edu" },
      { title: "High School Data Bootcamp", org: "Inspirit AI", loc: "Online", date: "May 2026", url: "https://www.inspiritai.com" },
    ],
  },

  cs: {
    label: "Computer science",
    aliases: ["computer science","cs","coding","software","programming","tech","computer","it","web","cyber","cybersecurity"],
    careers: [
      { name: "Software Engineer", icon: "💻", blurb: "Build the apps, tools, and systems people use daily.",
        skills: ["Programming","Data structures & algorithms","Problem solving","Git & version control","System design","Debugging","Collaboration"] },
      { name: "Web Developer", icon: "🌐", blurb: "Build websites and web applications.",
        skills: ["HTML & CSS","JavaScript","A framework (React)","APIs","Responsive design","Git","UX sense"] },
      { name: "Cybersecurity Analyst", icon: "🔐", blurb: "Defend systems and data from attacks.",
        skills: ["Networking","Operating systems","Security concepts","Scripting","Attention to detail","Ethics","Continuous learning"] },
      { name: "Mobile Developer", icon: "📱", blurb: "Build iOS and Android apps.",
        skills: ["Swift or Kotlin","UI design","APIs","Debugging","Performance tuning","Git","Patience"] },
      { name: "Game Developer", icon: "🎮", blurb: "Create interactive games and worlds.",
        skills: ["Programming","A game engine (Unity)","Math & physics","Creativity","Art & design sense","Optimization","Persistence"] },
      { name: "AI / ML Engineer", icon: "🤖", blurb: "Build intelligent systems powered by machine learning.",
        skills: ["Python","Linear algebra","Machine learning frameworks","Data pipelines","Statistics","Problem solving","Research skills"] },
    ],
    opportunities: {
      highschool: {
        clubs: [
          { name: "Coding Club / CS club", desc: "Build projects and learn languages together.", url: "https://www.google.com/search?q=high+school+coding+club" },
          { name: "FIRST Robotics", desc: "Design, build, and program competition robots.", url: "https://www.firstinspires.org" },
          { name: "Girls Who Code", desc: "Free clubs and summer programs, no experience needed.", url: "https://girlswhocode.com" },
        ],
        volunteering: [
          { name: "Teach coding (Code.org)", desc: "Volunteer to introduce younger kids to code.", url: "https://code.org/volunteer" },
          { name: "Library / senior tech help", desc: "Help people with devices and software.", url: "https://www.volunteermatch.org/search?k=technology" },
        ],
        competitions: [
          { name: "Congressional App Challenge", desc: "Build an app, get recognized by Congress. Free.", url: "https://www.congressionalappchallenge.us" },
          { name: "USACO", desc: "The USA Computing Olympiad — competitive programming.", url: "https://usaco.org" },
          { name: "CyberPatriot", desc: "National youth cyber defense competition.", url: "https://www.uscyberpatriot.org" },
        ],
      },
      college: {
        clubs: [
          { name: "ACM chapter", desc: "The computing society — talks, projects, contests.", url: "https://www.acm.org/chapters/students" },
          { name: "Hackathon club", desc: "Build and travel to hackathons as a team.", url: "https://mlh.io" },
          { name: "Open-source club", desc: "Contribute to real projects used worldwide.", url: "https://github.com" },
        ],
        competitions: [
          { name: "ICPC", desc: "The premier collegiate competitive-programming contest.", url: "https://icpc.global" },
          { name: "MLH Hackathons", desc: "Hundreds of student hackathons year-round.", url: "https://mlh.io/seasons" },
          { name: "CTF competitions", desc: "Capture-the-flag security challenges.", url: "https://ctftime.org" },
        ],
        internships: [
          { name: "SWE internships", desc: "Apply broadly — startups to big tech.", url: "https://www.google.com/search?q=software+engineering+internship" },
          { name: "Google STEP", desc: "Internship for first- and second-year students.", url: "https://buildyourfuture.withgoogle.com/programs/step" },
          { name: "Microsoft Explore", desc: "12-week program for early undergrads.", url: "https://careers.microsoft.com/students" },
        ],
      },
    },
    recent: [
      { title: "Software Engineering Intern", org: "Stripe", loc: "Remote", date: "Jun 2026", url: "https://stripe.com/jobs" },
      { title: "Cyber Defense Summer Camp", org: "GenCyber", loc: "Multiple (US)", date: "Jun 2026", url: "https://www.gen-cyber.com" },
      { title: "Frontend Dev Intern", org: "Figma", loc: "San Francisco, CA", date: "May 2026", url: "https://www.figma.com/careers/" },
    ],
  },

  business: {
    label: "Business",
    aliases: ["business","marketing","finance","management","economics","econ","entrepreneur","commerce","accounting"],
    careers: [
      { name: "Marketing Manager", icon: "📣", blurb: "Grow brands and reach the right audience.",
        skills: ["Communication","Creativity","Data & analytics","Social media","Storytelling","Strategy","Empathy"] },
      { name: "Financial Analyst", icon: "💰", blurb: "Guide money decisions with numbers.",
        skills: ["Excel","Accounting","Statistics","Attention to detail","Business sense","Communication","Financial modeling"] },
      { name: "Management Consultant", icon: "🧩", blurb: "Solve companies' hardest problems.",
        skills: ["Problem solving","Communication","Data analysis","Presentation","Adaptability","Teamwork","Business acumen"] },
      { name: "Entrepreneur", icon: "🚀", blurb: "Build a business from a problem you've lived.",
        skills: ["Spotting problems","Selling & pitching","Resourcefulness","Basic finance","Resilience","Leadership","Building MVPs"] },
      { name: "Product Manager", icon: "📦", blurb: "Decide what gets built and why.",
        skills: ["Communication","Prioritization","User empathy","Data literacy","Technical literacy","Leadership","Strategy"] },
    ],
    opportunities: {
      highschool: {
        clubs: [
          { name: "DECA", desc: "Marketing, finance, and business competitions worldwide.", url: "https://www.deca.org" },
          { name: "FBLA", desc: "Future Business Leaders of America.", url: "https://www.fbla.org" },
          { name: "Junior Achievement", desc: "Hands-on business and money programs.", url: "https://www.juniorachievement.org" },
        ],
        volunteering: [
          { name: "Nonprofit fundraising", desc: "Run a campaign and learn real marketing.", url: "https://www.volunteermatch.org/search?k=fundraising" },
          { name: "Treasurer for a club", desc: "Manage a budget — real finance experience.", url: "https://www.google.com/search?q=student+club+treasurer" },
        ],
        competitions: [
          { name: "DECA ICDC", desc: "The international career development conference.", url: "https://www.deca.org/competitions" },
          { name: "Diamond Challenge", desc: "A global high-school entrepreneurship competition.", url: "https://diamondchallenge.org" },
          { name: "FBLA competitive events", desc: "Compete across 70+ business topics.", url: "https://www.fbla.org/high-school/competitive-events/" },
        ],
      },
      college: {
        clubs: [
          { name: "Consulting club", desc: "Take on real client projects with peers.", url: "https://www.google.com/search?q=university+consulting+club" },
          { name: "Investment club", desc: "Manage a portfolio and learn markets.", url: "https://www.google.com/search?q=university+investment+club" },
          { name: "Entrepreneurship club", desc: "Pitch nights, founders, and startup resources.", url: "https://www.google.com/search?q=university+entrepreneurship+club" },
        ],
        competitions: [
          { name: "Case competitions", desc: "Solve a business case under time pressure.", url: "https://www.google.com/search?q=college+case+competition" },
          { name: "Business plan / pitch comps", desc: "Win funding for your startup idea.", url: "https://www.google.com/search?q=college+business+plan+competition" },
        ],
        internships: [
          { name: "BofA Student Leaders", desc: "PAID nonprofit internship + D.C. leadership summit.", url: "https://about.bankofamerica.com/en/making-an-impact/student-leaders" },
          { name: "Marketing / finance internships", desc: "Apply across industries every spring.", url: "https://www.google.com/search?q=marketing+finance+internship" },
          { name: "Startup internships", desc: "Wear many hats at an early-stage company.", url: "https://www.ycombinator.com/jobs" },
        ],
      },
    },
    recent: [
      { title: "Marketing Intern", org: "HubSpot", loc: "Remote", date: "Jun 2026", url: "https://www.hubspot.com/careers" },
      { title: "Finance Summer Analyst", org: "JPMorgan Chase", loc: "New York, NY", date: "May 2026", url: "https://careers.jpmorgan.com" },
      { title: "Teen Entrepreneurship Summit", org: "Diamond Challenge", loc: "Online", date: "Jun 2026", url: "https://diamondchallenge.org" },
    ],
  },

  law: {
    label: "Law & policy",
    aliases: ["law","legal","lawyer","attorney","policy","politics","government","pre-law","prelaw","political science"],
    careers: [
      { name: "Lawyer", icon: "⚖️", blurb: "Advise clients and advocate in and out of court.",
        skills: ["Argument & logic","Legal research","Persuasive writing","Public speaking","Close reading","Ethics","Negotiation"] },
      { name: "Paralegal", icon: "📑", blurb: "Power the legal work behind the scenes.",
        skills: ["Research","Organization","Writing","Attention to detail","Legal terminology","Software","Discretion"] },
      { name: "Policy Analyst", icon: "🏛️", blurb: "Shape the laws and rules people live by.",
        skills: ["Research","Data analysis","Writing","Economics","Communication","Critical thinking","Patience"] },
      { name: "Judge", icon: "👩‍⚖️", blurb: "Interpret the law and decide cases fairly.",
        skills: ["Deep legal knowledge","Impartiality","Judgment","Writing","Listening","Integrity","Decisiveness"] },
    ],
    opportunities: {
      highschool: {
        clubs: [
          { name: "Mock Trial", desc: "Argue real cases as attorneys and witnesses.", url: "https://www.nationalmocktrial.org" },
          { name: "Debate team", desc: "Build argument and public-speaking skills.", url: "https://www.speechanddebate.org" },
          { name: "Model UN", desc: "Debate global issues and draft resolutions.", url: "https://www.unausa.org/model-un/" },
        ],
        volunteering: [
          { name: "Court watch programs", desc: "Observe real proceedings and report on fairness.", url: "https://www.google.com/search?q=court+watch+volunteer" },
          { name: "Community advocacy", desc: "Help a local cause organize and petition.", url: "https://www.volunteermatch.org/search?k=advocacy" },
        ],
        competitions: [
          { name: "National Mock Trial Championship", desc: "Compete against the best teams in the country.", url: "https://www.nationalmocktrial.org" },
          { name: "We the People", desc: "A constitutional knowledge competition.", url: "https://www.civiced.org/wtp-the-program" },
          { name: "Model UN conferences", desc: "Win awards at regional and national conferences.", url: "https://www.unausa.org/model-un/" },
        ],
      },
      college: {
        clubs: [
          { name: "Pre-Law Society", desc: "LSAT prep, advising, and law-school connections.", url: "https://www.google.com/search?q=pre-law+society" },
          { name: "Moot Court", desc: "Argue appellate cases before mock judges.", url: "https://www.google.com/search?q=undergraduate+moot+court" },
          { name: "Model UN", desc: "Continue competing at the college level.", url: "https://www.unausa.org/model-un/" },
        ],
        competitions: [
          { name: "Moot court tournaments", desc: "Compete in appellate advocacy nationally.", url: "https://www.google.com/search?q=undergraduate+moot+court+competition" },
          { name: "Negotiation competitions", desc: "Test your deal-making against other schools.", url: "https://www.google.com/search?q=college+negotiation+competition" },
        ],
        internships: [
          { name: "Law firm internships", desc: "Support attorneys and learn the craft.", url: "https://www.google.com/search?q=law+firm+college+internship" },
          { name: "Legislative intern", desc: "Work in a representative's office.", url: "https://www.google.com/search?q=legislative+internship+student" },
          { name: "Public defender / DA office", desc: "See the justice system up close.", url: "https://www.google.com/search?q=public+defender+internship" },
        ],
      },
    },
    recent: [
      { title: "Legal Intern", org: "ACLU", loc: "Multiple (US)", date: "Jun 2026", url: "https://www.aclu.org/careers" },
      { title: "Congressional Summer Intern", org: "U.S. House of Representatives", loc: "Washington, DC", date: "May 2026", url: "https://www.house.gov/employment" },
      { title: "Youth Justice Summit", org: "Model UN (NHSMUN)", loc: "New York, NY", date: "Jun 2026", url: "https://www.nhsmun.org" },
    ],
  },

  engineering: {
    label: "Engineering",
    aliases: ["engineering","engineer","mechanical","electrical","civil","aerospace","robotics","biomedical"],
    careers: [
      { name: "Mechanical Engineer", icon: "⚙️", blurb: "Design machines, engines, and moving systems.",
        skills: ["Physics","Calculus","CAD","Problem solving","Materials science","Teamwork","Hands-on building"] },
      { name: "Civil Engineer", icon: "🏗️", blurb: "Build the bridges, roads, and structures we rely on.",
        skills: ["Physics","Mathematics","CAD","Project management","Materials","Communication","Safety mindset"] },
      { name: "Electrical Engineer", icon: "🔌", blurb: "Design circuits, electronics, and power systems.",
        skills: ["Circuit theory","Mathematics","Programming","Problem solving","Lab skills","CAD","Attention to detail"] },
      { name: "Aerospace Engineer", icon: "🚀", blurb: "Design aircraft, rockets, and spacecraft.",
        skills: ["Physics","Calculus","Aerodynamics","CAD","Programming","Teamwork","Precision"] },
      { name: "Biomedical Engineer", icon: "🦾", blurb: "Engineer devices that improve human health.",
        skills: ["Biology","Engineering fundamentals","Mathematics","Programming","Problem solving","Lab skills","Empathy"] },
    ],
    opportunities: {
      highschool: {
        clubs: [
          { name: "FIRST Robotics", desc: "Design and build competition robots in a team.", url: "https://www.firstinspires.org" },
          { name: "Science Olympiad", desc: "Engineering build events from towers to vehicles.", url: "https://www.soinc.org" },
          { name: "Technology Student Association", desc: "STEM competitions and leadership.", url: "https://tsaweb.org" },
        ],
        volunteering: [
          { name: "STEM mentoring", desc: "Help younger students build and tinker.", url: "https://www.volunteermatch.org/search?k=STEM" },
          { name: "Habitat for Humanity", desc: "Hands-on building experience for the community.", url: "https://www.habitat.org/volunteer" },
        ],
        competitions: [
          { name: "FIRST Robotics Competition", desc: "Regional and world championships.", url: "https://www.firstinspires.org/robotics/frc" },
          { name: "MATHCOUNTS", desc: "Build the math foundation engineering needs.", url: "https://www.mathcounts.org" },
          { name: "Science & Engineering Fair", desc: "Compete locally up to ISEF, the world's largest.", url: "https://www.societyforscience.org/isef/" },
        ],
      },
      college: {
        clubs: [
          { name: "ASME / IEEE / SAE", desc: "The professional engineering student societies.", url: "https://www.asme.org" },
          { name: "Formula SAE team", desc: "Design and race a real formula-style car.", url: "https://www.sae.org/attend/student-events" },
          { name: "Rocketry / robotics team", desc: "Build hardware that flies or moves.", url: "https://www.google.com/search?q=university+rocketry+team" },
        ],
        competitions: [
          { name: "Formula SAE", desc: "International collegiate design competition.", url: "https://www.fsaeonline.com" },
          { name: "NASA student challenges", desc: "Design real systems for space missions.", url: "https://www.nasa.gov/learning-resources/" },
        ],
        internships: [
          { name: "Engineering co-ops", desc: "Alternate semesters of paid work and study.", url: "https://www.google.com/search?q=engineering+co-op" },
          { name: "NASA internships", desc: "Work on real aerospace and research projects.", url: "https://intern.nasa.gov" },
          { name: "Manufacturer internships", desc: "Apply at firms like Boeing, GE, and Tesla.", url: "https://www.google.com/search?q=mechanical+engineering+internship" },
        ],
      },
    },
    recent: [
      { title: "Mechanical Engineering Intern", org: "Tesla", loc: "Fremont, CA", date: "Jun 2026", url: "https://www.tesla.com/careers" },
      { title: "NASA OSTEM Internship", org: "NASA", loc: "Multiple (US)", date: "Jun 2026", url: "https://intern.nasa.gov" },
      { title: "High School Engineering Camp", org: "MIT Beaver Works", loc: "Cambridge, MA", date: "May 2026", url: "https://beaverworks.ll.mit.edu" },
    ],
  },
};

const CATEGORY_META = {
  clubs: { label: "Clubs & orgs" },
  volunteering: { label: "Volunteering" },
  competitions: { label: "Competitions" },
  internships: { label: "Internships" },
};
const STAGE_ORDER = {
  middleschool: ["clubs", "volunteering", "competitions"],
  highschool: ["clubs", "volunteering", "competitions"],
  college: ["clubs", "competitions", "internships"],
  graduate: ["internships", "clubs", "competitions"],
};
const STAGE_TEXT = {
  middleschool: "middle school",
  highschool: "high school",
  college: "college",
  graduate: "graduate",
};
const NEED_FALLBACK = {
  middleschool: ["Explore broadly — no pressure to choose yet", "Build solid study habits early", "Join one club that sounds fun"],
  highschool: ["Keep your GPA strong in related classes", "Join clubs and competitions in this field", "Start volunteering to build real experience"],
  college: ["Pick relevant courses and declare a major", "Land an internship or research role", "Build a portfolio of real work"],
  graduate: ["Deepen expertise through original research", "Network at professional conferences", "Target fellowships and entry-level positions"],
};

/* ── UTILITIES ─────────────────────────────────────────────────────────── */
const API_BASE = "http://localhost:8000";

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s == null ? "" : String(s);
  return d.innerHTML;
}

async function fetchJSON(path, body) {
  const r = await fetch(API_BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error("HTTP " + r.status);
  return r.json();
}

function oppStamp(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const daysAgo = (h % 40) + 1;
  const d = new Date(2026, 5, 25);
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function stageForAge(age) {
  if (age <= 13) return "middleschool";
  if (age <= 17) return "highschool";
  if (age <= 22) return "college";
  return "graduate";
}

function resolveField(text) {
  const t = text.trim().toLowerCase();
  if (!t) return null;
  for (const [id, f] of Object.entries(FIELDS)) {
    if (f.label.toLowerCase() === t) return id;
    if (f.aliases.some(a => a === t)) return id; // exact match only — no substrings
  }
  return null;
}

/* ── STATE ─────────────────────────────────────────────────────────────── */
let stage = "highschool";
let currentAge = 16;
let currentFieldId = null;
let currentFieldLabel = "";
let currentCareer = null;
let resumeContext = "";  // stored for chatbot

/* ── PANEL CACHE ── skip re-fetching when revisiting the same panel ────── */
let panelCache = {};
const _ck = (p) => `${p}|${currentFieldLabel}|${currentCareer ? currentCareer.name : ""}|${stage}`;

function fieldLabel() {
  return currentFieldLabel; // always use exactly what the user typed
}

/* ── ONBOARDING ─────────────────────────────────────────────────────────── */
const obField = document.getElementById("obField");
const obSugg = document.getElementById("obSugg");
const obAge = document.getElementById("obAge");
const obStageTag = document.getElementById("obStageTag");
const obError = document.getElementById("obError");


// Age → stage tag
obAge.addEventListener("input", () => {
  const age = parseInt(obAge.value) || 16;
  obStageTag.textContent = STAGE_TEXT[stageForAge(age)] || "high school";
});

// Autocomplete in onboarding
obField.addEventListener("input", function () {
  const t = this.value.trim().toLowerCase();
  if (!t) { obSugg.hidden = true; return; }
  const matches = Object.entries(FIELDS).filter(([, f]) =>
    f.label.toLowerCase().includes(t) || f.aliases.some(a => a.includes(t) || t.includes(a))
  );
  if (!matches.length) { obSugg.hidden = true; return; }
  obSugg.hidden = false;
  obSugg.innerHTML = matches.slice(0, 5).map(([id, f]) =>
    `<div class="sugg-item" data-id="${id}">${esc(f.label)}</div>`
  ).join("");
  obSugg.querySelectorAll(".sugg-item").forEach(item => {
    item.addEventListener("mousedown", e => {
      e.preventDefault();
      obField.value = FIELDS[item.dataset.id].label;
      obSugg.hidden = true;
    });
  });
});
obField.addEventListener("blur", () => setTimeout(() => { obSugg.hidden = true; }, 150));
obField.addEventListener("keydown", e => { if (e.key === "Enter") launchApp(); });

document.getElementById("obGo").addEventListener("click", launchApp);

async function launchApp() {
  const text = obField.value.trim();
  if (!text) { obError.hidden = false; return; }
  obError.hidden = true;

  currentAge = parseInt(obAge.value) || 16;
  stage = stageForAge(currentAge);
  currentCareer = null;
  panelCache = {};

  // AI interprets what the user typed → clean field name
  const btn = document.getElementById("obGo");
  const origText = btn.textContent;
  btn.textContent = "Understanding your field…";
  btn.disabled = true;

  try {
    const d = await fetchJSON("/api/interpret-field", { text });
    currentFieldLabel = (d.field || text).trim();
    // show the AI's interpretation back in the input so user sees what was understood
    obField.value = currentFieldLabel;
    if (d.tagline) {
      document.getElementById("obSub") && (document.getElementById("obSub").textContent = d.tagline);
    }
  } catch {
    // backend down — just use raw input
    currentFieldLabel = text;
  }

  currentFieldId = resolveField(currentFieldLabel);
  btn.textContent = origText;
  btn.disabled = false;

  // hide onboarding, show app
  document.getElementById("onboarding").style.display = "none";
  const app = document.getElementById("app");
  app.hidden = false;

  // update nav
  document.getElementById("fpField").textContent = fieldLabel();
  document.getElementById("stagePill").textContent = STAGE_TEXT[stage];
  updateStageToggle();

  // load careers panel
  showPanel("careers");
  loadCareerPanel();
}

// Field pill → return to onboarding
document.getElementById("fieldPill").addEventListener("click", () => {
  document.getElementById("app").hidden = true;
  document.getElementById("onboarding").style.display = "";
  obField.value = fieldLabel();
  obField.focus();
});

/* ── PANEL NAVIGATION ───────────────────────────────────────────────────── */
function showPanel(name) {
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".sid").forEach(b => b.classList.remove("active"));
  const panel = document.getElementById("panel-" + name);
  if (panel) panel.classList.add("active");
  const btn = document.querySelector(`.sid[data-panel="${name}"]`);
  if (btn) btn.classList.add("active");
  // scroll panels area to top
  const panels = document.querySelector(".panels");
  if (panels) panels.scrollTop = 0;
}

document.querySelector(".side-nav").addEventListener("click", e => {
  const btn = e.target.closest(".sid");
  if (!btn) return;
  const name = btn.dataset.panel;
  showPanel(name);
  if (name === "careers") loadCareerPanel();
  else if (name === "courses") loadCoursesPanel();
  else if (name === "opportunities") loadOpportunitiesPanel();
  else if (name === "salary") loadSalaryPanel();
  else if (name === "skills") loadSkillsPanel();
  else if (name === "scholarships") loadScholarshipsPanel();
  else if (name === "roadmap") loadRoadmapPanel();
});

/* ── STAGE TOGGLE ───────────────────────────────────────────────────────── */
function updateStageToggle() {
  document.querySelectorAll("#stageToggle button").forEach(b => {
    b.classList.toggle("active", b.dataset.stage === stage);
  });
}

document.querySelectorAll("#stageToggle button").forEach(btn => {
  btn.addEventListener("click", () => {
    stage = btn.dataset.stage;
    document.getElementById("stagePill").textContent = STAGE_TEXT[stage];
    updateStageToggle();
    // reload whichever panel is active
    const active = document.querySelector(".panel.active");
    if (!active) return;
    const name = active.id.replace("panel-", "");
    if (name === "courses") loadCoursesPanel();
    else if (name === "opportunities") loadOpportunitiesPanel();
    else if (name === "salary") loadSalaryPanel();
    else if (name === "skills") loadSkillsPanel();
    else if (name === "scholarships") loadScholarshipsPanel();
    else if (name === "roadmap") loadRoadmapPanel();
  });
});

/* ── CAREER PANEL ───────────────────────────────────────────────────────── */
function loadCareerPanel() {
  const label = fieldLabel();
  document.getElementById("panelFieldName").textContent = label;
  const grid = document.getElementById("careerGrid");

  const key = _ck("careers");
  if (panelCache[key]) {
    grid.innerHTML = "";
    panelCache[key].forEach(c => addCareerCard(grid, c));
    return;
  }

  grid.innerHTML = `<div class="opp-loading loading-pulse">Finding every career in <b>${esc(label)}</b>…</div>`;
  fetchJSON("/api/careers", { field: label, age: currentAge })
    .then(d => {
      grid.innerHTML = "";
      const careers = d.careers || [];
      careers.forEach(c => addCareerCard(grid, c));
      if (!grid.children.length)
        grid.innerHTML = `<div class="opp-empty">No careers found for "${esc(label)}".</div>`;
      panelCache[_ck("careers")] = careers;
    })
    .catch(() => {
      grid.innerHTML = "";
      const fallback = currentFieldId ? FIELDS[currentFieldId].careers : [];
      if (fallback.length) {
        fallback.forEach(c => addCareerCard(grid, c));
        // don't cache fallback — retry from API next visit
      } else {
        grid.innerHTML = `<div class="opp-empty">No careers found for "${esc(fieldLabel())}". Try a different field name.</div>`;
      }
    });
}

function addCareerCard(grid, c) {
  const card = document.createElement("div");
  card.className = "career-card";
  if (currentCareer && currentCareer.name === c.name) card.classList.add("active-card");
  card.innerHTML = `
    <h3>${esc(c.name)}</h3>
    <p>${esc(c.blurb || "")}</p>`;
  card.addEventListener("click", () => {
    currentCareer = c;
    // highlight selected
    document.querySelectorAll(".career-card").forEach(el => el.classList.remove("active-card"));
    card.classList.add("active-card");
    // show sidebar career box
    document.getElementById("sideCareerBox").hidden = false;
    document.getElementById("sideCareerName").textContent = c.name;
    // reload any open panels that depend on career
    const active = document.querySelector(".panel.active");
    const name = active ? active.id.replace("panel-", "") : "";
    if (name === "courses") loadCoursesPanel();
    else if (name === "opportunities") loadOpportunitiesPanel();
    else if (name === "salary") loadSalaryPanel();
    else if (name === "skills") loadSkillsPanel();
    else if (name === "roadmap") loadRoadmapPanel();
  });
  grid.appendChild(card);
}

document.getElementById("sideCareerClear").addEventListener("click", () => {
  currentCareer = null;
  document.getElementById("sideCareerBox").hidden = true;
  document.querySelectorAll(".career-card").forEach(el => el.classList.remove("active-card"));
});

/* ── COURSES PANEL ──────────────────────────────────────────────────────── */
function loadCoursesPanel() {
  const el = document.getElementById("classGroups");
  const sub = document.getElementById("coursesSubtitle");
  const careerName = currentCareer ? currentCareer.name : null;
  sub.textContent = careerName
    ? `AP & IB classes for ${careerName} (${STAGE_TEXT[stage]})`
    : `AP & IB classes for ${fieldLabel()} (${STAGE_TEXT[stage]})`;

  const key = _ck("courses");
  if (panelCache[key]) { el.innerHTML = panelCache[key]; return; }

  el.innerHTML = `<div class="opp-loading loading-pulse">Loading suggested courses…</div>`;
  fetchJSON("/api/classes", { field: fieldLabel(), career: careerName || "", stage, age: currentAge })
    .then(d => {
      const parts = [
        classGroupHTML("Core classes", d.core, "", [
          { label: "Khan Academy", url: "https://www.khanacademy.org" },
          { label: "MIT OpenCourseWare", url: "https://ocw.mit.edu" },
        ]),
        classGroupHTML("AP courses", d.ap, "ap", [
          { label: "Khan Academy AP prep", url: "https://www.khanacademy.org/ap" },
          { label: "AP Classroom (College Board)", url: "https://apclassroom.collegeboard.org" },
          { label: "Fiveable", url: "https://fiveable.me" },
        ]),
        classGroupHTML("IB courses", d.ib, "ib", [
          { label: "IBO official resources", url: "https://www.ibo.org/programmes/diploma-programme/" },
          { label: "Revision Village (IB Math & Science)", url: "https://www.revisionvillage.com" },
          { label: "Fiveable IB", url: "https://fiveable.me" },
        ]),
        classGroupHTML("Useful electives", d.electives, "", [
          { label: "Coursera", url: "https://www.coursera.org" },
          { label: "edX", url: "https://www.edx.org" },
          { label: "Khan Academy", url: "https://www.khanacademy.org" },
        ]),
      ].join("");
      el.innerHTML = parts || `<div class="opp-empty">No courses found. Check that the backend is running.</div>`;
      panelCache[_ck("courses")] = el.innerHTML;
    })
    .catch(() => {
      el.innerHTML = `<div class="opp-empty">Start the backend (localhost:8000) to load suggested AP/IB classes.</div>`;
    });
}

function classGroupHTML(label, items, tagClass, resources) {
  if (!items || !items.length) return "";
  const cards = items.map(it => {
    const name = typeof it === "string" ? it : (it.name || "");
    const note = typeof it === "object" ? (it.note || "") : "";
    return `<div class="class-item">
      <span class="class-tag ${tagClass}">${esc(name)}</span>
      ${note ? `<p class="class-note">${esc(note)}</p>` : ""}
    </div>`;
  }).join("");
  const resHTML = resources && resources.length
    ? `<div class="class-resources">
        <span class="class-resources-label">Study resources</span>
        ${resources.map(r => `<a class="resource-link" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.label)} ↗</a>`).join("")}
       </div>`
    : "";
  return `<div class="class-group"><h3>${esc(label)}</h3><div class="class-item-list">${cards}</div>${resHTML}</div>`;
}

/* ── OPPORTUNITIES PANEL ────────────────────────────────────────────────── */
function loadOpportunitiesPanel() {
  const careerName = currentCareer ? currentCareer.name : null;
  document.getElementById("oppStageNote").textContent = `· ${STAGE_TEXT[stage]}`;
  const needList = document.getElementById("needList");
  const sections = document.getElementById("oppSections");
  const feed = document.getElementById("recentFeed");

  const key = _ck("opportunities");
  if (panelCache[key]) {
    needList.innerHTML = panelCache[key].needList;
    sections.innerHTML = panelCache[key].sections;
    feed.innerHTML = panelCache[key].feed;
    return;
  }

  needList.innerHTML = `<li class="loading-pulse" style="padding:12px 16px">Loading…</li>`;
  sections.innerHTML = `<div class="opp-loading loading-pulse">Finding opportunities…</div>`;
  feed.innerHTML = "";

  fetchJSON("/api/opportunities", { field: fieldLabel(), career: careerName || "", stage, age: currentAge })
    .then(d => {
      needList.innerHTML = (d.need_to_know || []).map(n => `<li>${esc(n)}</li>`).join("")
        || (NEED_FALLBACK[stage] || []).map(n => `<li>${esc(n)}</li>`).join("");
      sections.innerHTML = (d.groups || []).map(g => oppGroupHTML(g.category, g.items)).join("")
        || `<div class="opp-empty">No opportunities returned.</div>`;
      renderRecentFeed(feed);
      panelCache[_ck("opportunities")] = { needList: needList.innerHTML, sections: sections.innerHTML, feed: feed.innerHTML };
    })
    .catch(() => {
      needList.innerHTML = (NEED_FALLBACK[stage] || []).map(n => `<li>${esc(n)}</li>`).join("");
      renderCuratedOpps(sections);
      renderRecentFeed(feed);
    });
}

function oppGroupHTML(category, items) {
  if (!items || !items.length) return "";
  const cards = items.map(o => `
    <div class="opp-card">
      <h4>${esc(o.name || o.title || "")}</h4>
      <p>${esc(o.desc || o.blurb || "")}</p>
      ${o.url ? `<a href="${esc(o.url)}" target="_blank" rel="noopener" style="font-size:.8rem;color:var(--blue);font-weight:600;margin-top:8px;display:inline-block">Learn more ↗</a>` : ""}
    </div>`).join("");
  return `<div class="opp-section">
    <div class="opp-section-title">${esc(category)}</div>
    <div class="opp-grid">${cards}</div>
  </div>`;
}

function renderCuratedOpps(sections) {
  const f = currentFieldId ? FIELDS[currentFieldId] : null;
  const mappedStage = (stage === "middleschool") ? "highschool" : (stage === "graduate" ? "college" : stage);
  const order = STAGE_ORDER[stage] || STAGE_ORDER.highschool;
  if (!f || !f.opportunities?.[mappedStage]) {
    sections.innerHTML = `<div class="opp-empty">Start the backend (localhost:8000) for personalised opportunities.</div>`;
    return;
  }
  const opp = f.opportunities[mappedStage];
  sections.innerHTML = order.map(cat => oppGroupHTML(CATEGORY_META[cat].label, opp[cat] || [])).join("");
}

function renderRecentFeed(feed) {
  const f = currentFieldId ? FIELDS[currentFieldId] : null;
  const recent = f ? (f.recent || []) : [];
  if (!recent.length) { feed.innerHTML = `<div class="opp-empty">No recent listings cached for this field.</div>`; return; }
  feed.innerHTML = recent.map(r => `
    <div class="recent-item">
      <div class="ri-meta">
        <span class="ri-type">Opening</span>
        <span class="ri-age">${esc(r.date || oppStamp(r.title || ""))}</span>
      </div>
      <div class="ri-content">
        <h4>${esc(r.title)}</h4>
        <p>${esc(r.org)} · ${esc(r.loc)}</p>
      </div>
    </div>`).join("");
}

/* ── SALARY PANEL ───────────────────────────────────────────────────────── */
function growthClass(g) {
  const s = (g || "").toLowerCase();
  if (s.includes("much faster") || s.includes("faster")) return "fast";
  if (s.includes("slower") || s.includes("decline") || s.includes("little or no")) return "slow";
  return "avg";
}

function parseSalaryUpper(s) {
  const m = String(s || "").replace(/,/g, "").match(/\$?([\d]+)\s*[kK]?\s*[-–]\s*\$?([\d]+)\s*[kK]?/);
  if (!m) return 0;
  const toAnn = v => { const n = parseInt(v); return n < 2000 ? n * 1000 : n; };
  return Math.max(toAnn(m[1]), toAnn(m[2]));
}

function loadSalaryPanel() {
  const wrap = document.getElementById("salaryGrid");
  const sub = document.getElementById("salarySubtitle");
  const careerName = currentCareer ? currentCareer.name : null;
  sub.textContent = careerName
    ? `Compensation data for ${careerName} and related roles`
    : `Compensation data and growth outlook for ${fieldLabel()}`;
  const salaryKey = _ck("salary");
  if (panelCache[salaryKey]) { wrap.innerHTML = panelCache[salaryKey]; return; }

  wrap.innerHTML = `<div class="opp-loading loading-pulse" style="grid-column:1/-1">Loading salary data…</div>`;

  fetchJSON("/api/salary", { field: fieldLabel(), career: careerName || "", stage })
    .then(d => {
      const careers = d.careers || [];
      // derive field_outlook from career data if backend didn't return it
      const outlook = d.field_outlook || (() => {
        if (!careers.length) return {};
        const fastest = careers.find(c => (c.growth || "").toLowerCase().includes("faster")) || careers[0];
        const maxSenior = careers.reduce((m, c) => { const u = parseSalaryUpper(c.senior); return u > m ? u : m; }, 0);
        const maxLabel = maxSenior > 0 ? "$" + (maxSenior >= 1000 ? (maxSenior / 1000).toFixed(0) + "k" : maxSenior) : "";
        return {
          growth: fastest ? fastest.growth : null,
          jobs: maxLabel ? "Up to " + maxLabel + " senior" : null,
          note: "Salaries and outlook based on BLS projections. Actual pay varies by employer, location, and experience.",
        };
      })();
      const heroHTML = outlook.growth ? `
        <div class="salary-outlook-hero">
          <div class="soh-main">
            <div class="soh-label">Field outlook · ${fieldLabel()}</div>
            <div class="soh-growth">${esc(outlook.growth)}</div>
            <div class="soh-note">${esc(outlook.note || "")}</div>
          </div>
          ${outlook.jobs ? `<div class="soh-badge"><div class="soh-badge-val">${esc(outlook.jobs)}</div><div class="soh-badge-label">projected new jobs</div></div>` : ""}
        </div>` : "";

      const cards = (d.careers || []).map(c => {
        const eU = parseSalaryUpper(c.entry);
        const mU = parseSalaryUpper(c.mid);
        const sU = parseSalaryUpper(c.senior);
        const max = Math.max(eU, mU, sU, 1);
        const w = v => Math.max(6, Math.round((v / max) * 88));
        const gCls = growthClass(c.growth);
        return `
          <div class="salary-card">
            <div class="salary-card-header">
              <div class="salary-card-title">${esc(c.title)}</div>
              ${c.growth ? `<span class="salary-growth-pill ${gCls}">${esc(c.growth)}</span>` : ""}
            </div>
            <div class="salary-tiers">
              <div class="salary-tier">
                <span class="salary-tier-label">Entry</span>
                <div class="salary-tier-bar-wrap"><div class="salary-tier-fill entry" style="width:${w(eU)}%"></div></div>
                <span class="salary-tier-val">${esc(c.entry)}</span>
              </div>
              <div class="salary-tier">
                <span class="salary-tier-label">Mid</span>
                <div class="salary-tier-bar-wrap"><div class="salary-tier-fill mid" style="width:${w(mU)}%"></div></div>
                <span class="salary-tier-val">${esc(c.mid)}</span>
              </div>
              <div class="salary-tier">
                <span class="salary-tier-label">Senior</span>
                <div class="salary-tier-bar-wrap"><div class="salary-tier-fill senior" style="width:${w(sU)}%"></div></div>
                <span class="salary-tier-val">${esc(c.senior)}</span>
              </div>
            </div>
            ${c.note ? `<div class="salary-note">${esc(c.note)}</div>` : ""}
          </div>`;
      }).join("");

      wrap.innerHTML = heroHTML + (cards || `<div class="opp-empty" style="grid-column:1/-1">No salary data returned.</div>`);
      panelCache[_ck("salary")] = wrap.innerHTML;
    })
    .catch(() => {
      wrap.innerHTML = `<div class="opp-empty">Start the backend (localhost:8000) to load salary data.</div>`;
    });
}

/* ── SKILLS PANEL ───────────────────────────────────────────────────────── */
function loadSkillsPanel() {
  const el = document.getElementById("skillsContent");
  const sub = document.getElementById("skillsSubtitle");
  const careerName = currentCareer ? currentCareer.name : null;
  sub.textContent = careerName
    ? `Skills for ${careerName} (${STAGE_TEXT[stage]})`
    : `Skills for ${fieldLabel()} (${STAGE_TEXT[stage]})`;
  const skillsKey = _ck("skills");
  if (panelCache[skillsKey]) { el.innerHTML = panelCache[skillsKey]; return; }

  el.innerHTML = `<div class="opp-loading loading-pulse">Loading skills…</div>`;
  fetchJSON("/api/skills", { field: fieldLabel(), career: careerName || "", stage })
    .then(d => {
      const techTags = (d.technical || []).map(s => `<span class="skill-tag tech">${esc(s)}</span>`).join("");
      const softTags = (d.soft || []).map(s => `<span class="skill-tag soft">${esc(s)}</span>`).join("");
      const toolsHTML = (d.tools || []).map(t => `
        <div class="tool-item">
          <div class="tool-item-name">${esc(t.name || t)}</div>
          ${t.note ? `<div class="tool-item-note">${esc(t.note)}</div>` : ""}
          ${t.url ? `<a class="resource-link" href="${esc(t.url)}" target="_blank" rel="noopener">Learn more ↗</a>` : ""}
        </div>`).join("");
      const certsHTML = (d.certifications || []).map(c => `
        <div class="cert-item">
          <div class="cert-item-name">${esc(c.name)}</div>
          ${c.org ? `<div class="cert-item-org">${esc(c.org)}</div>` : ""}
          ${c.note ? `<div class="cert-item-note">${esc(c.note)}</div>` : ""}
          ${c.url ? `<a class="resource-link" href="${esc(c.url)}" target="_blank" rel="noopener">Get certified ↗</a>` : ""}
        </div>`).join("");
      el.innerHTML = `
        ${techTags ? `<div class="skills-section"><div class="skills-section-title">Technical skills</div><div class="skill-tags">${techTags}</div></div>` : ""}
        ${softTags ? `<div class="skills-section"><div class="skills-section-title">Soft skills</div><div class="skill-tags">${softTags}</div></div>` : ""}
        ${toolsHTML ? `<div class="skills-section"><div class="skills-section-title">Tools &amp; software</div><div class="tool-list">${toolsHTML}</div></div>` : ""}
        ${certsHTML ? `<div class="skills-section"><div class="skills-section-title">Certifications worth getting</div><div class="cert-list">${certsHTML}</div></div>` : ""}
      ` || `<div class="opp-empty">No skills data returned.</div>`;
      panelCache[_ck("skills")] = el.innerHTML;
    })
    .catch(() => {
      el.innerHTML = `<div class="opp-empty">Start the backend (localhost:8000) to load skills.</div>`;
    });
}

/* ── SCHOLARSHIPS PANEL ─────────────────────────────────────────────────── */
function loadScholarshipsPanel() {
  const grid = document.getElementById("scholarshipGrid");
  const schKey = _ck("scholarships");
  if (panelCache[schKey]) { grid.innerHTML = panelCache[schKey]; return; }

  grid.innerHTML = `<div class="opp-loading loading-pulse" style="grid-column:1/-1">Finding scholarships…</div>`;
  fetchJSON("/api/scholarships", { field: fieldLabel(), stage })
    .then(d => {
      const cards = (d.scholarships || []).map(s => `
        <div class="scholarship-card">
          <div class="scholarship-name">${esc(s.name)}</div>
          <div class="scholarship-org">${esc(s.org)}</div>
          <div class="scholarship-amount">${esc(s.amount)}</div>
          <div class="scholarship-meta">
            ${s.eligibility ? `<div class="scholarship-row"><b>Who:</b> ${esc(s.eligibility)}</div>` : ""}
            ${s.deadline ? `<div class="scholarship-row"><b>Deadline:</b> ${esc(s.deadline)}</div>` : ""}
          </div>
          ${s.url ? `<a class="scholarship-link" href="${esc(s.url)}" target="_blank" rel="noopener">Apply / learn more ↗</a>` : ""}
        </div>`).join("");
      grid.innerHTML = cards || `<div class="opp-empty" style="grid-column:1/-1">No scholarships returned.</div>`;
      panelCache[_ck("scholarships")] = grid.innerHTML;
    })
    .catch(() => {
      grid.innerHTML = `<div class="opp-empty" style="grid-column:1/-1">Start the backend (localhost:8000) to find scholarships.</div>`;
    });
}

/* ── ROADMAP PANEL ──────────────────────────────────────────────────────── */
function loadRoadmapPanel() {
  const el = document.getElementById("roadmapContent");
  const sub = document.getElementById("roadmapSubtitle");
  const careerName = currentCareer ? currentCareer.name : null;
  sub.textContent = careerName
    ? `Your path to becoming a ${careerName}`
    : `Your path into ${fieldLabel()}`;
  const rmKey = _ck("roadmap");
  if (panelCache[rmKey]) { el.innerHTML = panelCache[rmKey]; return; }

  el.innerHTML = `<div class="opp-loading loading-pulse">Building your roadmap…</div>`;
  fetchJSON("/api/roadmap", { field: fieldLabel(), career: careerName || "", stage, age: currentAge })
    .then(d => {
      const steps = (d.steps || []).map(s => `
        <div class="roadmap-step">
          <div class="roadmap-step-line">
            <div class="roadmap-dot"></div>
            <div class="roadmap-connector"></div>
          </div>
          <div class="roadmap-body">
            <div class="roadmap-phase">${esc(s.phase)}</div>
            <div class="roadmap-title">${esc(s.title)}</div>
            <ul class="roadmap-actions">${(s.actions || []).map(a => `<li>${esc(a)}</li>`).join("")}</ul>
            ${s.resources && s.resources.length
              ? `<div class="roadmap-resources">${s.resources.map(r => `<a class="resource-link" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.label)} ↗</a>`).join("")}</div>`
              : ""}
          </div>
        </div>`).join("");
      el.innerHTML = steps || `<div class="opp-empty">No roadmap returned.</div>`;
      panelCache[_ck("roadmap")] = el.innerHTML;
    })
    .catch(() => {
      el.innerHTML = `<div class="opp-empty">Start the backend (localhost:8000) to generate your roadmap.</div>`;
    });
}

/* ── UNIVERSITIES PANEL ─────────────────────────────────────────────────── */
document.getElementById("uniSearch").addEventListener("click", loadUniversities);

async function loadUniversities() {
  const grid = document.getElementById("uniGrid");
  grid.innerHTML = `<div class="opp-loading loading-pulse">Finding universities worldwide…</div>`;
  const satVal = document.getElementById("uniSat").value;
  const actVal = document.getElementById("uniAct").value;
  try {
    const d = await fetchJSON("/api/universities", {
      field: fieldLabel(),
      career: currentCareer ? currentCareer.name : "",
      age: currentAge,
      countries: document.getElementById("uniRegion").value || "global",
      budget: document.getElementById("uniBudget").value || "any",
      gpa: document.getElementById("uniGpa").value || "",
      sat: satVal ? String(Math.min(1600, Math.max(400, parseInt(satVal)))) : "",
      act: actVal ? String(Math.min(36, Math.max(1, parseInt(actVal)))) : "",
      location: document.getElementById("uniLocation").value || "",
      class_rank: document.getElementById("uniRank").value || "",
      extracurriculars: document.getElementById("uniExtras").value || "",
      awards: document.getElementById("uniAwards").value || "",
      rigor: document.getElementById("uniRigor").value || "",
      recs: document.getElementById("uniRecs").value || "",
      hooks: document.getElementById("uniHooks").value || "",
      essay_themes: document.getElementById("uniEssay").value || "",
      first_gen: document.getElementById("uniFirstGen").value || "",
      major: document.getElementById("uniMajor").value || "",
      school_size: document.getElementById("uniSize").value || "",
      school_type: document.getElementById("uniType").value || "",
      financial_aid: document.getElementById("uniAid").value || "",
      work_experience: document.getElementById("uniWork").value || "",
      languages: document.getElementById("uniLangs").value || "",
    });
    const unis = d.universities || [];
    grid.innerHTML = unis.map(uniCardHTML).join("")
      || `<div class="opp-empty">No universities found — try adjusting your filters.</div>`;
    if (unis.length) injectCampusPhotos(unis);
  } catch {
    grid.innerHTML = `<div class="opp-empty">Start the backend (localhost:8000) to find universities.</div>`;
  }
}

function fitBadge(fit) {
  const f = (fit || "").toLowerCase();
  if (!["safety", "match", "reach"].includes(f)) return "";
  return `<span class="uni-fit uni-fit-${f}">${f[0].toUpperCase() + f.slice(1)}</span>`;
}

function uniCardHTML(u) {
  const reqs = (u.requirements || []).map(r => `<li>${esc(r)}</li>`).join("");
  const photoId = "up-" + u.name.replace(/[^a-zA-Z0-9]/g, "_");
  return `<div class="uni-card">
    <div class="uni-campus-photo" id="${photoId}">
      <div class="uni-campus-placeholder">${esc(u.name)}</div>
    </div>
    <div class="uni-card-body">
      <div class="uni-head">
        <h3>${esc(u.name)}</h3>
        <div class="uni-head-right"><span class="uni-country">${esc(u.country || "")}</span>${fitBadge(u.fit)}</div>
      </div>
      <div class="uni-stats">
        ${u.gpa ? `<div class="uni-stat"><b>GPA needed:</b> ${esc(u.gpa)}</div>` : ""}
        ${u.sat ? `<div class="uni-stat"><b>SAT needed:</b> ${esc(u.sat)}</div>` : ""}
        ${u.acceptance_rate ? `<div class="uni-stat"><b>Acceptance:</b> ${esc(u.acceptance_rate)}</div>` : ""}
        ${u.annual_cost ? `<div class="uni-stat"><b>Annual cost:</b> ${esc(u.annual_cost)}</div>` : ""}
      </div>
      ${reqs ? `<p class="uni-req-title">Also needs:</p><ul class="uni-req-list">${reqs}</ul>` : ""}
      ${u.strength ? `<p class="uni-why">${esc(u.strength)}</p>` : ""}
    </div>
  </div>`;
}

async function fetchWikiThumb(name) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=600&origin=*`;
    const r = await fetch(url);
    const d = await r.json();
    const pages = d.query?.pages;
    if (!pages) return null;
    const page = Object.values(pages)[0];
    return page?.thumbnail?.source || null;
  } catch {
    return null;
  }
}

function injectCampusPhotos(universities) {
  universities.forEach(u => {
    const photoId = "up-" + u.name.replace(/[^a-zA-Z0-9]/g, "_");
    fetchWikiThumb(u.name).then(src => {
      if (!src) return;
      const el = document.getElementById(photoId);
      if (el) el.innerHTML = `<img src="${src}" alt="${esc(u.name)} campus" loading="lazy">`;
    });
  });
}

/* ── RESUME PANEL ───────────────────────────────────────────────────────── */
const scanDrop = document.getElementById("scanDrop");

scanDrop.addEventListener("click", e => {
  if (e.target.tagName === "LABEL" || e.target.tagName === "INPUT") return;
  document.getElementById("scanFile").click();
});
scanDrop.addEventListener("dragover", e => { e.preventDefault(); scanDrop.classList.add("dragging"); });
scanDrop.addEventListener("dragleave", () => scanDrop.classList.remove("dragging"));
scanDrop.addEventListener("drop", e => {
  e.preventDefault(); scanDrop.classList.remove("dragging");
  if (e.dataTransfer.files[0]) uploadResume(e.dataTransfer.files[0]);
});
document.getElementById("scanFile").addEventListener("change", e => {
  if (e.target.files[0]) uploadResume(e.target.files[0]);
});

async function uploadResume(file) {
  scanDrop.innerHTML = `<div class="scan-icon"></div><p class="scan-hint loading-pulse">Analyzing <b>${esc(file.name)}</b>…</p><p class="scan-formats">Reading and redacting PII…</p>`;
  document.getElementById("scanPii").hidden = false;
  document.getElementById("scanResult").hidden = true;

  try {
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch(API_BASE + "/api/scan", { method: "POST", body: fd });
    if (!r.ok) { const err = await r.json().catch(() => ({})); throw new Error(err.detail || "HTTP " + r.status); }
    const d = await r.json();
    resumeContext = d.redacted_text || "";
    renderScanResult(d, file.name);
  } catch (e) {
    scanDrop.innerHTML = `<div class="scan-icon"></div>
      <p class="scan-hint" style="color:var(--red)">${esc(e.message)}</p>
      <p class="scan-formats">Make sure the backend is running at localhost:8000</p>
      <label class="scan-link" for="scanFile2">Try again</label>
      <input type="file" id="scanFile2" accept=".pdf,.txt,.jpg,.jpeg,.png,.webp" hidden />`;
    const f2 = document.getElementById("scanFile2");
    if (f2) f2.addEventListener("change", ev => { if (ev.target.files[0]) uploadResume(ev.target.files[0]); });
  }
}

function renderScanResult(d, filename) {
  const a = d.analysis || {};
  document.getElementById("scanResult").hidden = false;

  scanDrop.innerHTML = `<div class="scan-icon"></div>
    <p class="scan-hint"><b>${esc(filename)}</b> analyzed · <label for="scanFileNew" class="scan-link">Upload another</label></p>
    <input type="file" id="scanFileNew" accept=".pdf,.txt,.jpg,.jpeg,.png,.webp" hidden />`;
  const fnew = document.getElementById("scanFileNew");
  if (fnew) fnew.addEventListener("change", ev => { if (ev.target.files[0]) uploadResume(ev.target.files[0]); });

  const piiNote = d.pii_redacted
    ? `<p style="font-size:.8rem;color:var(--green);margin-top:8px">✓ Personal info was redacted before analysis.</p>` : "";

  document.getElementById("scanSummaryBlock").innerHTML = `
    <h3>Summary</h3>
    <p>${esc(a.summary || "No summary returned.")}</p>
    ${piiNote}`;

  document.getElementById("scanStrengthsBlock").innerHTML = `
    <h3>Best strengths</h3>
    <ul>${(a.strengths && a.strengths.length ? a.strengths : []).map(s => `<li>${esc(s)}</li>`).join("") || "<li>None identified</li>"}</ul>`;

  document.getElementById("scanWeaknessesBlock").innerHTML = `
    <h3>Gaps &amp; weaknesses</h3>
    <ul>${(a.weaknesses && a.weaknesses.length ? a.weaknesses : (a.gaps || [])).map(g => `<li>${esc(g)}</li>`).join("") || "<li>None identified</li>"}</ul>`;

  const skills = a.skills || [];
  document.getElementById("scanSkillsBlock").innerHTML = `
    <h3>Skills found</h3>
    <div class="tag-wrap">${skills.map(s => `<span class="tag blue">${esc(s)}</span>`).join("") || "<span>None identified</span>"}</div>`;

  document.getElementById("scanGapsBlock").innerHTML = `
    <h3>What to add next</h3>
    <ul>${(a.gaps || []).map(g => `<li>${esc(g)}</li>`).join("") || "<li>None identified</li>"}</ul>`;

  const sugCareers = a.suggested_careers || [];
  const sugFields = a.suggested_fields || [];
  document.getElementById("scanCareersBlock").innerHTML = `
    <h3>Suggested careers &amp; fields</h3>
    <div class="tag-wrap">
      ${sugCareers.map(c => `<span class="tag blue">${esc(c)}</span>`).join("")}
      ${sugFields.map(f => `<span class="tag purple">${esc(f)}</span>`).join("")}
    </div>`;

  // unlock chatbot
  document.getElementById("chatInput").disabled = false;
  document.getElementById("chatSend").disabled = false;
  const msgs = document.getElementById("chatMsgs");
  msgs.innerHTML = "";
  appendChat("bot", `Resume scanned! I have context on your experience and skills. Ask me anything — how to improve it, how it stacks up for ${fieldLabel()}, what to add, or how to tailor it for a specific school.`);
}

/* ── RESUME CHATBOT ─────────────────────────────────────────────────────── */
let chatHistory = [];

document.getElementById("chatSend").addEventListener("click", sendChat);
document.getElementById("chatInput").addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); }
});

// disable until resume scanned
document.getElementById("chatInput").disabled = true;
document.getElementById("chatSend").disabled = true;

function appendChat(role, text) {
  const msgs = document.getElementById("chatMsgs");
  const div = document.createElement("div");
  div.className = `chat-bubble ${role}`;
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

async function sendChat() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  appendChat("user", text);

  chatHistory.push({ role: "user", content: text });

  const loading = appendChat("bot", "Thinking…");
  loading.classList.add("loading");

  try {
    const d = await fetchJSON("/api/chat", {
      message: text,
      history: chatHistory.slice(-8),
      resume_context: resumeContext,
      field: fieldLabel(),
      career: currentCareer ? currentCareer.name : "",
    });
    loading.remove();
    const reply = d.reply || "Sorry, I couldn't get a response.";
    chatHistory.push({ role: "assistant", content: reply });
    appendChat("bot", reply);
  } catch {
    loading.remove();
    appendChat("bot", "Could not reach the backend. Make sure it's running at localhost:8000.");
  }
}
