document.addEventListener('deviceready', ChargerContact, false);

function ChargerContact()
{
    let options = new ContactFindOptions();
    options.multiple = true ;
    options.hasPhoneNumber = true;
    let champs = ['name'];
    navigator.contacts.find(champs, AfficherContacts, HandleContactError, options);

}

function AfficherContacts(contacts)
{ 
    let contactItem ;
    const ListeContact = document.getElementById('ListeContact');
    for(const contact of contacts)
    {
        contactItem = document.createElement('li');
        contactItem.innerHTML = `
            <a href="#contact-edit">
                <img src="img/imagesContact.png" alt="">
                <h1>${contact.name.formatted}</h1>
                <p>${contact.phoneNumbers[0].value}</p>
            </a>
        `;

        contactItem.onclick = function () {
            getContact(contact.id);
        }
        ListeContact.appendChild(contactItem);

    }

    $(ListeContact).listview('refresh');
}

function getContact(contactID)
{
    let options = new ContactFindOptions();
    options.filter = contactID ;
    options.hasPhoneNumber = true;
    let champs = ['id'];
    navigator.contacts.find(champs, AfficherContact, HandleContactError, options);
}

function AfficherContact(contacts) {
    let contact = contacts[0];
    let contactInfo = `
        <li>
            <img src="img/imagesContact.png" alt="">
            <h1>Nom du Contact</h1>
            <p>${contact.name.formatted}</p>
        </li>
        <li>
            <h1>Numéros de téléphone</h1>
            <ul>`;

                for (const phoneNumber of contact.phoneNumbers) {
                    contactInfo += `
                        <li>
                            <p>${phoneNumber.value}</p>
                        </li>`;
                }

        contactInfo += `
            </ul>
        </li>
        <li>
            <h1>Email</h1>
            <p>${contact.emails ? contact.emails[0].value : 'Non renségné'}</p>
        </li>
        <li>
            <h1>Adresse</h1>
            <p>${contact.addresses? contact.addresses[0].formatted : 'Non renségné'}</p>
        </li>
        <li>
            <h1>Organisations</h1>
            <p>${contact.organizations ? contact.organizations[0].name : 'Non renségné' }</p>
        </li>
    `;

    const DetailsContact = document.getElementById('DetailsContact');
    DetailsContact.innerHTML = contactInfo;
    $(DetailsContact).listview('refresh');

}

function HandleContactError(error) {
    console.log('erreur');
    console.log(error) ;
}