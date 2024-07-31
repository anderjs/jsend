import styled from 'styled-components';

export const Container = styled.div<{ open: boolean }>`
  grid-column-start: ${props => props.open ? 4 : 2};
  grid-column-end: span ${props => props.open ? 9 : 11};
  width: 100%;
  grid: inherit;
  
  @media (max-width: 500px) {
    grid-column-start: initial;
    grid-column-end: span 12;
  }
`;

export const SidebarContainer = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const classes = {
  grid: "grid grid-cols-12 sm:mx-16 mx-[32px] mt-[9rem] gap-[1.75rem] flex-grow",
  open: 'col-span-3 grid grid-cols-3 gap-[1.75rem]',
  close: 'col-span-1 gap-[1.75rem]',
  container: 'fixed top-0 left-0 right-0 h-0 z-10'
}