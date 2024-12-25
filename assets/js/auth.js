function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(bytes => bytes.toString(16).padStart(2, '0')).join('');
      return hashHex;
    });
}


const currentUrl = window.location.href;
const baseUrl = window.location.origin;
const relativeUrl = currentUrl.replace(baseUrl, '');
hash(getCookie("c")).then((result) => {
    hashResult = result;
    if (hashResult === "20264a9d385ebd31243b85647adbb293b4770f7ceda7d9a64828939e3e255bc0") {
        if (relativeUrl !== "/principal-v.html") {
            window.location.href = "/principal-v.html";
        }
    } else if (hashResult === "6baa2eb3b9aa2426a956ddd4aae3211a013279f52815e9a758556c8c8d0f8d20") {
        if (relativeUrl !== "/principal.html") {
            window.location.href = "/principal.html";
        }
    } else if (hashResult === "800baa198cb07db333031b0ea984b7d99e8a610619f8f0477f6f74e5e35faff1") {
        if (!relativeUrl.includes("/max/")) {
            window.location.href = "/max/home.html";
        }
    } else if (hashResult === "170fa7ffb268f11e4f2883d893958b49f59fcb36381e4d7b34156a6b7856c169") {
        if (!relativeUrl.includes("/max/")) {
            window.location.href = "/max/home.html";
        }
    } else {
        window.location.href = "/"
    }
}).catch(console.error);

async function verif_usuario() {
    try {
        const result = await hash(getCookie("c"));
        if (result === "20264a9d385ebd31243b85647adbb293b4770f7ceda7d9a64828939e3e255bc0") {
            return "dono";
        } else if (result === "6baa2eb3b9aa2426a956ddd4aae3211a013279f52815e9a758556c8c8d0f8d20") {
            return "convidado";
        } else if (result === "800baa198cb07db333031b0ea984b7d99e8a610619f8f0477f6f74e5e35faff1") {
            return "convidado";
        } else if (result === "170fa7ffb268f11e4f2883d893958b49f59fcb36381e4d7b34156a6b7856c169") {
            return "dono";
        }
    } catch (error) {
        console.error(error);
    }
}