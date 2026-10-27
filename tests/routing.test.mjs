import {test} from 'node:test'
import assert from 'node:assert/strict'
import {pageHref,languageHref} from '../src/features/counsel/routing.ts'
test('standalone and mounted language routes',()=>{assert.equal(pageHref('/','zh'),'/' );assert.equal(pageHref('/templates/counsel/site/','en','journal/a-room-that-holds'),'/templates/counsel/site/en/journal/a-room-that-holds')})
test('language change retains query and fragment',()=>{assert.equal(languageHref('/templates/counsel/site/en/journal/the-advice-trap','/templates/counsel/site','zh','preview=1','#read'),'/templates/counsel/site/journal/the-advice-trap?preview=1#read')})
test('language-like slug remains intact',()=>{assert.equal(languageHref('/english','', 'en'),'/en/english');assert.throws(()=>languageHref('/outside','/templates/counsel/site','en'))})
