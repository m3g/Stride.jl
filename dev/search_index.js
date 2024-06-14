var documenterSearchIndex = {"docs":
[{"location":"user_guide/","page":"User guide","title":"User guide","text":"CollapsedDocStrings = true","category":"page"},{"location":"user_guide/#Compute-secondary-structures","page":"User guide","title":"Compute secondary structures","text":"","category":"section"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"First, install the package, according to the Installation instructions.","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"Load the package with:","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"julia> using ProteinSecondaryStructures","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"Here, we illustrate the computation of the secondary structure of a PDB file provided as an example:","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"julia> pdbfile = ProteinSecondaryStructures.Testing.examples[1].filename\n\"/home/user/.julia/dev/ProteinSecondaryStructures/test/data/pdb/pdb1fmc.pdb\"","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"Then, to compute the secondary structure using the STRIDE algorithm, use:","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"julia> ss = stride_run(pdbfile)\n510-element Vector{SSData}:\n SSData(\"MET\", \"A\", 1, \"C\", 360.0, 150.62)\n SSData(\"PHE\", \"A\", 2, \"C\", -69.01, 138.78)\n ⋮\n SSData(\"ASN\", \"B\", 255, \"C\", -130.75, 360.0)","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"The output is a vector of SSData elements, which contain the residue name,  chain, residue number, secondary structure code, and phi and psi angles of the residue. The list of codes follow the DSSP convention, described in Secondary structure classes.","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"note: Note\nAlternativelly to the stride_run function, the dssp_run function can be used, to compute the secondary structures as defined by DSSP.","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"The details of the SSData structure that contain the output for each residue are described in the Data structure section.","category":"page"},{"location":"user_guide/#Reference-functions:","page":"User guide","title":"Reference functions:","text":"","category":"section"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"stride_run\ndssp_run","category":"page"},{"location":"user_guide/#ProteinSecondaryStructures.stride_run","page":"User guide","title":"ProteinSecondaryStructures.stride_run","text":"stride_run(pdb_file::AbstractString; adjust_pdb=false)\n\nRun stride on the PDB file and return a vector containing the stride detailed secondary structure information for each residue.\n\nadjust_pdb=true is used to adjust the format of the PDB file before running stride,  which requires a specific header and a specific empty-chain identifier.   In this case, only the ATOM lines are kept in the PDB file. \nIf adjust_pdb=false, the PDB file provided is used as is.\n\nNote that STRIDE will fail if residue or atoms types not recognized or if the header of the PDB file does not follow the necessary pattern.\n\nnote: Note\nSTRIDE might ignore some residues in the PDB file if they are not recognized, or incomplete. \nSTRIDE does not support structures in mmCIF format.\n\n\n\n\n\n","category":"function"},{"location":"user_guide/#ProteinSecondaryStructures.dssp_run","page":"User guide","title":"ProteinSecondaryStructures.dssp_run","text":"dssp_run(input_file::String; adjust_pdb=false)\n\nRun DSSP on the PDB or mmCIF file provided and return a vector containing the detailed secondary structure information for each residue.\n\nadjust_pdb option is used to fix the header of PDB files before running dssp,   which is a common problem for computing the secondary structure from PDB files.  In this case, only the ATOM lines are kept in the pdb file. \nadjust_pdb=false, the PDB file provided is used as is. This (default) option must be used  when the input file is in mmCIF format.\n\nNote that DSSP will fail if residue or atoms types not recognized or if the header of the PDB file does not follow the necessary pattern.\n\n\n\n\n\n","category":"function"},{"location":"user_guide/#Secondary-structure-composition","page":"User guide","title":"Secondary structure composition","text":"","category":"section"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"Given the ss output of the stride_run or dssp_run functions, an overview of content of the secondary structure can be obtained with the ss_composition function:","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"julia> comp = ss_composition(ss)\nDict{String, Int64} with 12 entries:\n  \"bend\"        => 0\n  \"kappa helix\" => 0\n  \"beta strand\" => 77\n  \"strand\"      => 81\n  \"loop\"        => 0\n  \"310 helix\"   => 21\n  \"turn\"        => 70\n  \"helix\"       => 263\n  \"beta bridge\" => 4\n  \"alpha helix\" => 242\n  \"pi helix\"    => 0\n  \"coil\"        => 96\n\njulia> comp[\"alpha helix\"]\n242","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"The output is a dictionary containing the number of residues that were classified in each class. As shown above, this number can be retrieved individually.","category":"page"},{"location":"user_guide/#Reference-function","page":"User guide","title":"Reference function","text":"","category":"section"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"ss_composition","category":"page"},{"location":"user_guide/#ProteinSecondaryStructures.ss_composition","page":"User guide","title":"ProteinSecondaryStructures.ss_composition","text":"ss_composition(data::AbstractVector{<:SSData})\n\nCalculate the secondary structure composition of the data. Returns a dictionary of the secondary structure types and their counts.\n\n\n\n\n\n","category":"function"},{"location":"user_guide/#Retrieving-names,-codes,-and-numeric-codes","page":"User guide","title":"Retrieving names, codes, and numeric codes","text":"","category":"section"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"The name, single-character codes, or numeric codes of the secondary structure of each residue can be retrieved with the ss_name, ss_code, and ss_number functions. The input of these functions can be an instance of SSData or one of the other two secondary structure classification types (name, code, or number): ","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"ss_name\nss_code\nss_number","category":"page"},{"location":"user_guide/#ProteinSecondaryStructures.ss_name","page":"User guide","title":"ProteinSecondaryStructures.ss_name","text":"ss_name(ss::Union{SSData, Integer, String, Char})\n\nReturn the secondary structure name. The input may be a SSData object,  a secondary structure Integer code (1-10) or a secondary  structure code (G, H, ..., C).\n\nThe classification follows the DSSP standard classes, described  in the ProteinSecondaryStructures.jl documentation.\n\nExample\n\njulia> using ProteinSecondaryStructures\n\njulia> ss_name(\"H\")\n\"alpha helix\"\n\njulia> ss_name(1)\n\"310 helix\"\n\njulia> ss = SSData(\"ARG\", \"A\", 1, \"H\", 0.0, 0.0)\nSSData(\"ARG\", \"A\", 1, \"H\", 0.0, 0.0)\n\njulia> ss_name(ss)\n\"alpha helix\"\n\n\n\n\n\n","category":"function"},{"location":"user_guide/#ProteinSecondaryStructures.ss_code","page":"User guide","title":"ProteinSecondaryStructures.ss_code","text":"ss_code(code::Union{SSData,String,Integer})\n\nReturns the one-letter secondary structure code. The input may be a secondary structure Integer code, a secondary structure name (\"310 helix\", \"alpha helix\", ..., \"coil\"), or a SSData object.\n\nThe classification follows the DSSP standard classes, described  in the ProteinSecondaryStructures.jl documentation.\n\nExample\n\njulia> using ProteinSecondaryStructures\n\njulia> ss_code(2)\n\"H\"\n\njulia> ss_code(\"beta bridge\")\n\"B\"\n\njulia> ss = SSData(\"ARG\", \"A\", 1, \"H\", 0.0, 0.0)\nSSData(\"ARG\", \"A\", 1, \"H\", 0.0, 0.0)\n\njulia> ss_code(ss)\n\"H\"\n\n\n\n\n\n\n","category":"function"},{"location":"user_guide/#ProteinSecondaryStructures.ss_number","page":"User guide","title":"ProteinSecondaryStructures.ss_number","text":"ss_number(code::Union{SSData,AbstractString,AbstractChar})\n\nReturns the secondary structure number code. The input may be a secondary structure String code, a secondary structure name (\"310 helix\", \"alpha helix\", ..., \"coil\"), or a SSData object.\n\nThe classification follows the DSSP standard classes, described  in the ProteinSecondaryStructures.jl documentation.\n\nExample\n\njulia> using ProteinSecondaryStructures\n\njulia> ss_number(\"H\")\n2\n\njulia> ss_number('B')\n7\n\njulia> ss_number(\"beta bridge\")\n7\n\njulia> ss = SSData(\"ARG\", \"A\", 1, \"H\", 0.0, 0.0)\nSSData(\"ARG\", \"A\", 1, \"H\", 0.0, 0.0)\n\njulia> ss_number(ss)\n2\n\n\n\n\n\n\n","category":"function"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"These functions can be used to obtain arrays of codes, by broadcasting over the vector of secondary structure data. For example:","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"julia> using ProteinSecondaryStructures\n\njulia> using ProteinSecondaryStructures.Testing: examples\n\njulia> ss = stride_run(examples[1].filename);\n\njulia> ss_name.(ss)[1:5]\n5-element Vector{String}:\n \"coil\"\n \"coil\"\n \"coil\"\n \"310 helix\"\n \"310 helix\"\n\njulia> join(ss_code.(ss)[1:15])\n\"CCCGGGGCTTTTEEE\"\n","category":"page"},{"location":"user_guide/","page":"User guide","title":"User guide","text":"In the last case, the sequence of secondary structure elements of the first 15 residues is shown.","category":"page"},{"location":"overview/","page":"Overview","title":"Overview","text":"CollapsedDocStrings = true","category":"page"},{"location":"overview/#Overview","page":"Overview","title":"Overview","text":"","category":"section"},{"location":"overview/","page":"Overview","title":"Overview","text":"This package uses STRIDE or DSSP to compute secondary structures of proteins from their structure files:","category":"page"},{"location":"overview/","page":"Overview","title":"Overview","text":"STRIDE supports reading PDB files.\nDSSP supports reading both PDB and mmCIF files.","category":"page"},{"location":"overview/#Secondary-structure-classes","page":"Overview","title":"Secondary structure classes","text":"","category":"section"},{"location":"overview/","page":"Overview","title":"Overview","text":"The outputs of STRIDE or DSSP follow the convention of secondary strucure codes, which are:","category":"page"},{"location":"overview/","page":"Overview","title":"Overview","text":"SS name ss code code number\n\"310 helix\" \"G\" 1\n\"alpha helix\" \"H\" 2\n\"pi helix\" \"I\" 3\n\"kappa helix\" \"P\" 4\n\"turn\" \"T\" 5\n\"beta strand\" \"E\" 6\n\"beta bridge\" \"B\" 7\n\"bend\" \"S\" 8\n\"coil\" \"C\" 9\n\"loop\" \" \" 10","category":"page"},{"location":"overview/","page":"Overview","title":"Overview","text":"See the DSSP secondary structure classification for further information.","category":"page"},{"location":"overview/#Data-structure","page":"Overview","title":"Data structure","text":"","category":"section"},{"location":"overview/","page":"Overview","title":"Overview","text":"The outputs of the secondary structure calculations are vectors of SSData elements, with the following data, for each residue:","category":"page"},{"location":"overview/","page":"Overview","title":"Overview","text":"resname::String - residue name\nchain::String - chain identifier\nresnum::Int - residue number\nsscode::String - secondary structure code\nphi::Float64 - phi dihedral angle\npsi::Float64 - psi dihedral angle","category":"page"},{"location":"overview/","page":"Overview","title":"Overview","text":"For example: ","category":"page"},{"location":"overview/","page":"Overview","title":"Overview","text":"julia> using ProteinSecondaryStructures\n\njulia> pdbfile = ProteinSecondaryStructures.Testing.examples[1].filename;\n\njulia> ss = stride_run(pdbfile);\n\njulia> ss[1]\nSSData(\"MET\", \"A\", 1, \"C\", 360.0, 150.62)\n\njulia> ss[1].sscode\n\"C\"\n\njulia> ss_name(ss[1].sscode)\n\"coil\"","category":"page"},{"location":"overview/#Reference-structure","page":"Overview","title":"Reference structure","text":"","category":"section"},{"location":"overview/","page":"Overview","title":"Overview","text":"SSData","category":"page"},{"location":"overview/#ProteinSecondaryStructures.SSData","page":"Overview","title":"ProteinSecondaryStructures.SSData","text":"SSData\n\nA struct to hold secondary structure data for a single residue. The fields are:\n\nresname::String - residue name\nchain::String - chain identifier\nresnum::Int - residue number\nsscode::String - secondary structure code\nphi::Float64 - phi dihedral angle\npsi::Float64 - psi dihedral angle\n\n\n\n\n\n","category":"type"},{"location":"#ProteinSecondaryStructures.jl","page":"Home","title":"ProteinSecondaryStructures.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ProteinSecondaryStructures.jl parses STRIDE and DSSP secondary structure prediction outputs, to make them convenient to use from Julia. ","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"In Julia, install ProteinSecondaryStructures with:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> import Pkg; Pkg.add(\"ProteinSecondaryStructures\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"There is no need to independently install STRIDE or DSSP.","category":"page"},{"location":"#References","page":"Home","title":"References","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"If you use the STRIDE algorithm for secondary structure prediction, please cite:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Frishman,D & Argos,P. (1994) Knowledge-based secondary structure assignment. Proteins: structure, function and genetics, 23, 566-579.\nKabsch,W. & Sander,C. (1982) Dictionary of protein secondary structure: pattern recognition of hydrogen-bonded and geometrical features. Biopolymers, 22: 2577-2637.","category":"page"},{"location":"","page":"Home","title":"Home","text":"If you use the DSSP algorithm for secondary structure prediction, please cite:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Joosten RP, te Beek TAH, Krieger E, Hekkelman ML, Hooft RWW, Schneider R, Sander C, Vriend A series of PDB related databases for everyday needs. Nuc. Acids Res. 2009; 39:D411-D419.\nKabsch W, Sander C. Dictionary of protein secondary structure: pattern recognition of hydrogen-bonded and geometrical features. Biopolymers 1982; 22:2577-2637. ","category":"page"}]
}
