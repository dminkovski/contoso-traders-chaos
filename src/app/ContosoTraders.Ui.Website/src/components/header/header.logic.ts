import { ControllersIcon, DesktopsIcon, LaptopsIcon, MobilesIcon, MonitorIcon } from "app/assets/images";
import useAuthentication from 'app/hooks/useAuthentication';
import { useEffect, useState } from 'react';

const CATEGORIES = {
  title: 'All Categories',
  categorylist: [
      {
          name: 'Laptops',
          url: '/list/laptops',
          img: LaptopsIcon
      },
      {
          name: 'Controllers',
          url: '/list/controllers',
          img: ControllersIcon
      },
      {
          name: 'Desktops',
          url: '/list/desktops',
          img: DesktopsIcon
      },
      {
          name: 'Mobiles',
          url: '/list/mobiles',
          img: MobilesIcon
      },
      {
          name: 'Monitors',
          url: '/list/monitors',
          img: MonitorIcon
      },
  ]
}

const useHeaderLogic = () => {
  const [isOpened, setIsOpened] = useState(false);
  const {actions: {login, logout}} = useAuthentication();
  const locationPath = window.location.pathname;

  const setComponentVisibility = (width) => {
      if (width > 1280) {
          setIsOpened(false);
      }
  }

  const toggleIsOpened = () => {
      setIsOpened(o => !o);
  }


  useEffect(()=>{
      setComponentVisibility(document.documentElement.clientWidth);
      window.addEventListener('resize', function () {
          setComponentVisibility(document.documentElement.clientWidth);
      });
  }, []);


  return {
    state: {
      isOpened
    },
    actions: {
      toggleIsOpened,
      login,
      logout
    },
    data: {
      CATEGORIES,
      locationPath
    }
  }
}

export default useHeaderLogic;