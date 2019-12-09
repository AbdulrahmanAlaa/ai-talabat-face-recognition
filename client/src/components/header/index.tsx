import * as React from 'React';
import { Menu } from 'semantic-ui-react';

export const Header = () => (
  <Menu style={{ backgroundColor: '#ff6f00' }}>
    <Menu.Item
      style={{ color: 'white', fontSize: '20px' }}
      icon={true}
      active={true}
      // onClick={this.handleItemClick}
    >
      Talabat
    </Menu.Item>

    <Menu.Item
      style={{ color: 'white' }}
      // active={activeItem === 'reviews'}
      // onClick={this.handleItemClick}
    >
      AI Face detection Application
    </Menu.Item>

    <Menu.Item name='upcomingEvents' style={{ color: 'white' }}>
      Upcoming Events
    </Menu.Item>
  </Menu>
  // <nav
  //   className='navbar'
  //   style={{ backgroundColor: '#ff6f00}' }}
  //   role='navigation'
  //   aria-label='main navigation'
  // >
  //   <div className='navbar-brand'>
  //     <a className='navbar-item' href='https://bulma.io'>
  //       <img
  //         src='https://www.talabat.com/images/talabat/logo_new.svg'
  //         width='112'
  //         height='28'
  //       />
  //     </a>

  //     <a
  //       role='button'
  //       className='navbar-burger burger'
  //       aria-label='menu'
  //       aria-expanded='false'
  //       data-target='navbarBasicExample'
  //     >
  //       <span aria-hidden='true'></span>
  //       <span aria-hidden='true'></span>
  //       <span aria-hidden='true'></span>
  //     </a>
  //   </div>

  //   <div id='navbarBasicExample' className='navbar-menu'>
  //     <div className='navbar-start'>
  //       <a className='navbar-item white'>AI Face detection Application</a>
  //       <a className='navbar-item white'>Add new User</a>
  //       <a className='navbar-item white'>Update User Image</a>
  //     </div>
  //   </div>
  // </nav>
);
