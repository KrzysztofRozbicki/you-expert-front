import React, { useState, memo } from 'react';
import { Dropdown } from 'react-bootstrap';
import LinkController from '../LinkController';
import { CustomToggle } from './CustomToggle';
import { CustomMenu } from './CustomMenu';

import styles from './NavigationDropdown.module.scss';

const NavigationDropdown = (props) => {
  const [show, handleShow] = useState(false);
  const { id, name, services, subcategories, locale, slug } = props;

  return (
    <div key={id} className={styles.dropdown_wrapper}>
      <Dropdown
        onSelect={() => {
          handleShow(!show);
        }}
        show={show}
        className={styles.dropdown_container}
        onMouseEnter={() => handleShow(true)}
        onMouseLeave={() => handleShow(false)}
      >
        <Dropdown.Toggle
          as={CustomToggle}
          locale={locale}
          slug={slug}
          show={show}
          className={styles.toggle}
          id="dropdown-custom-components"
        >
          {name}
        </Dropdown.Toggle>

        <Dropdown.Menu
          as={CustomMenu}
          locale={locale}
          className={`${styles.dropdown_content}`}
          services={services}
          subcategories={subcategories}
          categiry={slug}
          flip={false}
        />
      </Dropdown>
    </div>
  );
};

export default memo(NavigationDropdown);
