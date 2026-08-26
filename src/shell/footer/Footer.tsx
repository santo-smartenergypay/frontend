// SPDX-License-Identifier: LicenseRef-Blockscout

// SPDX-License-Identifier: LicenseRef-Blockscout

import type { GridProps, HTMLChakraProps } from '@chakra-ui/react';
import { Box, Grid, Flex, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import type { CustomLinksGroup } from './types';

import useFetch from 'src/api/hooks/useFetch';
import type { ResourceError } from 'src/api/resources';

import { CONTENT_MAX_WIDTH } from 'src/shell/layout/utils';

import IndexingStatusInternalTxs from 'src/slices/chain/indexing-status/IndexingStatusInternalTxs';
import NetworkLogo from 'src/slices/chain/logo/NetworkLogo';

import NetworkAddToWallet from 'src/features/web3-wallet/components/NetworkAddToWallet';

import config from 'src/config';

import { Skeleton } from 'src/toolkit/chakra/skeleton';

import FooterLinkItem from './FooterLinkItem';

const MAX_LINKS_COLUMNS = 4;

type BlockScoutLink = {
  icon: string;
  iconSize: string;
  text: string;
  url: string;
}

const Footer = () => {

  const BLOCKSCOUT_LINKS: BlockScoutLink[] = [
    {
      icon: 'social/facebook_filled',
      iconSize: '20px',
      text: 'Facebook',
      url: 'https://www.facebook.com/share/18WVJYkCWK/',
    },
    {
      icon: 'social/instagram',
      iconSize: '20px',
      text: 'Instagram',
      url: 'https://www.instagram.com/smart_energy_pay?igsh=MThvczM5cWJha3NkaQ==/',
    },
    {
      icon: 'social/twitter_filled',
      iconSize: '20px',
      text: 'X (ex-Twitter)',
      url: 'https://x.com/smartenergypay/',
    },
    {
      icon: 'social/git',
      iconSize: '20px',
      text: 'Git',
      url: 'https://github.com/secblockchain/',
    },
    {
      icon: 'social/linkedin_filled',
      iconSize: '20px',
      text: 'LinkedIn',
      url: 'https://www.linkedin.com/company/smartenergypay/posts/?feedView=all/',
    },
    {
      icon: 'social/telegram_filled',
      iconSize: '20px',
      text: 'Telegram',
      url: 'https://t.me/smartenergypay/',
    },
    {
      icon: 'social/telegram_filled',
      iconSize: '20px',
      text: 'Telegram',
      url: 'https://t.me/smartenergypay/',
    },
    {
      icon: 'docs',
      iconSize: '20px',
      text: 'Documentation',
      url: 'https://doc.stcexplorer.io/',
    },
  ].filter(Boolean);

  const fetch = useFetch();

  const { isPlaceholderData, data: linksData } = useQuery<unknown, ResourceError<unknown>, Array<CustomLinksGroup>>({
    queryKey: ['footer-links'],
    queryFn: async () => fetch(config.shell.footer.links || '', undefined, { resource: 'footer-links' }),
    enabled: Boolean(config.shell.footer.links),
    staleTime: Infinity,
    placeholderData: [],
  });

  const colNum = isPlaceholderData ? 1 : Math.min(linksData?.length || Infinity, MAX_LINKS_COLUMNS) + 1;

  const renderNetworkInfo = React.useCallback((gridArea?: GridProps['gridArea']) => {
    return (
      <Flex
        alignItems="center"
        gridArea={gridArea}
        flexWrap="wrap"
        justifyContent="flex-start"
        columnGap={3}
        rowGap={2}
        mb={{ base: 5, lg: 10 }}
        _empty={{ display: 'none' }}
      >
        {!config.features.multichain.isEnabled && <NetworkAddToWallet source="Footer" />}
      </Flex>
    );
  }, []);

  const containerProps: HTMLChakraProps<'div'> = {
    as: 'footer',
    borderTopWidth: '1px',
    borderTopColor: 'border.divider',
  };

  const contentProps: GridProps = {
    px: { base: 4, lg: config.shell.navigation.layout === 'horizontal' ? 6 : 12, '2xl': 6 },
    py: { base: 4, lg: 8 },
    gridTemplateColumns: { base: '1fr', lg: 'minmax(auto, 470px) 1fr' },
    columnGap: { lg: '32px', xl: '100px' },
    maxW: `${CONTENT_MAX_WIDTH}px`,
    m: '0 auto',
  };

  if (config.shell.footer.links) {
    return (
      <Box {...containerProps}>
        <Grid {...contentProps}>
          <div>
            <NetworkLogo h="40px" mb={6} />
            {renderNetworkInfo()}
          </div>

          <Grid
            gap={{ base: 6, lg: colNum === MAX_LINKS_COLUMNS + 1 ? 2 : 8, xl: 12 }}
            gridTemplateColumns={{
              base: 'repeat(auto-fill, 160px)',
              lg: `repeat(${colNum}, 135px)`,
              xl: `repeat(${colNum}, 160px)`,
            }}
            justifyContent={{ lg: 'flex-end' }}
            mt={{ base: 8, lg: 0 }}
          >
            {
              ([
                { title: 'Blockscout', links: BLOCKSCOUT_LINKS },
                ...(linksData || []),
              ])
                .slice(0, colNum)
                .map(linkGroup => (
                  <Box key={linkGroup.title}>
                    <Skeleton fontWeight={500} mb={3} display="inline-block" loading={isPlaceholderData}>{linkGroup.title}</Skeleton>
                    <VStack gap={1} alignItems="start">
                      {linkGroup.links.map(link => <FooterLinkItem {...link} key={link.text} isLoading={isPlaceholderData} />)}
                    </VStack>
                  </Box>
                ))
            }
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box {...containerProps}>
      <Grid
        {...contentProps}
        gridTemplateAreas={{
          lg: `
          "network links-top"
          "info links-bottom"
          "recaptcha links-bottom"
          "cookie-settings links-bottom"
        `,
        }}
      >

        <Box gridArea={{ lg: 'network' }}>
          <NetworkLogo h="40px" mb={6} />
          {renderNetworkInfo()}
        </Box>

        <Grid
          gridArea={{ lg: 'links-bottom' }}
          gap={1}
          gridTemplateColumns={{
            base: 'repeat(auto-fill, 160px)',
            lg: 'repeat(2, 160px)',
            xl: 'repeat(3, 160px)',
          }}
          gridTemplateRows={{
            base: 'auto',
            lg: 'repeat(3, auto)',
            xl: 'repeat(2, auto)',
          }}
          gridAutoFlow={{ base: 'row', lg: 'column' }}
          alignContent="start"
          justifyContent={{ lg: 'flex-end' }}
          mt={{ base: 8, lg: 0 }}
        >
          {BLOCKSCOUT_LINKS.map(link => <FooterLinkItem {...link} key={link.text} />)}
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(Footer);
