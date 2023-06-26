
const slugify = (text:string, compelemet = false) => {
  const n = Math.round(Math.random() * 100000);

  if (text != undefined)
    return (
      text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\--+/g, "-")
        .replace(/^-+/, "")
        .replace(/--+$/g, "") + (compelemet ? +"-" + n : "")
    );
};

export default slugify;
