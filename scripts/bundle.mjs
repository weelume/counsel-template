import {execFile} from 'node:child_process'
import {promisify} from 'node:util'
import {readFile,writeFile,mkdir} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {resolve,join} from 'node:path'
const exec=promisify(execFile),root=resolve(import.meta.dirname,'..')
if(process.platform!=='linux'||!(await readFile('/proc/version','utf8')).toLowerCase().includes('microsoft'))throw new Error('请在本地 WSL Linux 文件系统中打包')
if(root.startsWith('/mnt/'))throw new Error('打包目录必须位于 Linux 文件系统')
const sourceCommit=(await exec('git',['rev-parse','HEAD'],{cwd:root})).stdout.trim()
const sourceDirty=(await exec('git',['status','--porcelain'],{cwd:root})).stdout.trim()!==''
if(sourceDirty)throw new Error('源码必须先提交并保持干净')
const output=join(root,'.work/packages');await mkdir(output,{recursive:true})
await exec('corepack',['pnpm','pack','--pack-destination',output],{cwd:root,maxBuffer:1048576})
const pkg=JSON.parse(await readFile(join(root,'package.json'),'utf8')),archive=join(output,pkg.name+'-'+pkg.version+'.tgz')
const sha256=createHash('sha256').update(await readFile(archive)).digest('hex')
const record={archive,sha256,sourceCommit,sourceDirty}
await writeFile(join(output,'bundle.json'),JSON.stringify(record,null,2)+'\n');console.log(JSON.stringify(record,null,2))
