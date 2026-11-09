// Single source of truth for the dynamically-generated resume PDF.
// Edit values here and the downloadable CV updates automatically.

export const resumeData = {
    name: "Rey Mahendra",
    title: "Software Engineer",
    contact: {
        email: "reymahndra@gmail.com",
        phone: "+6285183220920",
        github: "github.com/reymahendra",
        portfolio: "reymahendra.vercel.app",
    },
    summary:
        "Versatile software engineer with 3+ years of industry experience, having successfully delivered complex technical projects across front-end and back-end development. A collaborative team member and effective problem solver seeking to contribute to a challenging environment.",
    experience: [
    {
        company: "Pusat Informasi Kriminal Bareskrim Polri",
        role: "Software Engineer",
        date: "Mei 2026 – November 2026",
        bullets: [
            "Mengembangkan Dashboard SPPT-TI secara end-to-end",
            "Membangun backend dan REST API menggunakan Java Spring Boot",
            "Merancang UI/UX dan mengelola struktur basis data",
            "Mengoptimalkan performa, keamanan, dan stabilitas aplikasi",
        ],
    },
    {
        company: "Pusat Informasi Kriminal Bareskrim Polri",
        role: "UI/UX Designer & QA",
        date: "Oktober 2025 – November 2026",
        bullets: [
            "Merancang wireframe, prototype, dan antarmuka sistem internal",
            "Melakukan pengujian fungsional serta identifikasi bug",
            "Memastikan kesesuaian implementasi dengan standar desain",
        ],
    },
    {
        company: "Lembaga Perlindungan Saksi dan Korban (LPSK)",
        role: "UI/UX Designer & QA",
        date: "Oktober 2025 – November 2026",
        bullets: [
            "Merancang UI/UX website resmi LPSK",
            "Membuat wireframe, prototype, dan desain visual",
            "Melakukan QA testing serta dokumentasi bug",
            "Berkoordinasi dengan developer dalam implementasi desain",
        ],
    },
    {
        company: "Pusat Informasi Kriminal Bareskrim Polri",
        role: "IT Support Specialist & Helpdesk",
        date: "Januari 2024 – September 2025",
        bullets: [
            "Memelihara infrastruktur IT, jaringan, dan perangkat keras",
            "Menangani troubleshooting dan dukungan teknis pengguna",
        ],
    },
],
    projects: [
    {
        title: "Dashboard SPPT-TI",
        tech: ["Java Spring Boot", "RESTful API", "UI/UX Design", "QA Testing"],
        description:
            "Sistem dashboard terpadu untuk pemrosesan dan penyajian data perkara pidana. Mengembangkan arsitektur backend hingga antarmuka pengguna secara end-to-end serta mengeksekusi pengujian sistem komprehensif.",
    },
    {
        title: "EMP (Elektronik Manajemen Penyidikan)",
        tech: [
            "UI/UX Design",
            "QA Testing",
            "Helpdesk Support",
            "System Audit",
        ],
        description:
            "Platform manajemen investigasi kepolisian internal. Merancang wireframe dan antarmuka pengguna yang intuitif, mengeksekusi software testing menyeluruh, serta menangani dukungan teknis tingkat lanjut.",
    },
    {
        title: "Website Resmi LPSK",
        tech: [
            "UI/UX Design",
            "QA Testing",
            "Web Architecture",
            "User Research",
        ],
        description:
            "Website publik resmi Lembaga Perlindungan Saksi dan Korban. Merancang prototipe antarmuka berstandar aksesibilitas tinggi serta menyusun skenario pengujian fungsional secara menyeluruh.",
    },
    {
        title: "Infrastruktur Operasional Pusiknas",
        tech: [
            "IT Support",
            "Hardware & Network",
            "Troubleshooting",
            "System Admin",
        ],
        description:
            "Pemeliharaan infrastruktur jaringan, hardware, dan sistem operasional harian di lingkungan Pusiknas Bareskrim Polri untuk memastikan stabilitas dan uptime layanan 24/7.",
    },
],
    education: [
        {
            school: "Universitas Bina Sarana Informatika (Incomplete)",
            degree: "Sistem Informasi (Information Systems)",
            date: "2022 - 2025",
        },
        {
            school: "SMK Pelita Ciampea",
            degree: "Tekhnik Komputer Jaringan (Computer & Network Engineering)",
            date: "2014 – 2017",
        },
    ],
    skills: [
        {
            category: "Backend",
            items: "Java Spring Boot, RESTful API, Python, Flask, Node.js, Laravel, Sanctum API Security",
            pdfItems:
                "Java Spring Boot, REST API, Python, Flask, Node.js, Laravel",
        },
        {
            category: "Frontend",
            items: "JavaScript, TypeScript, React, HTML, CSS, Tailwind CSS",
            pdfItems: "JS, TS, React, HTML/CSS, Tailwind",
        },
        {
            category: "Databases",
            items: "MongoDB, MySQL, Database Design & Optimization",
            pdfItems: "MongoDB, MySQL, Database Design",
        },
        {
            category: "UI/UX & QA",
            items: "UI/UX Design, Wireframing, Prototyping, Manual & Functional Testing",
            pdfItems: "UI/UX Design, Wireframing, Prototyping, QA Testing",
        },
        {
            category: "IT Support",
            items: "Network & Hardware Maintenance, System Administration, Troubleshooting",
            pdfItems: "Network & Hardware, System Administration, Troubleshooting",
        },
        {
            category: "Tools",
            items: "Git, GitHub, Postman, Linux, Windows",
            pdfItems: "Git, GitHub, Postman, Linux, Windows",
        },
    ],
    certifications: [],
};

export type ResumeData = typeof resumeData
