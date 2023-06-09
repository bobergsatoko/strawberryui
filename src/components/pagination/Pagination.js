import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ArrowLeftFat, ArrowRightFat } from '../buttons/SecondaryButtonUtils';
import { GreenDecorationLeft, GreenDecorationRight, GreenDecorationRightLight, GreenDecorationLeftLight } from './PaginationUtils';

const PaginationContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 350px;
    height: 70px;
    border-radius: 30px;
    box-sizing: border-box;
    background: ${({ theme }) => theme === 'dark' ?
      `radial-gradient(41.62% 128.57% at 50% 0%, rgba(36, 119, 168, 0.95) 0%, rgba(1, 24, 37, 0) 73.96%), linear-gradient(180deg, #0A2D42 0%, #001522 100%)` :
      `radial-gradient(41.62% 128.57% at 50% 0%, rgba(151, 216, 254, 0.95) 0%, rgba(59, 143, 190, 0) 73.96%), linear-gradient(180deg, #ACE9FD 0%, #669FC2 100%)`};
    border: 1px solid ${({ theme }) => theme === 'dark' ? '#254550' : '#7BDEFE'};
`;

const PageNumber = styled.button`
    background-color: ${({ isActive }) =>
        isActive ? '#24111D' : 'transparent'};
    color: ${({ isActive }) => (isActive ? '#FFFFFF' : '#102131')};
    cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
    border: ${({ isActive, isDots }) =>
        isActive && !isDots ? '1px solid rgba(98, 153, 170, 0.85)' : '1px solid transparent'};
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    border-radius: 5px;
    margin: 0 1px;
    padding: 2px 5px 3px 5px;
    letter-spacing: ${({ isDots }) =>
        isDots ? '-1.2px' : 'normal'};

    background: ${({ theme }) => theme === 'dark' ? `linear-gradient(180deg, #72DFEE 14.71%, #FFFFFF 32.54%, #5CC0CC 50%)` : `linear-gradient(180deg, #126065 14.71%, #0B4D51 32.54%, #188087 50%);`};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: ${({ theme }) => theme === 'dark' ? `0px 0px 7px #FFFFFF` : `0px 0px 4px rgba(11, 77, 81, 0.53)`};
    font-family: 'Source Sans Pro', sans-serif;

    &:hover {
        border: ${({ isActive, isDots }) =>
            !isActive && !isDots ? '1px solid rgba(98, 153, 170, 0.5)' : ''};
    }

`;

const commonStyles = css`
    padding: 5px;
    cursor: pointer;
    box-sizing: border-box;
    width: 63px;
    height: 70px;
    background: ${({ theme }) => theme === 'dark' ? `#00121E` : `#77B3DB`};
    border: 1px solid ${({ theme }) => theme ==='dark' ? '#16323A' : '#8ADCFF'};
`;

const ArrowButtonLeft = styled.button`
    ${commonStyles}
    box-shadow: 4px 0px 9px rgba(0, 0, 0, 0.49);
    border-radius: 30px 20px 20px 30px;
    border-left: none;
`;

const ArrowButtonRight = styled.button`
    ${commonStyles}
    
    box-shadow: -4px 0px 9px rgba(0, 0, 0, 0.49);
    border-radius: 20px 30px 30px 20px;
    border-right: none;
`;

const StyledPagesContainer = styled.div`
    display: flex;
`;

const StyledLeftGreenDecorationWrapper = styled.div`
    position: absolute;
    left: 63px;
    top: 50%;
    margin-top: -17px;
`;

const StyledRightGreenDecorationWrapper = styled.div`
    position: absolute;
    right: 63px;
    top: 50%;
    margin-top: -17px;
`;

const Pagination = ({ totalElements, elementsPerPage, onPageChange, theme = 'dark' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalElements / elementsPerPage);

  const handleClick = (pageIndex) => {
    setCurrentPage(pageIndex);
    onPageChange(pageIndex);
  };

  const renderPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return <PageNumber theme={theme} isDots key={index}>...</PageNumber>;
      }
      return (
        <PageNumber
          key={index}
          isActive={currentPage === page}
          onClick={() => handleClick(page)}
          theme={theme}
        >
          {page}
        </PageNumber>
      );
    });
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationContainer theme={theme}>
        <StyledLeftGreenDecorationWrapper>
            {theme === 'dark' ? <GreenDecorationLeft /> : <GreenDecorationLeftLight />}
        </StyledLeftGreenDecorationWrapper>
        <StyledRightGreenDecorationWrapper>
            {theme === 'dark' ? <GreenDecorationRight /> : <GreenDecorationRightLight />}
        </StyledRightGreenDecorationWrapper>
      <ArrowButtonLeft theme={theme} onClick={handlePrevClick}>
        <ArrowLeftFat theme={theme} />
      </ArrowButtonLeft>
      <StyledPagesContainer>
        {renderPages()}
      </StyledPagesContainer>
      <ArrowButtonRight theme={theme} onClick={handleNextClick}>
        <ArrowRightFat theme={theme} />
      </ArrowButtonRight>
    </PaginationContainer>
  );
};

export default Pagination;
