/*
 * 主页内容：通常只需要修改这个文件，网页仅显示英文。
 * 保留引号、逗号和括号。正文使用普通文本，换段落请增加数组元素。
 * 链接留空会自动隐藏，不会生成无效按钮。
 */
window.SITE_CONTENT = {
  profile: {
    name: "Your Name",
    shortName: "Your Name",
    tagline: "Research, ideas,\nand a little curiosity.",
    role: "To be added",
    affiliation: "Affiliation to be added",
    department: "",
    location: "",
    email: "",
    portrait: "", // 例："./assets/photo.jpg"；留空显示几何插图
    cv: "", // 例："./files/cv.pdf"；放入文件后填写
    description: "A personal homepage for research, writing, and ideas."
  },
  about: [
    "A short introduction will appear here.",
    "More about my background, current work, and interests will follow."
  ],
  research: [
    {
      title: "Research direction 01",
      description: "A brief overview of this area and the questions that interest me.",
      tags: [],
      url: ""
    },
    {
      title: "Research direction 02",
      description: "A place for another research interest or an ongoing project.",
      tags: [],
      url: ""
    },
    {
      title: "Research direction 03",
      description: "Further interests, connections, and topics to explore.",
      tags: [],
      url: ""
    }
  ],
  // 论文列表为空时隐藏整个论文分区与导航；添加论文后自动显示。
  // 复制下面对象到数组内即可添加；按你希望的顺序排列。
  // {
  //   title: "Paper title", authors: "Author A, Author B",
  //   venue: "Journal / preprint", year: "2026", status: "",
  //   links: [{ label: "PDF", url: "./files/paper.pdf" },
  //           { label: "arXiv", url: "https://arxiv.org/abs/论文编号" }]
  // }
  publications: [],
  // { title: "Note title", type: "Expository note", date: "2026-10",
  //   description: "A short summary.", url: "./files/note.pdf" }
  notes: [],
  // 以下区块只有添加内容后才会显示。
  // { period: "2023–2027", institution: "University name", degree: "Degree / subject" }
  education: [],
  // { date: "2026-10", text: "An update.", url: "" }
  news: [],
  contactMessage: "Always happy to exchange\nideas and questions.",
  // 填入真实链接才会显示；可以自由增加或删除。
  links: [
    { label: "GitHub", url: "https://github.com/Mscraft176" },
    { label: "Google Scholar", url: "" },
    { label: "ORCID", url: "" }
  ],
  lastUpdated: "" // 例："2026-10"；留空不显示
};
