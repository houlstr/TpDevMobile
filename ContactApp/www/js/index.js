document.addEventListener("deviceready", loadContacts, false);

function loadContacts() {
  // Cordova is now initialized. Have fun!
  let opt = new ContactFindOptions();
  // filtrer les resultats
  // opt.filter = 'resp';

  opt.multiple = true;
  opt.hasPhoneNumber = true;

  let fields = ["name"];

  navigator.contacts.find(fields, showContacts, handleContactError, opt);

  function showContacts(contacts) {
    let contactHtml = "";
    for (const item of contacts)
      contactHtml += `
        <li>
        <a href="#page2">
          <img src="../_assets/img/album-bb.jpg" />
          <h2>${item.name.formatted}</h2>
          <p>${item.phoneNumbers[0].value}</p>
        </a>
      </li>`;

      const contactList = document.getElementById('contactList');
      contactList.innerHTML = contactHtml;
      $(contactList).listview('refresh');
  }

  function handleContactError(error) {
    console.log("====================================");
    console.log("Error while getting contacts list");
    console.log(error);
  }
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");
}
