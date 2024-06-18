import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Stack, Center, Heading, Divider, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';

const NewsCard = ({ article }) => (
  <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
    <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <Stack spacing={2}>
        <Text fontSize="xl" fontWeight="semibold">
          {article.title}
        </Text>
        <Text fontSize="md">{article.description}</Text>
        <Text fontSize="sm" color="gray.500">
          {new Date(article.published_at).toDateString()}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Source: {article.source}
        </Text>
      </Stack>
    </a>
  </Box>
);

const FarmingNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const url = `https://api.thenewsapi.com/v1/news/all?api_token=${apiKey}&search=India+farming+agriculture`;

      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setArticles(response.data.data);
        } else {
          console.error('Failed to fetch news:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    };

    fetchNews();
  }, []);

  return (
    <Box p={8} marginTop={10}>
      <Center>
        <Heading as="h1" size="xl" mb={4}>
          Top Farming and Agriculture News
        </Heading>
      </Center>
      <Divider mb={4} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

NewsCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    published_at: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default FarmingNews;


