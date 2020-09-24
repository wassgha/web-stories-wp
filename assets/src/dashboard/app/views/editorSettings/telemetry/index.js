/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { SettingForm, SettingHeading, FormLabel } from '../components';

const CheckBox = styled.input.attrs({
  type: 'checkbox',
  id: 'telemetry-opt-in',
})`
  height: 18px;
  width: 18px;
  margin: 0 12px 0 0;
  flex: 1 0 18px;
`;

const Label = styled.label.attrs({ htmlFor: 'telemetry-opt-in' })`
  display: flex;
  justify-content: flex-start;
`;

export default function TelemetrySettings({
  selected,
  onCheckboxSelected,
  disabled,
}) {
  const checkboxRef = useRef();
  const focusOnCheckbox = useRef(false);

  const checked = Boolean(selected);

  useEffect(() => {
    if (focusOnCheckbox.current) {
      checkboxRef.current.focus();
    }
  });

  return (
    <SettingForm>
      <div>
        <SettingHeading>
          {__('Data Sharing Opt-in', 'web-stories')}
        </SettingHeading>
      </div>
      <div>
        <Label>
          <CheckBox
            ref={checkboxRef}
            data-testid="telemetry-settings-checkbox"
            disabled={disabled}
            onChange={() => {
              onCheckboxSelected();
              focusOnCheckbox.current = true;
            }}
            onBlur={() => {
              focusOnCheckbox.current = false;
            }}
            checked={checked}
          />
          <FormLabel aria-checked={checked}>
            {__(
              'Help us improve the Web Stories for WordPress plugin by allowing tracking of usage stats. All data are treated in accordance with Google Privacy Policy.',
              'web-stories'
            )}
            &nbsp;
            <a
              href={'https://policies.google.com/privacy'}
              rel="noreferrer"
              target="_blank"
              aria-label={__(
                'Learn more by visiting Google Privacy Policy',
                'web-stories'
              )}
            >
              {__('Learn more', 'web-stories')}
              {'.'}
            </a>
          </FormLabel>
        </Label>
      </div>
    </SettingForm>
  );
}

TelemetrySettings.propTypes = {
  disabled: propTypes.bool.isRequired,
  selected: propTypes.bool.isRequired,
  onCheckboxSelected: propTypes.func.isRequired,
};