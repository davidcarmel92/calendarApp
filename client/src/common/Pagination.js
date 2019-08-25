import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Pagination extends Component {

  render(){

    const { activePage, length, handlePageChange } = this.props;



    const numberOfpages = Math.ceil(length/10);
    let paginationPages = [];
    if(numberOfpages > 5){
      console.log(paginationPages)
      if(activePage <= 2){
        for(let i = 0; i<numberOfpages; i++){
          const currentPageCss = classnames(
            'page-item',
            {
              'active': activePage === i+1
            }
          );
          if(i === 0 || i === 1 || i === 2){
            paginationPages.push(<li key={i} className={currentPageCss}><span className="page-link" onClick={() => handlePageChange(i+1)}>{i+1}</span></li>);
          } else if(i === numberOfpages-1){
            paginationPages.push(<li key={'end-elipse'} className="page-item"><span className="page-link" >...</span></li>);
            paginationPages.push(<li key={i} className="page-item"><span className="page-link" onClick={() => handlePageChange(i+1)}>{i+1}</span></li>);
          }
        }
      }
      else {
        for(let i = 0; i<numberOfpages; i++){
          const currentPageCss = classnames(
            'page-item',
            {
              'active': activePage === i+1
            }
          );
          if(i === 0){
            paginationPages.push(<li key={i} className="page-item"><span className="page-link" onClick={() => handlePageChange(i+1)}>{i+1}</span></li>);
            paginationPages.push(<li key={'start-elipse'} className="page-item"><span className="page-link" >...</span></li>);
          }
          else if(i === activePage-2 || i === activePage-1 || i === activePage){
            paginationPages.push(<li key={i} className={currentPageCss}><span className="page-link" onClick={() => handlePageChange(i+1)}>{i+1}</span></li>);
          } else if(i === numberOfpages-1){
            paginationPages.push(<li key={'end-elipse'} className="page-item"><span className="page-link" >...</span></li>);
            paginationPages.push(<li key={i} className="page-item"><span className="page-link" onClick={() => handlePageChange(i+1)}>{i+1}</span></li>);
          }
        }
      }
    }
    else {
      for(let i = 0; i<numberOfpages; i++){
        const currentPageCss = classnames(
          'page-item',
          {
            'active': activePage === i+1
          }
        );
        paginationPages.push(<li key={i} className={currentPageCss}><span className="page-link" onClick={() => handlePageChange(i+1)}>{i+1}</span></li>)
      }
    }

    const nextCss = classnames(
      'page-item',
      {
        'disabled': activePage === numberOfpages
      }
    );
    const prevCss = classnames(
      'page-item',
      {
        'disabled': activePage === 1
      }
    );
    return (
      <ul className="pagination mr-auto ml-auto mt-2">
        <li className={prevCss}><span className="page-link" onClick={() => handlePageChange('prev')}>Previous</span></li>
        {paginationPages}
        <li className={nextCss}><span className="page-link" onClick={() => handlePageChange('next')}>Next</span></li>
      </ul>
    )
  }
}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
}


export default Pagination;
