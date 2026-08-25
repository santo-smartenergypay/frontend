// SPDX-License-Identifier: LicenseRef-Blockscout

import type { NextRequest, NextResponse } from 'next/server';

import * as cookiesLib from 'src/shared/storage/cookies';

export default function colorThemeMiddleware(_req: NextRequest, res: NextResponse) {
  res.cookies.set(cookiesLib.NAMES.COLOR_MODE, 'light', cookiesLib.getDefaultAttributes());
  res.cookies.set(cookiesLib.NAMES.COLOR_THEME, 'light', cookiesLib.getDefaultAttributes());
}
