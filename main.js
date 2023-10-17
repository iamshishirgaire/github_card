const myName = document.querySelector(".name");
const picture = document.querySelector(".img");
const age = document.querySelector(".age");

const follower = document.querySelector(".followerCount");
const following = document.querySelector(".followingCount");
const repo = document.querySelector(".repoCount");
const errorText = document.querySelector(".error");
const searchContent = document.querySelector(".searchContent");

const btn = document.querySelector(".btn");

const container = document.querySelector(".container");

container.style.display = "none";

btn.addEventListener("click", async () => {
  userName = document.querySelector(".userName").value;
  if (userName != "" && userName != null && userName.length != 0) {
    await getData(userName).then((data) => {
      console.log(`data`, data);
      if (data.message == "Not Found") {
        errorText.style.display = "block";
        errorText.style.fontSize = "20px";
        errorText.style.color = "red";
        errorText.textContent = "User Not found";
      } else {
        errorText.style.display = "none";
        container.style.display = "flex";
        searchContent.style.display = "none";
        myName.textContent = data.name;
        picture.src = data.avatar_url;
        follower.textContent = data.followers;
        following.textContent = data.following;
        repo.textContent = data.public_repos;
      }
    });
  } else {
    errorText.style.display = "block";

    errorText.textContent = "Please input valid username";

    errorText.style.fontSize = "13px";
  }
});

async function getData(name) {
  const res = await fetch(`https://api.github.com/users/${name}`);
  const data = await res.json();
  return data;
}
