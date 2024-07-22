import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Box, Text, Stack, SimpleGrid, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const VideoCard = ({ video }) => (
  <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Stack spacing={2}>
      <Box as="iframe" width="100%" height="215" src={`https://www.youtube.com/embed/${video.id.videoId}`} frameBorder="0" allowFullScreen />
      <Text fontSize="xl" fontWeight="semibold">
        {video.snippet.title}
      </Text>
      <Text fontSize="md">{video.snippet.description}</Text>
      <Text fontSize="sm" color="gray.500">
        {new Date(video.snippet.publishedAt).toDateString()}
      </Text>
    </Stack>
  </Box>
);

VideoCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }).isRequired,
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      publishedAt: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            q: 'farming agriculture crops',
            type: 'video',
            maxResults: 20,
            key: import.meta.env.VITE_YOUTUBE_API_KEY, // Use environment variable for the API key
            relevanceLanguage: 'hi',
            regionCode: 'IN',
          },
        });

        setVideos(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to load videos. Please try again later.');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <Spinner size="xl" mt={[250]} ml={[700]} justify="center" align="center" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box mt={8} mb={8}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default VideoList;


