%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% 
% File:     ujdpl.cls           (LaTeX Document class option "aghdpl")
%          
% Author:  Marcin Szpyrka     (mszpyrka@agh.edu.pl)
%          Grzegorz J. Nalepa (gjn@agh.edu.pl)
%          AGH University of Science and Technology, Kraków, POLAND
% 
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\message{*** [ujdpl.cls] ---  (MSz, GJN)  v0.2 <18.12.2010>  ***}       

\newif\ifpdflatex\pdflatexfalse
\NeedsTeXFormat{LaTeX2e} % 
\ProvidesClass{ujdpl} 
\DeclareOption{pdflatex}{\pdflatextrue}
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{report}} 
\ProcessOptions\LoadClass[a4paper,oneside]{report} 

\RequirePackage{times}
\RequirePackage[T1]{fontenc}
\RequirePackage{graphicx}
\RequirePackage{geometry}
\RequirePackage[usenames]{color}
\RequirePackage{fancyhdr}
\RequirePackage{titlesec}
\RequirePackage{tocloft}

\geometry{lmargin=30mm, rmargin=20mm, tmargin=25mm, bmargin=25mm, foot=10mm, head=10mm}
\definecolor{Green}{rgb}{0.1,0.5,0.1}

\def\shorttitle#1   {\gdef\@shorttitle{#1}}
\def\shortauthor#1    {\gdef\@shortauthor{#1}}
\def\title#1        {\gdef\@title{#1}}
\def\thesistype#1   {\gdef\@thesistype{#1}}
\def\supervisor#1   {\gdef\@supervisor{#1}}
\def\consultant#1   {\gdef\@consultant{#1}}
\def\acknowledgements#1   {\gdef\@acknowledgements{#1}}
\def\faculty#1   {\gdef\@faculty{#1}}

% \thesisheaders
% 
% \pagestyle{fancy}

\bibliographystyle{abbrv}
\linespread{1.3}
\renewcommand{\labelitemi}{--}

%------------------------------------------------------------------------------

\newcommand{\titlepages}{%

\newpage \titlepage 

\begin{center}

{\sffamily{\Large{\bfseries{\textsc Uniwersytet Jagiello\'nski\\[2mm]}}}

\vspace*{1mm}\rule{\textwidth}{1mm}\vspace*{1mm}

{\large \@faculty}}\\\vspace*{2mm}

{\huge\scshape \@thesistype}\\\vspace*{2cm}

{\LARGE\scshape \@author}\\\vspace*{2cm}

{\LARGE{\bfseries\scshape \@title}}\\\vspace*{3cm}

\begin{flushright}
\begin{minipage}[!h]{6cm} 
\large{\scshape Promotor:}\\ \@supervisor
\large{\scshape Konsultant:}\\ \@consultant
\end{minipage}
\end{flushright}

\vfill{\Large Krak\'{o}w \@date}

\end{center}

\clearpage \titlepage \vspace*{15cm} \vfill

\begin{flushright}
\begin{minipage}[!h]{12cm}
\mbox{\large{\scshape \textbf{O\'SWIADCZENIE AUTORA PRACY}}}\\[3mm] 
{\scshape O\'swiadczam, \'swiadomy odpowiedzialno\'sci karnej za po\'swiadczenie nieprawdy, \.ze niniejsz\k{a} prac\k{e} dyplomow\k{a} wykona\l{}em osobi\'scie i samodzielnie, i nie korzysta\l{}em ze \'zr\'ode\l{} innych ni\.z wymienione w pracy.}\\
\end{minipage}

\vspace{2cm}

\makebox[6cm][s]{\dotfill}\par
\makebox[6cm][c]{\small PODPIS}

\end{flushright}

\clearpage \titlepage

\vspace*{15cm} \vfill
\begin{flushright} 
\begin{minipage}[!h]{8cm}
{\Large \@acknowledgements}
\end{minipage}
\end{flushright}

\clearpage

\setcounter{page}{3}

}

\def\thesisheaders{
\fancyfoot[L]{\small \@shortauthor\quad\textit{\@shorttitle}}
}

\ProcessOptions

\pagestyle{fancy}
\renewcommand{\chaptermark}[1]{\markboth{\thechapter.\ #1}{}}
\renewcommand{\sectionmark}[1]{\markright{\thesection.\ #1}}
\renewcommand{\headrulewidth}{0.5pt}
\renewcommand{\footrulewidth}{0.5pt}
\fancyhf{}
\fancyhead{}
\fancyhead[L]{\slshape{\small \rightmark}}
\fancyhead[R]{\bfseries \thepage}

\thesisheaders

\frenchspacing
\sloppy 
\widowpenalty     9999 
\clubpenalty      9999 
\flushbottom

%---------------------------------------------------------------------------
% Ustawienia parametrów dla tytu³ów rozdzia³ów, podrozdzia³ów, itd.
%---------------------------------------------------------------------------


\titleformat{\chapter}[block]
{\bfseries\LARGE}{\filright \LARGE \makebox[6.7mm][l]{\thechapter.}}{0ex}{}
%odstêpy: lewy, góra, dó³
\titlespacing{\chapter}{0pt}{17mm}{19mm}
\titleformat{\section}[block]
{\bfseries\Large}{\filright \Large\thesection. }{0ex}{}
\titlespacing{\section}{7mm}{8mm plus 0mm minus 1mm}{4mm plus 0mm minus 1mm}
\titleformat{\subsection}[block]
{\bfseries\large}{\filright \large\thesubsection. }{0ex}{}
\titlespacing{\subsection}{7mm}{6mm}{2.5mm}
\titleformat{\subsubsection}[block]
{\bfseries\normalsize}{\filright \normalsize\thesubsubsection. }{0ex}{}
\titlespacing{\subsubsection}{7mm}{3mm}{1.5mm}

%---------------------------------------------------------------------------
% Ustawienia parametrów generowania spisu treœci i spisu rysunków
%---------------------------------------------------------------------------

\renewcommand{\cfttoctitlefont}{\bfseries\Large}
\renewcommand{\cftbeforetoctitleskip}{20mm}
\renewcommand{\cftaftertoctitleskip}{19mm}
\renewcommand{\cftchapleader}{\cftdotfill{\cftdot}}
\renewcommand{\cftsecleader}{\cftdotfill{\cftdot}}
\renewcommand{\cftsubsecleader}{\cftdotfill{\cftdot}}
\renewcommand{\cftchapaftersnum}{.}
\renewcommand{\cftsecaftersnum}{.}
\renewcommand{\cftsubsecaftersnum}{.}
\setlength{\cftparskip}{2pt}
\setlength{\cftbeforechapskip}{0mm}
\renewcommand{\cftchappagefont}{\normalsize}

