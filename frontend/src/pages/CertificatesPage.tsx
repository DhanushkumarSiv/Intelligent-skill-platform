import React, { useState } from 'react';
import { Award, Upload, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { Certificate } from '../types';
import { uploadCertificatePdf } from '../services/api';

export const CertificatesPage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 301,
      issuer: "Coursera / VMware",
      courseName: "Java & Spring Boot Backend Development",
      studentName: "Alex Chen",
      credentialId: "CERT-99481-JAVA",
      issueDate: "2025-06-15",
      verificationStatus: "VERIFIED",
      extractedText: "Certificate of Completion\nIssued to: Alex Chen\nCourse: Java & Spring Boot Backend Development\nIssuer: Coursera / VMware\nCredential ID: CERT-99481-JAVA",
      matchedSkills: ["Java", "Spring Boot"],
      createdAt: new Date().toISOString()
    }
  ]);

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);

    const result = await uploadCertificatePdf(file);
    setCertificates(prev => [result, ...prev]);
    setUploading(false);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Award className="w-6 h-6 text-amber-400" />
          <div>
            <h1 className="text-xl font-bold text-white">PDF Certificate Verification</h1>
            <p className="text-xs text-slate-400 mt-0.5">Apache PDFBox parses certificate metadata, issuer credentials, and matched skills for evidence scoring.</p>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="glass-card rounded-2xl p-8 border border-dashed border-slate-700 text-center hover:border-amber-500/50 transition">
        <Upload className="w-10 h-10 text-amber-400 mx-auto mb-3 animate-bounce" />
        <h3 className="text-base font-bold text-white mb-1">Upload Certificate PDF</h3>
        <p className="text-xs text-slate-400 mb-4">Upload Coursera, Udemy, Oracle, AWS or University course completion certificate PDFs.</p>
        
        <label className="cursor-pointer inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 font-bold text-xs transition">
          <span>{uploading ? 'Parsing PDF Text with PDFBox...' : 'Select PDF File'}</span>
          <input type="file" accept=".pdf" onChange={handleFileUpload} disabled={uploading} className="hidden" />
        </label>
      </div>

      {/* Verified Certificates List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Verified Certificate Records</h2>

        {certificates.map((cert) => (
          <div key={cert.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-base font-bold text-white">{cert.courseName}</h3>
                  <p className="text-xs text-slate-400">Issuer: <strong className="text-slate-200">{cert.issuer}</strong> | Credential ID: <code className="text-amber-300">{cert.credentialId}</code></p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                🟢 VERIFIED EVIDENCE
              </span>
            </div>

            {/* Extracted Text Box */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
              <p className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Extracted Text via PDFBox:</p>
              <pre className="whitespace-pre-wrap">{cert.extractedText}</pre>
            </div>

            {/* Matched Skills */}
            {cert.matchedSkills && (
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-xs text-slate-400">Matched Skills:</span>
                {cert.matchedSkills.map((sk, idx) => (
                  <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {sk}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
