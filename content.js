/*
 * 主页内容：通常只需要修改这个文件，网页仅显示英文。
 * 正文使用普通文本；空列表会隐藏对应分区及导航。
 */
window.SITE_CONTENT = {
  profile: {
    name: "Panhuan Shi",
    shortName: "Panhuan Shi",
    email: "231501001@smail.nju.edu.cn",
    portrait: "", // 例："./assets/photo.jpg"；留空显示 Hopf fibration
    cv: "", // 例："./files/cv.pdf"；放入文件后填写
    description: "Panhuan Shi, senior undergraduate at Nanjing University. Research interests: Ricci flow, regularity theory of elliptic PDEs, and convergence of Riemannian manifolds."
  },
  about: [
    "I am a senior undergraduate at Nanjing University (2023–present)."
  ],
  // 研究兴趣显示在 About 中。
  researchInterests: [
    "Ricci flow",
    "Regularity theory of elliptic PDEs",
    "Convergence of Riemannian manifolds"
  ],
  // Research 留给具体研究项目；没有内容时隐藏。
  // { title: "Project title", description: "Project summary.",
  //   links: [{ label: "PDF", url: "./files/project.pdf" }] }
  research: [
    {
      title: "Closed Manifolds with Positive Isotropic Curvature in Dimensions 5, 6, and 7",
      description: "Independent research. The main results are also covered by Brendle and Tsiamis’s paper linked below, so I chose not to post this manuscript on arXiv.",
      links: [
        { label: "PDF", url: "./files/positive-isotropic-curvature-5-6-7.pdf" },
        { label: "Brendle–Tsiamis (arXiv:2610.02325)", url: "https://arxiv.org/abs/2610.02325" }
      ]
    }
  ],
  // { title: "Paper title", authors: "Author A, Author B",
  //   venue: "Journal / preprint", year: "2026", status: "",
  //   links: [{ label: "PDF", url: "./files/paper.pdf" }] }
  publications: [],
  // { title: "Note title", type: "Expository note", date: "2026-10",
  //   description: "A short summary.", url: "./files/note.pdf" }
  notes: [
    { title: "A Brief Note on Differentiable Sphere Theorem", url: "./files/differentiable-sphere-theorem.pdf" },
    { title: "A Brief Note on Hamilton Pinching Conjecture", url: "./files/hamilton-pinching-conjecture.pdf" },
    { title: "Lecture Notes on Regularity Theories of Elliptic PDE", url: "./files/elliptic-pde-regularity.pdf" },
    { title: "Notes on Anderson (1989): Compactness of Manifolds with Ricci Bounds", url: "./files/anderson-1989-compactness.pdf" }
  ],
  // { period: "2023–present", institution: "University name", degree: "Degree / subject" }
  education: [],
  // { date: "2026-10", text: "An update.", url: "" }
  news: [],
  // Contact 目前仅显示邮箱。添加其他链接后才会显示。
  links: [],
  lastUpdated: "" // 例："2026-10"；留空不显示
};
