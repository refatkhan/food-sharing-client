import React from 'react';
import { Spinner, Text, VStack } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <VStack>
      <Spinner color="teal.500" />
      <Text color="teal.500">Loading...</Text>
    </VStack>
  );
};

export default LoadingSpinner;
