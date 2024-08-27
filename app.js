const modeBtn = document.getElementById("mode");
const body = document.getElementById("body");
const darkText = document.getElementById("dark");
const element = document.querySelector(".search-container");
const text = document.getElementById("text");
const mainContainer = document.querySelector(".main-container");
const svgElements = document.querySelectorAll(".svg path");
const text2 = document.querySelector(".name");
const bio = document.querySelector(".bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const inform = document.querySelector(".div1");
const footer = document.querySelectorAll(".footer-links");

modeBtn.addEventListener("click", () => {
  const isLightMode = body.classList.toggle("light-mode");

  const color = isLightMode ? "#4B6A9B" : "white";
  const textColor = isLightMode ? "#2B3442" : "white";
  const backgroundColor = isLightMode ? "white" : "#1e2a47";
  footer.forEach((item) => (item.style.color = "black"));
  svgElements.forEach((path) => path.setAttribute("fill", color));
  inform.style.background = "#F6F8FF";
  inform.style.color = textColor;
  bio.style.color = textColor;
  text2.style.color = textColor;

  locationLink.style.color = isLightMode ? "black" : "white";
  bloglink.style.color = isLightMode ? "black" : "white";
  twitterLink.style.color = isLightMode ? "black" : "white";
  homeLink.style.color = isLightMode ? "black" : "white";
  text.style.color = isLightMode ? "black" : "white";
  darkText.textContent = isLightMode ? "DARK" : "LIGHT";
  darkText.style.color = isLightMode ? "#697C9A" : "white";
  inform.style.background = isLightMode ? "#F6F8FF" : "#141D2F";
  mainContainer.style.color = isLightMode ? "black" : "white";

  element.style.backgroundColor = backgroundColor;
  mainContainer.style.background = backgroundColor;
});

const searchBtn = document.getElementById("search");
const inputValue = document.getElementById("input");

searchBtn.addEventListener("click", async () => {
  fetch(`https://api.github.com/users/${inputValue.value}`)
    .then((data) => data.json())
    .then((req) => {
      const year = req.created_at.slice(0, 4);
      const month = req.created_at.slice(5, 7);
      const date = req.created_at.slice(8, 10);
      console.log(req);

      if (req.message === "Not Found") {
        document.querySelector(".noResult").style.display = "block";
      } else {
        document.getElementById("userImg").src = `${req.avatar_url}`;
        document.getElementById("userName").textContent = req.name
          ? `${req.name}`
          : "Unknown!";
        document.getElementById(
          "createDate"
        ).textContent = `Joined ${date}.${month}.${year}`;
        document.getElementById("userLink").textContent = `@${req.login}`;
        document.getElementById("userLink").href = `${req.html_url}`;

        if (req.bio) {
          document.getElementById("bio").textContent = `${req.bio}`;
        } else {
          document.getElementById("bio").textContent =
            "This profile has no bio";
        }

        repos.textContent = `${req.public_repos}`;
        followers.textContent = `${req.followers}`;
        following.textContent = `${req.following}`;

        locationLink.textContent = req.location
          ? `${req.location}`
          : "Not available";
        locationLink.href = req.location ? `${req.location}` : "#";
        bloglink.textContent = req.blog ? `${req.blog}` : "Not available";
        bloglink.href = req.blog ? `${req.blog}` : "#";

        twitterLink.textContent = req.twitter_username
          ? `${req.twitter_username}`
          : "Not available";
        twitterLink.href = req.twitter_username
          ? `${req.twitter_username}`
          : "#";
        homeLink.textContent = req.company ? `${req.company}` : "Not available";
        homeLink.href = req.company ? `${req.company}` : "#";
      }
      inputValue.value = "";
    })
    .catch((error) => {
      console.log(error);
    });
});
