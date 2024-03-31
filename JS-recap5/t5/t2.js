const table = document.querySelector('table');
const dialog = document.querySelector('dialog');

async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log('Promise resolved and HTTP status is successful');
      const jsonData = await response.json();
      return jsonData;
    } else {
      if (response.status === 404) throw new Error('404, Not found');
      if (response.status === 500)
        throw new Error('500, internal server error');
      throw new Error(response.status);
    }
  } catch (error) {
    console.error('Fetch', error);
  }
}
//https://10.120.32.94/restaurant/
async function main() {
  const restaurants = await fetchData(
    'https://10.120.32.94/restaurant/api/v1/restaurants'
  );

  console.log(restaurants);

  restaurants.sort((a, b) => a.name.localeCompare(b.name));
  for (let r of restaurants) {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdAddr = document.createElement('td');
    tdName.addEventListener('click', e => {
      const menu = fetchData(
        `https://10.120.32.94/restaurant/api/v1/restaurants/daily/${r._id}/fi`
      );
      menu.then(menu => {
        console.log(menu.courses);
        createModal(r, menu.courses);
      });

      e.preventDefault();
      e.stopPropagation();
      dialog.innerHTML = '';

      dialog.show();
      dialog.blur();
      document.querySelectorAll('.highlight').forEach(ele => {
        ele.classList.remove('highlight');
      });
      tdName.classList.add('highlight');
    });
    tdName.innerText = r.name;
    tdAddr.innerText = r.address;
    tr.append(tdName, tdAddr);
    table.appendChild(tr);
  }
}
main();
function createModal(r, m) {
  const modal = document.querySelector('dialog');
  const divContact = document.createElement('div');
  const divWrap = document.createElement('div');
  const menuTable = document.createElement('table');
  menuTable.classList.add('menu');
  divWrap.classList.add('wrapper');
  divContact.classList.add('contact');
  divWrap.append(divContact, menuTable);
  modal.appendChild(divWrap);
  const span = document.createElement('span');
  span.addEventListener('click', e => dialog.close());
  span.innerText = 'x';
  span.style.fontWeight = 'bold';
  const pName = document.createElement('p');
  const pAddr = document.createElement('p');
  const pPostCode = document.createElement('p');
  const pCity = document.createElement('p');
  const pNum = document.createElement('p');
  const pComp = document.createElement('p');
  pName.innerText = r.name;
  pAddr.innerText = r.address;
  pPostCode.innerText = r.postalCode;
  pCity.innerText = r.city;
  pNum.innerText = r.phone;
  pComp.innerText = r.company;
  span.style.float = 'right';
  span.style.cursor = 'pointer';
  divContact.append(span, pName, pAddr, pPostCode, pCity, pNum, pComp);

  const tr = document.createElement('tr');
  const thName = document.createElement('th');
  const thPrice = document.createElement('th');
  const thDiet = document.createElement('th');
  thDiet.innerText = 'Diet';
  thName.innerText = 'Name';
  thPrice.innerText = 'Price';
  tr.append(thName, thPrice, thDiet);
  menuTable.appendChild(tr);
  if (m.length === 0) {
    menuTable.innerHTML = '<span> NO MENU AVAILABLE</span>';
    menuTable.classList.add('randomclass');
  } else {
    m.forEach(m => {
      const tr = document.createElement('tr');
      const mName = document.createElement('td');
      const mPrice = document.createElement('td');
      const mDiet = document.createElement('td');
      mName.innerText = m.name;
      if (m.price == '' || m.price == null) {
        mPrice.innerText = 'No price available';
      } else {
        mPrice.innerText = m.price;
      }
      mDiet.innerText = m.diets;
      tr.append(mName, mPrice, mDiet);
      menuTable.append(tr);
    });
  }
  return modal;
}
