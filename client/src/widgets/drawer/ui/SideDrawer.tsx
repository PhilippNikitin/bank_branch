import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
export const SideDrawer = () => {
  const [value, setValue] = useState(0);
  return (
    <Card
      position={"absolute"}
      mt={"10"}
      width={"auto"}
      height={"85vh"}
      zIndex={"modal"}
      borderRadius={"16px"}
      padding={"24 16"}
      backgroundColor={"#1A1E23"}
      ml={"8"}
    >
      <CardHeader>
        <Heading size="md">Client Report</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Summary
            </Heading>
            <Input
              color={"white"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Overview
            </Heading>
            <Text pt="2" fontSize="sm">
              Check out the overview of your clients.
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Analysis
            </Heading>
            <Text pt="2" fontSize="sm">
              See a detailed analysis of all your business clients.
            </Text>
            <Button>Click</Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
