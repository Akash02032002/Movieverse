import React, { useContext, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

const Header = ({ onSearch }) => {
  const useAppstate = useContext(Appstate);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the search query to the parent component
  };

  return (
    <div className='sticky z-10 header top-0 text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500'>
      <Link to={'/'}>
        <span>Movie<span className='text-white'>Verse</span></span>
      </Link>
      <div className="flex items-center">
        <Paper component="form" elevation={0} className="p-2 mr-2">
          <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-24 md:w-32 lg:w-40" // Adjust width as needed for different screen sizes
          />
          <SearchIcon />
        </Paper>
        {useAppstate.login ? (
          <Link to={'/addmovie'}>
            <h1 className='text-lg cursor-pointer flex items-center'>
              <Button>
                <AddIcon className='mr-1' color='secondary' />{' '}
                <span className='text-white'>Add New</span>
              </Button>
            </h1>
          </Link>
        ) : (
          <Link to={'/login'}>
            <h1 className='text-lg bg-green-500 cursor-pointer flex items-center'>
              <Button>
                <span className='text-white font-medium capitalize'>
                  Login
                </span>
              </Button>
            </h1>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
