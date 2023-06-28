import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bd.js'
import './priceList.js'
import { descriptionList, footerInfoList, infosList, navLinks } from './bd.js';
import { prices } from './priceList.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const activeLink = 'О нас'

function LogoAndText(props){
    return(
        <div className={props.divClassname}>
            <img src={props.image} alt='kurva'/>
            <span>{props.text}</span>
        </div>
    )
}

function Navbar(props) {
    return(
        <nav className='main-header__navbar'>
            {props.navLinks.map((link) => <a href='#' className='navbar-item'>{link}</a>)}
        </nav>
    )
}

function MainContentList(props) {
    return(
        <ul className='main-content__info'>
            {props.infos.map((info) => <li className='info-item'>{info}</li>)}
        </ul>
    )
}   

function ServiceCard(props) {
    const [isFlipped, setFlip] = React.useState(false)
    const flipCard = () => setFlip(!isFlipped)
    return(
        <div className={`service-item ${isFlipped ? 'opened' : 'closed'}`} onClick={flipCard}>
            {!isFlipped &&
                <div className='service-item-image'><img src={props.obj.icon} /></div>
            }
            <div className='service-item-text'>{props.obj.name}</div>
            {isFlipped &&
                <>
                    <div className='service-item-description'>{props.obj.description}</div>
                    <div className='servcie-item-price'><span>Цена от</span>{props.obj.price} р.</div>
                </>
            }
        </div>
    )
}

function Header(props) {
    const onClickButtonFunction = () => {
        let form = document.getElementById('reserve')
        form.scrollIntoView({behavior : 'smooth'}, true)
    }
    return (
        <div id='main'>
            <div className='container' id='main-container'>               
                <header className='main-header'>
                    <LogoAndText divClassname='main-header__logo' image='img/logo.png' text='Улыбка'/>
                    <Navbar navLinks={navLinks}/>
                    <LogoAndText divClassname='main-header__phone' image='img/phone.png' text='+7(812) 123-45-67'/>
                </header>
                <div className='main-content'>
                    <h1 className='main-title'>Качественное и безопасное лечение зубов</h1>
                    <MainContentList infos={infosList}/>
                </div>
                <button className='main-content__button standart-button' onClick={onClickButtonFunction}>Записаться на приём</button>
            </div>
        </div>
    )
}

function About(props) {
   return (
    <section className='about'>
        <div className='container' id='about1-container'>
            <div className='about-item'>
                <div className='title' id='about-title'>О нас</div>
                <div className='about-text'>
                    «Улыбка» – это частная стоматологическая клиника, в которой с пациентами работают 
                    высококвалифицированные специалисты разного профиля. У нас вы сможете при необходимости получить все 
                    необходимые услуги, а также пройти регулярный плановый осмотр.
                </div>
                <div className='about-text'>
                    Стоматология «Улыбка» — когда качество выше ваших ожиданий!
                </div>
            </div>
            <div className='about-item'>
                <img src='img/about1.png'/>
            </div>
            <div className='about-item'>
                <img src='img/about2.png'/>
            </div>
            <div className='about-item' id='about-quote'>
                <div className='about-text'>
                    «Мы любим свою работу. Для нас важно, чтобы каждый пациент получил высококвалифицированную помощь наших 
                    врачей-стоматологов, а также высококлассный сервис европейского уровня».
                </div>
            </div>
        </div>
    </section>
   )
}

function Services(props) {
    return (
        <section className='services'>
            <div className='container'>
                <div id='services-title' className='title'>Наши услуги</div>
                <div className='service-items'>
                    {props.list.map((serviceCard) => <ServiceCard obj={serviceCard}/>)}
                </div>
            </div>
        </section>
    )
}

function Form(props) {
    const onSubmit = (event) => {
        alert('Вы были записаны на приём')
    }
    return (
        <>
            <div id='reserve'>
                <div className='container' id='reserve-container'>
                    <div id="reserve-title" className='title'>Записаться на приём</div>
                    <div className='reserve-description'>
                        Хотите записаться на приём к специалисту - заполните форму и мы перезвоним 
                        Вам в течении 30 минут
                    </div>
                    <form action='' id='reserve-form'>
                        <input type='text' placeholder='Фамилия'/>
                        <input type='text' placeholder='Имя'/>
                        <input type='text' placeholder='Телефон: 79146878167'/>
                        <button type="button" className='standart-button' onClick={onSubmit}>Записаться на приём</button>
                    </form>
                </div>
            </div>
        </>
    )
}

function CreatePriceItem(props) {
    const [isOpen, setOpenClose] = React.useState(false)
    const [marker, setMarker] = React.useState('+')
    const pressPriceItem = () => {
        setOpenClose(!isOpen)
        changeMarker()
    }
    const changeMarker = () =>  marker === '+' ? setMarker('-') : setMarker('+')
    return (
        <div className='area-list-category'>
            <div className='area-list-name' onClick={pressPriceItem}>{props.name} <span>{marker}</span></div>
            {isOpen &&
                <div>{props.list.map((item) => <div className='area-list-service' onClick={() => props.addFunction(item['name'], item['price'])}>
                                                    <div className='area-list-service-name'>{item['name']}</div>
                                                    <div className='area-list-service-price'>{item['price']} &#8381;</div>
                                               </div>)
                     }
                </div>
            }
        </div>
    )
}

