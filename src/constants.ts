export interface MalwareInfo {
  id: string;
  name: string;
  type: string;
  severity: 'High' | 'Critical';
  description: string;
  mechanics: string[];
  indicators: string[];
  defenses: string[];
  color: string;
}

export const MALWARE_DATA: MalwareInfo[] = [
  {
    id: 'rat',
    name: 'Remote Access Trojan (RAT)',
    type: 'Trojan',
    severity: 'Critical',
    description: 'A malware program that includes a back door for administrative control over the target computer. RATs are usually downloaded invisibly with a user-requested program or sent as an attachment.',
    mechanics: [
      'Establishes a persistence mechanism (e.g., registry keys, scheduled tasks).',
      'Opens a reverse shell to a Command & Control (C2) server.',
      'Grants attacker full GUI or CLI access to the host.',
      'Supports keylogging, screen capturing, and file exfiltration.'
    ],
    indicators: [
      'Unexpected network traffic to unknown external IP addresses.',
      'Spontaneous activity of webcams or microphones.',
      'Active processes with suspicious names or unusual CPU spikes.',
      'Unauthorized file modifications or remote shell activity.'
    ],
    defenses: [
      'Implement Egress filtering to block unauthorized C2 communications.',
      'Disable unnecessary remote management protocols (RDP, WinRM).',
      'Use multi-factor authentication for all remote system access.',
      'Regularly audit scheduled tasks and startup items.'
    ],
    color: 'cyber-accent'
  },
  {
    id: 'ransomware',
    name: 'Ransomware',
    type: 'Cryptoviral Extortion',
    severity: 'Critical',
    description: 'Malware that employs asymmetric encryption to hold a victim\'s information at ransom. A user\'s files are encrypted, and access is only returned after a payment (usually in cryptocurrency) is made.',
    mechanics: [
      'Inhibits system recovery by deleting Shadow Volume Copies.',
      'Scans local and network shares for target file extensions.',
      'Encrypts data using AES-256 or RSA algorithms.',
      'Drops "Ransom Note" files with encrypted symmetric keys.'
    ],
    indicators: [
      'Sudden high disk I/O as files are being read and rewritten.',
      'Massive rename operations (e.g., files ending in .locked or .crypted).',
      'Execution of native tools like vssadmin.exe or bcdedit.exe.',
      'System-wide performance degradation during encryption phase.'
    ],
    defenses: [
      'Maintain frequent, offline, and immutable backups.',
      'Implement File Screening on file servers to block known ransom extensions.',
      'Patch vulnerabilities exploited by propagation worms (e.g., SMB flaws).',
      'Use Endpoint Detection and Response (EDR) to detect behavioral patterns.'
    ],
    color: 'cyber-hazard'
  },
  {
    id: 'virus',
    name: 'Computer Virus',
    type: 'Self-Replicating Code',
    severity: 'High',
    description: 'A type of malicious software that, when executed, replicates itself by modifying other computer programs and inserting its own code. When this replication succeeds, the affected areas are then said to be "infected".',
    mechanics: [
      'Attaches malicious code to legitimate host executable files.',
      'Self-replicates upon execution of the infected host.',
      'Modifies entry points within PE/ELF files (Entry Point Obfuscation).',
      'May remain dormant (Logic Bomb) until specific conditions are met.'
    ],
    indicators: [
      'Executable files changing size unexpectedly.',
      'Modifications to file hashes (MD5/SHA) of standard system binaries.',
      'Programs failing to launch or exhibiting erratic behavior.',
      'Unexpected disk space consumption.'
    ],
    defenses: [
      'Use real-time antivirus scanning with heuristic analysis.',
      'Enforce Code Signing to prevent unauthorized binary modification.',
      'Run applications with Least Privilege (user mode vs admin).',
      'Perform periodic integrity checks on system files (SFC/DISM).'
    ],
    color: 'cyber-warn'
  }
];
