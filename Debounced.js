import axios from 'axios';
import React, { useEffect, useState } from 'react';

const test = () => {
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState('initial');
  const [debouncedTerm, setDebouncedTerm] = useState('initial');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(
        'https://en.wikipedia.org/w/api.php',
        {
          params: {
            action: 'query',
            list: 'search',
            origin: '*',
            format: 'json',
            srsearch: debouncedTerm,
          },
        }
      );

      setResults(data.query.search);
    };

    search();
  }, [debouncedTerm]);

  return <div>test</div>;
};

export default test;