function ShowTotalPrice(props) {
    const userCart = props.userCart
    let totalPrice = 0
    userCart.forEach((cartItem) => totalPrice += cartItem['price'] * cartItem['count'])
    return (
        <div id='calculator-area-lower-price'>
            Итоговая цена: <span>{totalPrice} &#8381;</span>
        </div>
    )
}

function CreateCartItem(props) {
    const cartItem = props.cartItem
    const removeFromCart = props.removeFunction
    const totalPrice = cartItem['count'] * cartItem['price']
    return(
        <div className='area-selected-item'>
            <div className='selected-item-name'>{cartItem['name']} X{cartItem['count']} : {totalPrice} &#8381;</div>
            <button className='selected-item-button' onClick={() => removeFromCart(cartItem['name'])}>X</button>
        </div>
    )
}

// function Calculator(props) {
//     return(
//         <div id='calculator'>
//             <div className='container'>
//                 <div id='reserve-title' className='title'>Калькулятор услуг</div>
//                 <div className='reserve-description'>
//                     <strong>Не знаете сколько в итоге выйдет по стоимости?</strong> Не беда - вы можете подсчитать итоговую стоимость услуг 
//                     при помощи нашего калькулятора
//                 </div>
//                 <div id='calculator-area'>

//                 </div>
//             </div>
//         </div>
//     )
// }

function CalculatePrice(props) {
    let prices = props.list
    const [userCart, setUserCart] = React.useState([])
    const addToUserCart = (name, price) => {
        let wasAdded = false
        for(let item of userCart) {
            if(name === item['name']) {
                item['count']++
                wasAdded = !wasAdded
                break
            }
        }
        if(!wasAdded) {
            setUserCart([...userCart, {name : name, price : Number(price), count : 1}])
        } else {
            setUserCart([...userCart])
        }
    }
    const removeFromCart = (name) => {
        setUserCart(userCart.filter((cartItem) => cartItem['name'] !== name))
    }
    const clearUserCart = () => {
        setUserCart([])
    }
    const listPrices = prices.map((priceItem) => <CreatePriceItem name={priceItem['name']} list={priceItem['list']} addFunction={addToUserCart}/>)
    const cartItems = userCart.map((cartItem) => <CreateCartItem cartItem={cartItem} removeFunction={removeFromCart} />)
    return (
        <div id='calculator'>
            <div className='container'>
                <div id='reserve-title' className='title'>Калькулятор услуг</div>
                <div className='reserve-description'>
                    <strong>Не знаете сколько в итоге выйдет по стоимости?</strong> Не беда - вы можете подсчитать итоговую стоимость услуг 
                    при помощи нашего калькулятора
                </div>
                <div id='calculator-area'>
                    <div id='calculator-area-upper'>
                        <div id='calculator-area-service-list'>
                            <div className='calculator-area-title'>Список услуг</div>
                            <div id='calculator-area-list'>
                                {listPrices}
                            </div>
                        </div>
                        <div id='calculator-area-service-selected'>
                            <div className='calculator-area-title'>Выбранные услуги</div>
                            <div id='calculator-area-selected'>
                                {cartItems}
                            </div>
                        </div>
                    </div>
                    <div id='calculator-area-lower'>
                        <button type="button" 
                                id='calculator-area-lower-button' 
                                className='standart-button' 
                                onClick={() => clearUserCart()}>Убрать всё
                        </button>
                        <ShowTotalPrice userCart={userCart} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Doctors(props) {
    return (
        <div id='doctors'>
            <div className='container'>
                <div id='doctors-title' className='title'>Наши доктора</div>
                <div className='doctors-images'>
                    {[1,2,3,4].map((index) => <img src={`img/doctor${index}.png`}/>)}
                </div>
            </div>
        </div>
    )
}


function Footer(props) {
    console.log(props.infos[0])
    return (
        <footer id='footer'>
            <div className='container' id='footer-container'>
                <LogoAndText divClassname='footer__logo' image='img/logo1.png' text='Улыбка'/>
                {props.infos.map((info) => <div className='footer-info'>
                                            <div className='footer-info-image'>
                                                <img src={info.image}/>
                                            </div>
                                            <div className='footer-text'>
                                                <div className='footer-text-title'>{info.title}</div>
                                                <div className='footer-text-description'>{info.description}</div>
                                            </div>
                                        </div>)
                }
                <LogoAndText divClassname='footer__phone' image='img/phone1.png' text='+7(812) 123-45-67'/>
            </div>
        </footer>
    )
}

function RenderScene() {
    return(
        <>
            <Header />
            <About />
            <Services list={descriptionList}/>
            <Form />
            <CalculatePrice list={prices}/>
            <Doctors />
            <Footer infos={footerInfoList} />
        </>
    )
}

root.render(<RenderScene />)